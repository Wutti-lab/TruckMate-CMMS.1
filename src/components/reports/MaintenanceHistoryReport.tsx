
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import { Wrench, Calendar, AlertTriangle, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export function MaintenanceHistoryReport() {
  const { language } = useLanguage();

  const maintenanceData = [
    { month: 'Jan', scheduled: 8, completed: 7, overdue: 1, cost: 2400 },
    { month: 'Feb', scheduled: 6, completed: 6, overdue: 0, cost: 1800 },
    { month: 'Mar', scheduled: 12, completed: 10, overdue: 2, cost: 3200 },
    { month: 'Apr', scheduled: 9, completed: 8, overdue: 1, cost: 2100 },
    { month: 'May', scheduled: 10, completed: 9, overdue: 1, cost: 2800 },
    { month: 'Jun', scheduled: 7, completed: 7, overdue: 0, cost: 1900 },
  ];

  const maintenanceTypes = [
    { type: 'Ölwechsel', count: 15, avgCost: 150, totalCost: 2250 },
    { type: 'Reifenwechsel', count: 8, avgCost: 800, totalCost: 6400 },
    { type: 'Bremsenservice', count: 6, avgCost: 450, totalCost: 2700 },
    { type: 'Inspektion', count: 12, avgCost: 200, totalCost: 2400 },
    { type: 'Motorwartung', count: 4, avgCost: 1200, totalCost: 4800 },
  ];

  const recentMaintenanceRecords = [
    { 
      vehicle: 'TM-001', 
      date: '2024-01-15', 
      type: 'Ölwechsel', 
      status: 'Abgeschlossen', 
      cost: 180, 
      technician: 'Hans Weber',
      nextService: '2024-04-15'
    },
    { 
      vehicle: 'TM-002', 
      date: '2024-01-12', 
      type: 'Reifenwechsel', 
      status: 'Überfällig', 
      cost: 850, 
      technician: 'Maria Klein',
      nextService: '2024-07-12'
    },
    { 
      vehicle: 'TM-003', 
      date: '2024-01-10', 
      type: 'Bremsenservice', 
      status: 'Abgeschlossen', 
      cost: 420, 
      technician: 'Klaus Müller',
      nextService: '2024-07-10'
    },
    { 
      vehicle: 'TM-004', 
      date: '2024-01-08', 
      type: 'Inspektion', 
      status: 'Geplant', 
      cost: 220, 
      technician: 'Anna Schmidt',
      nextService: '2024-07-08'
    },
    { 
      vehicle: 'TM-005', 
      date: '2024-01-05', 
      type: 'Motorwartung', 
      status: 'Abgeschlossen', 
      cost: 1300, 
      technician: 'Stefan Fischer',
      nextService: '2024-07-05'
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Abgeschlossen':
        return <Badge variant="default" className="bg-green-600"><CheckCircle className="h-3 w-3 mr-1" />Abgeschlossen</Badge>;
      case 'Geplant':
        return <Badge variant="secondary"><Calendar className="h-3 w-3 mr-1" />Geplant</Badge>;
      case 'Überfällig':
        return <Badge variant="destructive"><AlertTriangle className="h-3 w-3 mr-1" />Überfällig</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const totalMaintenanceCost = maintenanceData.reduce((sum, month) => sum + month.cost, 0);
  const completionRate = (maintenanceData.reduce((sum, month) => sum + month.completed, 0) / 
                         maintenanceData.reduce((sum, month) => sum + month.scheduled, 0)) * 100;

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
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

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{language === 'de' ? 'Monatliche Wartungsaktivität' : 'Monthly Maintenance Activity'}</CardTitle>
            <CardDescription>
              {language === 'de' ? 'Geplante vs. abgeschlossene Wartungen' : 'Scheduled vs. completed maintenance'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                scheduled: {
                  label: language === 'de' ? 'Geplant' : 'Scheduled',
                  color: "hsl(var(--chart-1))",
                },
                completed: {
                  label: language === 'de' ? 'Abgeschlossen' : 'Completed',
                  color: "hsl(var(--chart-2))",
                },
                overdue: {
                  label: language === 'de' ? 'Überfällig' : 'Overdue',
                  color: "hsl(var(--chart-3))",
                },
              }}
            >
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={maintenanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="scheduled" fill="#3b82f6" name={language === 'de' ? 'Geplant' : 'Scheduled'} />
                  <Bar dataKey="completed" fill="#10b981" name={language === 'de' ? 'Abgeschlossen' : 'Completed'} />
                  <Bar dataKey="overdue" fill="#ef4444" name={language === 'de' ? 'Überfällig' : 'Overdue'} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{language === 'de' ? 'Wartungskosten-Trend' : 'Maintenance Cost Trend'}</CardTitle>
            <CardDescription>
              {language === 'de' ? 'Monatliche Wartungsausgaben' : 'Monthly maintenance expenses'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                cost: {
                  label: language === 'de' ? 'Kosten (฿)' : 'Cost (฿)',
                  color: "hsl(var(--chart-4))",
                },
              }}
            >
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={maintenanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="cost" stroke="#f59e0b" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Maintenance Types Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>{language === 'de' ? 'Wartungsarten-Analyse' : 'Maintenance Types Analysis'}</CardTitle>
          <CardDescription>
            {language === 'de' ? 'Häufigkeit und Kosten nach Wartungsart' : 'Frequency and costs by maintenance type'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">{language === 'de' ? 'Wartungsart' : 'Maintenance Type'}</th>
                  <th className="text-left p-3">{language === 'de' ? 'Anzahl' : 'Count'}</th>
                  <th className="text-left p-3">{language === 'de' ? 'Durchschn. Kosten' : 'Avg Cost'}</th>
                  <th className="text-left p-3">{language === 'de' ? 'Gesamtkosten' : 'Total Cost'}</th>
                  <th className="text-left p-3">{language === 'de' ? 'Anteil' : 'Share'}</th>
                </tr>
              </thead>
              <tbody>
                {maintenanceTypes.map((type, index) => {
                  const totalAllCosts = maintenanceTypes.reduce((sum, t) => sum + t.totalCost, 0);
                  const percentage = ((type.totalCost / totalAllCosts) * 100).toFixed(1);
                  
                  return (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="p-3 font-medium">{type.type}</td>
                      <td className="p-3">{type.count}</td>
                      <td className="p-3">{type.avgCost.toLocaleString()} ฿</td>
                      <td className="p-3 font-semibold">{type.totalCost.toLocaleString()} ฿</td>
                      <td className="p-3">
                        <Badge variant="outline">{percentage}%</Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Recent Maintenance Records */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{language === 'de' ? 'Wartungshistorie' : 'Maintenance History'}</CardTitle>
              <CardDescription>
                {language === 'de' ? 'Neueste Wartungsaktivitäten' : 'Recent maintenance activities'}
              </CardDescription>
            </div>
            <Button variant="outline">
              {language === 'de' ? 'Vollständige Historie exportieren' : 'Export Full History'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">{language === 'de' ? 'Fahrzeug' : 'Vehicle'}</th>
                  <th className="text-left p-3">{language === 'de' ? 'Datum' : 'Date'}</th>
                  <th className="text-left p-3">{language === 'de' ? 'Wartungsart' : 'Type'}</th>
                  <th className="text-left p-3">Status</th>
                  <th className="text-left p-3">{language === 'de' ? 'Kosten' : 'Cost'}</th>
                  <th className="text-left p-3">{language === 'de' ? 'Techniker' : 'Technician'}</th>
                  <th className="text-left p-3">{language === 'de' ? 'Nächste Wartung' : 'Next Service'}</th>
                </tr>
              </thead>
              <tbody>
                {recentMaintenanceRecords.map((record, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium">{record.vehicle}</td>
                    <td className="p-3">{new Date(record.date).toLocaleDateString()}</td>
                    <td className="p-3">{record.type}</td>
                    <td className="p-3">{getStatusBadge(record.status)}</td>
                    <td className="p-3 font-semibold">{record.cost.toLocaleString()} ฿</td>
                    <td className="p-3">{record.technician}</td>
                    <td className="p-3 text-sm text-gray-600">{new Date(record.nextService).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
