import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Calendar, Wrench, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { format, isAfter, isBefore, addDays } from "date-fns";
import { Link } from "react-router-dom";

interface MaintenanceAlert {
  id: string;
  vehicleId: string;
  vehiclePlate: string;
  type: 'upcoming' | 'overdue';
  dueDate: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
}

export function MaintenanceAlertsWidget() {
  const { language } = useLanguage();
  const [alerts, setAlerts] = useState<MaintenanceAlert[]>([]);
  const [loading, setLoading] = useState(true);

  const getTitle = () => {
    switch(language) {
      case 'de': return 'Wartungshinweise';
      case 'th': return 'การแจ้งเตือนการบำรุงรักษา';
      default: return 'Maintenance Alerts';
    }
  };

  useEffect(() => {
    const fetchMaintenanceAlerts = async () => {
      try {
        const { data, error } = await supabase
          .from('vehicles')
          .select('id, license_plate, next_service')
          .not('next_service', 'is', null);

        if (error) throw error;

        const now = new Date();
        const thirtyDaysFromNow = addDays(now, 30);

        const maintenanceAlerts: MaintenanceAlert[] = data
          ?.map((vehicle) => {
            const serviceDate = new Date(vehicle.next_service);
            const isOverdue = isBefore(serviceDate, now);
            const isUpcoming = isAfter(serviceDate, now) && isBefore(serviceDate, thirtyDaysFromNow);

            if (isOverdue || isUpcoming) {
              return {
                id: vehicle.id,
                vehicleId: vehicle.id,
                vehiclePlate: vehicle.license_plate,
                type: (isOverdue ? 'overdue' : 'upcoming') as 'upcoming' | 'overdue',
                dueDate: vehicle.next_service,
                description: language === 'de' 
                  ? 'Planmäßige Wartung' 
                  : language === 'th' 
                    ? 'การบำรุงรักษาตามกำหนด'
                    : 'Scheduled Maintenance',
                priority: (isOverdue ? 'high' : 'medium') as 'low' | 'medium' | 'high'
              };
            }
            return null;
          })
          .filter(Boolean) || [];

        setAlerts(maintenanceAlerts);
      } catch (error) {
        console.error('Error fetching maintenance alerts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMaintenanceAlerts();

    // Set up real-time subscription
    const channel = supabase
      .channel('maintenance-alerts')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'vehicles' },
        () => fetchMaintenanceAlerts()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [language]);

  const getPriorityBadge = (priority: string, type: string) => {
    if (type === 'overdue') {
      return <Badge variant="destructive">
        <AlertTriangle className="h-3 w-3 mr-1" />
        {language === 'de' ? 'Überfällig' : language === 'th' ? 'เกินกำหนด' : 'Overdue'}
      </Badge>;
    }
    return <Badge variant="secondary">
      <Calendar className="h-3 w-3 mr-1" />
      {language === 'de' ? 'Bevorstehend' : language === 'th' ? 'กำลังมาถึง' : 'Upcoming'}
    </Badge>;
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'dd.MM.yyyy');
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wrench className="h-5 w-5" />
            {getTitle()}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 bg-muted rounded" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Wrench className="h-5 w-5" />
          {getTitle()}
        </CardTitle>
        <Badge variant="outline">
          {alerts.length} {language === 'de' ? 'Hinweise' : language === 'th' ? 'การแจ้งเตือน' : 'Alerts'}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-3">
        {alerts.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Wrench className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>{language === 'de' ? 'Keine Wartungshinweise' : language === 'th' ? 'ไม่มีการแจ้งเตือนการบำรุงรักษา' : 'No maintenance alerts'}</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {alerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{alert.vehiclePlate}</span>
                    {getPriorityBadge(alert.priority, alert.type)}
                  </div>
                  <div className="text-sm text-muted-foreground mb-1">
                    {alert.description}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {formatDate(alert.dueDate)}
                  </div>
                </div>
                <Button size="sm" variant="outline" asChild>
                  <Link to={`/vehicles?highlight=${alert.vehicleId}`}>
                    {language === 'de' ? 'Details' : language === 'th' ? 'รายละเอียด' : 'Details'}
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        )}
        
        {alerts.length > 0 && (
          <div className="pt-3 border-t">
            <Button variant="outline" className="w-full" asChild>
              <Link to="/vehicles">
                {language === 'de' ? 'Alle Fahrzeuge anzeigen' : language === 'th' ? 'ดูยานพาหนะทั้งหมด' : 'View All Vehicles'}
              </Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}