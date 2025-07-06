import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Car, CheckCircle2, XCircle, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { format, addDays, isSameDay } from "date-fns";

interface VehicleAvailability {
  date: string;
  available: number;
  inUse: number;
  maintenance: number;
  total: number;
}

interface VehicleEvent {
  id: string;
  vehiclePlate: string;
  date: string;
  type: 'maintenance' | 'inspection' | 'assignment';
  status: 'scheduled' | 'in_progress' | 'completed';
}

export function VehicleAvailabilityWidget() {
  const { language } = useLanguage();
  const [availabilityData, setAvailabilityData] = useState<VehicleAvailability[]>([]);
  const [events, setEvents] = useState<VehicleEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const getTitle = () => {
    switch(language) {
      case 'de': return 'Fahrzeugverfügbarkeit';
      case 'th': return 'ความพร้อมใช้งานยานพาหนะ';
      default: return 'Vehicle Availability';
    }
  };

  useEffect(() => {
    const fetchAvailabilityData = async () => {
      try {
        // Fetch vehicles
        const { data: vehicles, error: vehiclesError } = await supabase
          .from('vehicles')
          .select('id, license_plate, status, next_service');

        if (vehiclesError) throw vehiclesError;

        // Fetch work orders/maintenance
        const { data: workOrders, error: workOrdersError } = await supabase
          .from('work_orders')
          .select('id, vehicle_id, scheduled_date, status, vehicles!inner(license_plate)')
          .gte('scheduled_date', format(new Date(), 'yyyy-MM-dd'));

        if (workOrdersError) throw workOrdersError;

        // Generate calendar data for next 14 days
        const calendarData: VehicleAvailability[] = [];
        const vehicleEvents: VehicleEvent[] = [];

        for (let i = 0; i < 14; i++) {
          const currentDate = addDays(new Date(), i);
          const dateStr = format(currentDate, 'yyyy-MM-dd');
          
          // Count vehicles in maintenance on this date
          const maintenanceCount = workOrders?.filter(wo => 
            wo.scheduled_date === dateStr && wo.status !== 'completed'
          ).length || 0;

          // Calculate availability
          const totalVehicles = vehicles?.length || 0;
          const availableVehicles = totalVehicles - maintenanceCount;
          
          calendarData.push({
            date: dateStr,
            available: Math.max(0, availableVehicles),
            inUse: Math.floor(Math.random() * availableVehicles), // Mock data
            maintenance: maintenanceCount,
            total: totalVehicles
          });

          // Add events for this date
          workOrders?.forEach(wo => {
            if (wo.scheduled_date === dateStr) {
              vehicleEvents.push({
                id: wo.id,
                vehiclePlate: (wo.vehicles as any)?.license_plate || 'Unknown',
                date: dateStr,
                type: 'maintenance',
                status: wo.status as 'scheduled' | 'in_progress' | 'completed'
              });
            }
          });
        }

        setAvailabilityData(calendarData);
        setEvents(vehicleEvents);
      } catch (error) {
        console.error('Error fetching availability data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailabilityData();
  }, []);

  const getAvailabilityColor = (available: number, total: number) => {
    const percentage = (available / total) * 100;
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'completed':
        return <CheckCircle2 className="h-3 w-3 text-green-500" />;
      case 'in_progress':
        return <Clock className="h-3 w-3 text-blue-500" />;
      default:
        return <Calendar className="h-3 w-3 text-gray-500" />;
    }
  };

  const selectedDateData = availabilityData.find(data => 
    isSameDay(new Date(data.date), selectedDate)
  );

  const selectedDateEvents = events.filter(event => 
    isSameDay(new Date(event.date), selectedDate)
  );

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            {getTitle()}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse">
            <div className="grid grid-cols-7 gap-2 mb-4">
              {[...Array(14)].map((_, i) => (
                <div key={i} className="h-12 bg-muted rounded" />
              ))}
            </div>
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-8 bg-muted rounded" />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          {getTitle()}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {availabilityData.slice(0, 14).map((data, index) => {
            const date = new Date(data.date);
            const isSelected = isSameDay(date, selectedDate);
            const availabilityPercentage = (data.available / data.total) * 100;
            
            return (
              <div
                key={data.date}
                className={`p-2 border rounded cursor-pointer transition-colors ${
                  isSelected ? 'border-primary bg-primary/10' : 'hover:bg-muted'
                }`}
                onClick={() => setSelectedDate(date)}
              >
                <div className="text-center">
                  <div className="text-xs font-medium">{format(date, 'dd')}</div>
                  <div className="text-xs text-muted-foreground">{format(date, 'EEE')}</div>
                  <div className="mt-1">
                    <div className={`w-full h-1 rounded ${getAvailabilityColor(data.available, data.total)}`} />
                    <div className="text-xs mt-1">{Math.round(availabilityPercentage)}%</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Date Details */}
        {selectedDateData && (
          <div className="border-t pt-4">
            <h4 className="font-medium mb-3">
              {format(selectedDate, 'dd.MM.yyyy')} - {selectedDateData.total} {language === 'de' ? 'Fahrzeuge' : language === 'th' ? 'ยานพาหนะ' : 'Vehicles'}
            </h4>
            
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="text-center p-2 border rounded">
                <div className="text-lg font-bold text-green-600">{selectedDateData.available}</div>
                <div className="text-xs text-muted-foreground">
                  {language === 'de' ? 'Verfügbar' : language === 'th' ? 'พร้อมใช้' : 'Available'}
                </div>
              </div>
              <div className="text-center p-2 border rounded">
                <div className="text-lg font-bold text-blue-600">{selectedDateData.inUse}</div>
                <div className="text-xs text-muted-foreground">
                  {language === 'de' ? 'Im Einsatz' : language === 'th' ? 'ใช้งาน' : 'In Use'}
                </div>
              </div>
              <div className="text-center p-2 border rounded">
                <div className="text-lg font-bold text-amber-600">{selectedDateData.maintenance}</div>
                <div className="text-xs text-muted-foreground">
                  {language === 'de' ? 'Wartung' : language === 'th' ? 'ซ่อมบำรุง' : 'Maintenance'}
                </div>
              </div>
            </div>

            {/* Events for selected date */}
            {selectedDateEvents.length > 0 && (
              <div>
                <h5 className="text-sm font-medium mb-2">
                  {language === 'de' ? 'Termine' : language === 'th' ? 'กิจกรรม' : 'Events'}
                </h5>
                <div className="space-y-2">
                  {selectedDateEvents.map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-2 bg-muted rounded text-sm">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(event.status)}
                        <span>{event.vehiclePlate}</span>
                      </div>
                      <Badge variant="outline">
                        {language === 'de' ? 'Wartung' : language === 'th' ? 'ซ่อมบำรุง' : 'Maintenance'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}