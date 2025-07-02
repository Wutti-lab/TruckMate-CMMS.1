
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import { useLanguage } from "@/contexts/LanguageContext";

export function MaintenanceCharts() {
  const { language } = useLanguage();

  const maintenanceData = [
    { month: 'Jan', scheduled: 8, completed: 7, overdue: 1, cost: 2400 },
    { month: 'Feb', scheduled: 6, completed: 6, overdue: 0, cost: 1800 },
    { month: 'Mar', scheduled: 12, completed: 10, overdue: 2, cost: 3200 },
    { month: 'Apr', scheduled: 9, completed: 8, overdue: 1, cost: 2100 },
    { month: 'May', scheduled: 10, completed: 9, overdue: 1, cost: 2800 },
    { month: 'Jun', scheduled: 7, completed: 7, overdue: 0, cost: 1900 },
  ];

  return (
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
  );
}
