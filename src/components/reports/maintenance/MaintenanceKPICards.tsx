
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench, Calendar, AlertTriangle, CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function MaintenanceKPICards() {
  const { language } = useLanguage();

  const maintenanceData = [
    { month: 'Jan', scheduled: 8, completed: 7, overdue: 1, cost: 2400 },
    { month: 'Feb', scheduled: 6, completed: 6, overdue: 0, cost: 1800 },
    { month: 'Mar', scheduled: 12, completed: 10, overdue: 2, cost: 3200 },
    { month: 'Apr', scheduled: 9, completed: 8, overdue: 1, cost: 2100 },
    { month: 'May', scheduled: 10, completed: 9, overdue: 1, cost: 2800 },
    { month: 'Jun', scheduled: 7, completed: 7, overdue: 0, cost: 1900 },
  ];

  const totalMaintenanceCost = maintenanceData.reduce((sum, month) => sum + month.cost, 0);
  const completionRate = (maintenanceData.reduce((sum, month) => sum + month.completed, 0) / 
                         maintenanceData.reduce((sum, month) => sum + month.scheduled, 0)) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {language === 'de' ? 'Gesamtwartungskosten' : 'Total Maintenance Cost'}
          </CardTitle>
          <Wrench className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalMaintenanceCost.toLocaleString()} ฿</div>
          <p className="text-xs text-muted-foreground">
            {language === 'de' ? 'Letzten 6 Monate' : 'Last 6 months'}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {language === 'de' ? 'Fertigstellungsrate' : 'Completion Rate'}
          </CardTitle>
          <CheckCircle className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{completionRate.toFixed(1)}%</div>
          <p className="text-xs text-muted-foreground">
            {language === 'de' ? 'Pünktlich abgeschlossen' : 'Completed on time'}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {language === 'de' ? 'Anstehende Wartungen' : 'Upcoming Maintenance'}
          </CardTitle>
          <Calendar className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">7</div>
          <p className="text-xs text-muted-foreground">
            {language === 'de' ? 'Nächste 30 Tage' : 'Next 30 days'}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {language === 'de' ? 'Überfällige Wartungen' : 'Overdue Maintenance'}
          </CardTitle>
          <AlertTriangle className="h-4 w-4 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">5</div>
          <p className="text-xs text-muted-foreground">
            {language === 'de' ? 'Sofortige Aufmerksamkeit' : 'Immediate attention'}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
