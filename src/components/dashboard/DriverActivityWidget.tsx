import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Clock, UserCheck, UserX } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface DriverActivity {
  id: string;
  name: string;
  status: string;
  lastActivity: string;
  shiftStart?: string;
  hoursWorked?: number;
}

export function DriverActivityWidget() {
  const { language } = useLanguage();
  const [drivers, setDrivers] = useState<DriverActivity[]>([]);
  const [loading, setLoading] = useState(true);

  const getTitle = () => {
    switch(language) {
      case 'de': return 'Fahreraktivität';
      case 'th': return 'กิจกรรมคนขับ';
      default: return 'Driver Activity';
    }
  };

  useEffect(() => {
    const fetchDriverActivity = async () => {
      try {
        const { data, error } = await supabase
          .from('drivers')
          .select('id, name, status, updated_at');
        
        if (error) throw error;
        
        const driverActivity = data?.map(driver => ({
          id: driver.id,
          name: driver.name,
          status: driver.status || 'inactive',
          lastActivity: driver.updated_at || new Date().toISOString(),
          hoursWorked: Math.floor(Math.random() * 8) + 1 // Mock data
        })) || [];

        setDrivers(driverActivity);
      } catch (error) {
        console.error('Error fetching driver activity:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDriverActivity();
    
    // Real-time updates
    const channel = supabase
      .channel('driver-activity')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'drivers' },
        () => fetchDriverActivity()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const activeDrivers = drivers.filter(d => d.status === 'active');
  const inactiveDrivers = drivers.filter(d => d.status !== 'active');

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return <Badge variant="default" className="bg-green-500"><UserCheck className="h-3 w-3 mr-1" />Aktiv</Badge>;
      case 'break':
        return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" />Pause</Badge>;
      default:
        return <Badge variant="outline"><UserX className="h-3 w-3 mr-1" />Inaktiv</Badge>;
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            {getTitle()}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-12 bg-muted rounded" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          {getTitle()}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-green-600">{activeDrivers.length}</div>
            <div className="text-xs text-muted-foreground">
              {language === 'de' ? 'Aktiv' : language === 'th' ? 'ใช้งาน' : 'Active'}
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-muted-foreground">{inactiveDrivers.length}</div>
            <div className="text-xs text-muted-foreground">
              {language === 'de' ? 'Inaktiv' : language === 'th' ? 'ไม่ใช้งาน' : 'Inactive'}
            </div>
          </div>
        </div>

        <div className="space-y-2 max-h-40 overflow-y-auto">
          {drivers.slice(0, 5).map((driver) => (
            <div key={driver.id} className="flex items-center justify-between p-2 rounded-lg border">
              <div className="flex-1">
                <div className="font-medium text-sm">{driver.name}</div>
                <div className="text-xs text-muted-foreground">
                  {driver.hoursWorked}h {language === 'de' ? 'gearbeitet' : language === 'th' ? 'ทำงาน' : 'worked'}
                </div>
              </div>
              {getStatusBadge(driver.status)}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}