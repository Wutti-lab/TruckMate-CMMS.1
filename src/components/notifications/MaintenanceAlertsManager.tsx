import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  AlertTriangle, 
  Calendar, 
  Settings, 
  Mail, 
  Wrench,
  Clock,
  CheckCircle
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

interface MaintenanceAlert {
  vehicleId: string;
  licensePlate: string;
  model: string;
  nextService: string;
  daysOverdue: number;
  status: 'due' | 'overdue' | 'critical';
}

export function MaintenanceAlertsManager() {
  const [alerts, setAlerts] = useState<MaintenanceAlert[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastCheck, setLastCheck] = useState<string | null>(null);
  const { language } = useLanguage();

  const getHeaderText = (en: string, de: string): string => {
    return language === 'de' ? de : en;
  };

  const fetchMaintenanceAlerts = async () => {
    try {
      const { data: vehicles, error } = await supabase
        .from('vehicles')
        .select('id, license_plate, model, next_service, status')
        .not('next_service', 'is', null);

      if (error) throw error;

      const now = new Date();
      const alertsList: MaintenanceAlert[] = [];

      vehicles?.forEach(vehicle => {
        const nextServiceDate = new Date(vehicle.next_service);
        const diffTime = nextServiceDate.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        let alertStatus: 'due' | 'overdue' | 'critical' | null = null;

        if (diffDays <= 0) {
          const daysOverdue = Math.abs(diffDays);
          if (daysOverdue >= 30) {
            alertStatus = 'critical';
          } else {
            alertStatus = 'overdue';
          }
        } else if (diffDays <= 7) {
          alertStatus = 'due';
        }

        if (alertStatus) {
          alertsList.push({
            vehicleId: vehicle.id,
            licensePlate: vehicle.license_plate,
            model: vehicle.model,
            nextService: vehicle.next_service,
            daysOverdue: diffDays <= 0 ? Math.abs(diffDays) : 0,
            status: alertStatus
          });
        }
      });

      setAlerts(alertsList);
      setLastCheck(new Date().toLocaleString());
    } catch (error) {
      console.error('Error fetching maintenance alerts:', error);
      toast({
        title: getHeaderText("Error", "Fehler"),
        description: getHeaderText("Failed to fetch maintenance alerts", "Wartungsalarme konnten nicht geladen werden"),
        variant: "destructive",
      });
    }
  };

  const sendMaintenanceNotifications = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('maintenance-alerts');
      
      if (error) throw error;

      toast({
        title: getHeaderText("Notifications sent", "Benachrichtigungen gesendet"),
        description: getHeaderText(
          `${data.alertsGenerated} maintenance alerts sent`,
          `${data.alertsGenerated} Wartungsalarme gesendet`
        ),
      });

      await fetchMaintenanceAlerts();
    } catch (error) {
      console.error('Error sending notifications:', error);
      toast({
        title: getHeaderText("Error", "Fehler"),
        description: getHeaderText("Failed to send notifications", "Benachrichtigungen konnten nicht gesendet werden"),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'destructive';
      case 'overdue': return 'default';
      case 'due': return 'secondary';
      default: return 'outline';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'critical': return <AlertTriangle className="h-4 w-4" />;
      case 'overdue': return <Clock className="h-4 w-4" />;
      case 'due': return <Calendar className="h-4 w-4" />;
      default: return <CheckCircle className="h-4 w-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'critical': return getHeaderText('Critical', 'Kritisch');
      case 'overdue': return getHeaderText('Overdue', 'Überfällig');
      case 'due': return getHeaderText('Due Soon', 'Fällig');
      default: return status;
    }
  };

  useEffect(() => {
    fetchMaintenanceAlerts();
  }, []);

  const criticalAlerts = alerts.filter(a => a.status === 'critical');
  const overdueAlerts = alerts.filter(a => a.status === 'overdue');
  const dueAlerts = alerts.filter(a => a.status === 'due');

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wrench className="h-5 w-5" />
            {getHeaderText("Maintenance Alerts", "Wartungsalarme")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                onClick={fetchMaintenanceAlerts}
                variant="outline"
                size="sm"
              >
                <Settings className="h-4 w-4 mr-2" />
                {getHeaderText("Refresh", "Aktualisieren")}
              </Button>
              <Button 
                onClick={sendMaintenanceNotifications}
                disabled={isLoading}
                size="sm"
              >
                <Mail className="h-4 w-4 mr-2" />
                {isLoading 
                  ? getHeaderText("Sending...", "Sende...") 
                  : getHeaderText("Send Notifications", "Benachrichtigungen senden")
                }
              </Button>
            </div>
            {lastCheck && (
              <span className="text-sm text-muted-foreground">
                {getHeaderText("Last check:", "Letzte Prüfung:")} {lastCheck}
              </span>
            )}
          </div>

          {alerts.length === 0 ? (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                {getHeaderText(
                  "No maintenance alerts. All vehicles are up to date!",
                  "Keine Wartungsalarme. Alle Fahrzeuge sind auf dem neuesten Stand!"
                )}
              </AlertDescription>
            </Alert>
          ) : (
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="border-destructive">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                    {getHeaderText("Critical", "Kritisch")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-destructive">
                    {criticalAlerts.length}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {getHeaderText(">30 days overdue", ">30 Tage überfällig")}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-orange-500">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Clock className="h-4 w-4 text-orange-500" />
                    {getHeaderText("Overdue", "Überfällig")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-500">
                    {overdueAlerts.length}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {getHeaderText("Past due date", "Nach Fälligkeitsdatum")}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-yellow-500">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-yellow-500" />
                    {getHeaderText("Due Soon", "Fällig")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-500">
                    {dueAlerts.length}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {getHeaderText("Next 7 days", "Nächste 7 Tage")}
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          {alerts.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-medium">
                {getHeaderText("Alert Details", "Alarm Details")}
              </h3>
              <div className="space-y-2">
                {alerts.map((alert, index) => (
                  <div 
                    key={index} 
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      {getStatusIcon(alert.status)}
                      <div>
                        <div className="font-medium">
                          {alert.licensePlate} - {alert.model}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {alert.status === 'due' 
                            ? `${getHeaderText("Due", "Fällig")}: ${new Date(alert.nextService).toLocaleDateString()}`
                            : `${alert.daysOverdue} ${getHeaderText("days overdue", "Tage überfällig")}`
                          }
                        </div>
                      </div>
                    </div>
                    <Badge variant={getStatusColor(alert.status)}>
                      {getStatusText(alert.status)}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}