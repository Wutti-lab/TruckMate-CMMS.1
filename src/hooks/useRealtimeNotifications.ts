
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNotifications } from '@/contexts/NotificationContext';
import { useToast } from '@/hooks/use-toast';

export function useRealtimeNotifications() {
  const { addNotification } = useNotifications();
  const { toast } = useToast();

  useEffect(() => {
    // Listen for vehicle status changes
    const vehicleChannel = supabase
      .channel('vehicle-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'vehicles'
        },
        (payload) => {
          handleVehicleChange(payload);
        }
      )
      .subscribe();

    // Listen for inspection changes
    const inspectionChannel = supabase
      .channel('inspection-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'inspections'
        },
        (payload) => {
          handleInspectionChange(payload);
        }
      )
      .subscribe();

    // Listen for vehicle assignments
    const assignmentChannel = supabase
      .channel('assignment-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'vehicle_assignments'
        },
        (payload) => {
          handleAssignmentChange(payload);
        }
      )
      .subscribe();

    // Check for maintenance alerts every minute
    const maintenanceInterval = setInterval(checkMaintenanceAlerts, 60000);

    // Check for critical vehicle alerts every 30 seconds
    const vehicleAlertsInterval = setInterval(checkVehicleAlerts, 30000);

    return () => {
      supabase.removeChannel(vehicleChannel);
      supabase.removeChannel(inspectionChannel);
      supabase.removeChannel(assignmentChannel);
      clearInterval(maintenanceInterval);
      clearInterval(vehicleAlertsInterval);
    };
  }, [addNotification, toast]);

  const handleVehicleChange = (payload: any) => {
    const { eventType, new: newRecord, old: oldRecord } = payload;
    
    if (eventType === 'UPDATE' && oldRecord && newRecord) {
      // Check for status changes
      if (oldRecord.status !== newRecord.status) {
        const statusMessage = getStatusChangeMessage(newRecord.license_plate, oldRecord.status, newRecord.status);
        addNotification({
          title: "Fahrzeugstatus geändert | Vehicle Status Changed",
          message: statusMessage,
          type: newRecord.status === 'active' ? 'success' : 'warning'
        });
      }

      // Check for critical temperature alerts
      if (newRecord.engine_temp && newRecord.engine_temp > 90) {
        addNotification({
          title: "Kritische Motortemperatur | Critical Engine Temperature",
          message: `Fahrzeug ${newRecord.license_plate}: ${newRecord.engine_temp}°C | Vehicle ${newRecord.license_plate}: ${newRecord.engine_temp}°C`,
          type: 'error'
        });
        
        toast({
          title: "🚨 Kritische Warnung",
          description: `Fahrzeug ${newRecord.license_plate} hat eine kritische Motortemperatur: ${newRecord.engine_temp}°C`,
          variant: "destructive"
        });
      }

      // Check for low fuel alerts
      if (newRecord.fuel_level && newRecord.fuel_level < 20) {
        addNotification({
          title: "Niedriger Kraftstoffstand | Low Fuel Level",
          message: `Fahrzeug ${newRecord.license_plate}: ${newRecord.fuel_level}% | Vehicle ${newRecord.license_plate}: ${newRecord.fuel_level}%`,
          type: 'warning'
        });
      }
    }

    if (eventType === 'INSERT' && newRecord) {
      addNotification({
        title: "Neues Fahrzeug hinzugefügt | New Vehicle Added",
        message: `Fahrzeug ${newRecord.license_plate} (${newRecord.model}) wurde zur Flotte hinzugefügt | Vehicle ${newRecord.license_plate} (${newRecord.model}) added to fleet`,
        type: 'info'
      });
    }
  };

  const handleInspectionChange = (payload: any) => {
    const { eventType, new: newRecord } = payload;
    
    if (eventType === 'INSERT' && newRecord) {
      addNotification({
        title: "Neue Inspektion erstellt | New Inspection Created",
        message: `${newRecord.type} Inspektion wurde geplant | ${newRecord.type} inspection scheduled`,
        type: 'info'
      });
    }

    if (eventType === 'UPDATE' && newRecord) {
      if (newRecord.status === 'completed') {
        addNotification({
          title: "Inspektion abgeschlossen | Inspection Completed",
          message: `${newRecord.type} Inspektion wurde erfolgreich abgeschlossen | ${newRecord.type} inspection completed successfully`,
          type: 'success'
        });
      } else if (newRecord.status === 'failed') {
        addNotification({
          title: "Inspektion fehlgeschlagen | Inspection Failed",
          message: `${newRecord.type} Inspektion erfordert Aufmerksamkeit | ${newRecord.type} inspection requires attention`,
          type: 'error'
        });
      }
    }
  };

  const handleAssignmentChange = (payload: any) => {
    const { eventType, new: newRecord } = payload;
    
    if (eventType === 'INSERT' && newRecord && newRecord.active) {
      addNotification({
        title: "Fahrer zugewiesen | Driver Assigned",
        message: `Neuer Fahrer wurde einem Fahrzeug zugewiesen | New driver assigned to vehicle`,
        type: 'info'
      });
    }
  };

  const checkMaintenanceAlerts = async () => {
    try {
      const { data: vehicles, error } = await supabase
        .from('vehicles')
        .select('*')
        .not('next_service', 'is', null);

      if (error) throw error;

      const now = new Date();
      const sevenDaysFromNow = new Date();
      sevenDaysFromNow.setDate(now.getDate() + 7);

      vehicles?.forEach(vehicle => {
        if (vehicle.next_service) {
          const serviceDate = new Date(vehicle.next_service);
          const daysUntilService = Math.ceil((serviceDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

          if (daysUntilService <= 7 && daysUntilService > 0) {
            addNotification({
              title: "Wartung fällig | Maintenance Due",
              message: `Fahrzeug ${vehicle.license_plate}: Wartung in ${daysUntilService} Tagen | Vehicle ${vehicle.license_plate}: Maintenance in ${daysUntilService} days`,
              type: 'warning'
            });
          } else if (daysUntilService <= 0) {
            addNotification({
              title: "Überfällige Wartung | Overdue Maintenance",
              message: `Fahrzeug ${vehicle.license_plate}: Wartung überfällig! | Vehicle ${vehicle.license_plate}: Maintenance overdue!`,
              type: 'error'
            });
          }
        }
      });
    } catch (error) {
      console.error('Error checking maintenance alerts:', error);
    }
  };

  const checkVehicleAlerts = async () => {
    try {
      const { data: vehicles, error } = await supabase
        .from('vehicles')
        .select('*')
        .eq('status', 'active');

      if (error) throw error;

      vehicles?.forEach(vehicle => {
        // Battery level alerts
        if (vehicle.battery_level && vehicle.battery_level < 20) {
          addNotification({
            title: "Niedrige Batterie | Low Battery",
            message: `Fahrzeug ${vehicle.license_plate}: ${vehicle.battery_level}% Batterie | Vehicle ${vehicle.license_plate}: ${vehicle.battery_level}% battery`,
            type: 'warning'
          });
        }

        // Critical engine temperature (above 95°C)
        if (vehicle.engine_temp && vehicle.engine_temp > 95) {
          addNotification({
            title: "KRITISCH: Motorüberhitzung | CRITICAL: Engine Overheating",
            message: `Fahrzeug ${vehicle.license_plate}: ${vehicle.engine_temp}°C - SOFORT ANHALTEN! | Vehicle ${vehicle.license_plate}: ${vehicle.engine_temp}°C - STOP IMMEDIATELY!`,
            type: 'error'
          });
          
          toast({
            title: "🚨 KRITISCHE WARNUNG",
            description: `Fahrzeug ${vehicle.license_plate} überhitzt! Sofort anhalten!`,
            variant: "destructive"
          });
        }
      });
    } catch (error) {
      console.error('Error checking vehicle alerts:', error);
    }
  };

  const getStatusChangeMessage = (licensePlate: string, oldStatus: string, newStatus: string) => {
    const statusMap: Record<string, string> = {
      'active': 'aktiv | active',
      'maintenance': 'in Wartung | in maintenance',
      'inactive': 'inaktiv | inactive'
    };

    return `Fahrzeug ${licensePlate}: ${statusMap[oldStatus] || oldStatus} → ${statusMap[newStatus] || newStatus} | Vehicle ${licensePlate}: ${statusMap[oldStatus] || oldStatus} → ${statusMap[newStatus] || newStatus}`;
  };
}
