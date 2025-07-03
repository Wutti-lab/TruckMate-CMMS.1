import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.8';
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface MaintenanceAlert {
  vehicleId: string;
  licensePlate: string;
  model: string;
  nextService: string;
  daysOverdue: number;
  status: 'due' | 'overdue' | 'critical';
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    console.log('Starting maintenance alerts check...');

    // Get all vehicles with their next service dates
    const { data: vehicles, error: vehiclesError } = await supabase
      .from('vehicles')
      .select('id, license_plate, model, next_service, status')
      .not('next_service', 'is', null);

    if (vehiclesError) {
      console.error('Error fetching vehicles:', vehiclesError);
      throw vehiclesError;
    }

    console.log(`Found ${vehicles?.length || 0} vehicles with service dates`);

    const now = new Date();
    const alerts: MaintenanceAlert[] = [];

    // Check each vehicle for maintenance alerts
    vehicles?.forEach(vehicle => {
      const nextServiceDate = new Date(vehicle.next_service);
      const diffTime = nextServiceDate.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      let alertStatus: 'due' | 'overdue' | 'critical' | null = null;

      if (diffDays <= 0) {
        // Service is overdue
        const daysOverdue = Math.abs(diffDays);
        if (daysOverdue >= 30) {
          alertStatus = 'critical';
        } else {
          alertStatus = 'overdue';
        }
      } else if (diffDays <= 7) {
        // Service due within 7 days
        alertStatus = 'due';
      }

      if (alertStatus) {
        alerts.push({
          vehicleId: vehicle.id,
          licensePlate: vehicle.license_plate,
          model: vehicle.model,
          nextService: vehicle.next_service,
          daysOverdue: diffDays <= 0 ? Math.abs(diffDays) : 0,
          status: alertStatus
        });
      }
    });

    console.log(`Generated ${alerts.length} maintenance alerts`);

    // Get admin users to notify
    const { data: admins, error: adminsError } = await supabase
      .from('profiles')
      .select('id, name')
      .in('role', ['admin', 'dev_admin', 'fleet_manager']);

    if (adminsError) {
      console.error('Error fetching admins:', adminsError);
      throw adminsError;
    }

    // Get admin emails from auth.users (we'll need to use a different approach)
    // For now, we'll use a default email or env variable
    const notificationEmail = Deno.env.get('ADMIN_EMAIL') || 'admin@truckmate.de';

    if (alerts.length > 0) {
      // Group alerts by severity
      const criticalAlerts = alerts.filter(a => a.status === 'critical');
      const overdueAlerts = alerts.filter(a => a.status === 'overdue');
      const dueAlerts = alerts.filter(a => a.status === 'due');

      // Create email content
      const emailHtml = `
        <h1>🚨 Wartungsalarme - TruckMate CMMS</h1>
        <p>Automatischer Wartungsalarm vom ${now.toLocaleDateString('de-DE')}</p>
        
        ${criticalAlerts.length > 0 ? `
          <h2>🔴 Kritische Wartung (>30 Tage überfällig)</h2>
          <ul>
            ${criticalAlerts.map(alert => `
              <li><strong>${alert.licensePlate}</strong> (${alert.model}) - ${alert.daysOverdue} Tage überfällig</li>
            `).join('')}
          </ul>
        ` : ''}
        
        ${overdueAlerts.length > 0 ? `
          <h2>🟠 Überfällige Wartung</h2>
          <ul>
            ${overdueAlerts.map(alert => `
              <li><strong>${alert.licensePlate}</strong> (${alert.model}) - ${alert.daysOverdue} Tage überfällig</li>
            `).join('')}
          </ul>
        ` : ''}
        
        ${dueAlerts.length > 0 ? `
          <h2>🟡 Wartung fällig (nächste 7 Tage)</h2>
          <ul>
            ${dueAlerts.map(alert => `
              <li><strong>${alert.licensePlate}</strong> (${alert.model}) - Fällig: ${new Date(alert.nextService).toLocaleDateString('de-DE')}</li>
            `).join('')}
          </ul>
        ` : ''}
        
        <hr>
        <p><small>Diese E-Mail wurde automatisch vom TruckMate CMMS System generiert.</small></p>
      `;

      // Send email notification
      const emailResponse = await resend.emails.send({
        from: "TruckMate CMMS <maintenance@truckmate.de>",
        to: [notificationEmail],
        subject: `🚨 Wartungsalarme: ${alerts.length} Fahrzeug(e) benötigen Wartung`,
        html: emailHtml,
      });

      console.log('Email sent successfully:', emailResponse);

      // Store alerts in database for dashboard display
      for (const alert of alerts) {
        const { error: insertError } = await supabase
          .from('inspections')
          .upsert({
            vehicle_id: alert.vehicleId,
            type: 'maintenance_alert',
            status: alert.status,
            notes: `Automatischer Wartungsalarm: ${alert.status === 'critical' ? 'Kritisch - ' + alert.daysOverdue + ' Tage überfällig' : alert.status === 'overdue' ? alert.daysOverdue + ' Tage überfällig' : 'Fällig in den nächsten 7 Tagen'}`,
            inspection_date: now.toISOString(),
          }, {
            onConflict: 'vehicle_id,type,inspection_date'
          });

        if (insertError) {
          console.error('Error storing alert:', insertError);
        }
      }
    }

    return new Response(JSON.stringify({
      success: true,
      alertsGenerated: alerts.length,
      alerts: alerts,
      timestamp: now.toISOString()
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });

  } catch (error: any) {
    console.error("Error in maintenance-alerts function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);