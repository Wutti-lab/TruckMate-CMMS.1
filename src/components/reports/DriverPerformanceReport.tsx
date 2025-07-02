
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import { Users, Clock, Award, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/contexts/LanguageContext";

export function DriverPerformanceReport() {
  const { language } = useLanguage();

  const driverPerformanceData = [
    { driver: 'Hans Müller', score: 92, hoursWorked: 168, fuelEfficiency: 8.9, safetyRating: 'A+', violations: 0 },
    { driver: 'Maria Schmidt', score: 88, hoursWorked: 172, fuelEfficiency: 8.4, safetyRating: 'A', violations: 1 },
    { driver: 'Klaus Weber', score: 76, hoursWorked: 165, fuelEfficiency: 7.8, safetyRating: 'B+', violations: 2 },
    { driver: 'Anna Fischer', score: 94, hoursWorked: 160, fuelEfficiency: 9.2, safetyRating: 'A+', violations: 0 },
    { driver: 'Stefan Braun', score: 82, hoursWorked: 175, fuelEfficiency: 8.1, safetyRating: 'B', violations: 3 },
  ];

  const monthlyPerformanceData = [
    { month: 'Jan', avgScore: 85, safetyIncidents: 2, fuelEfficiency: 8.2 },
    { month: 'Feb', avgScore: 87, safetyIncidents: 1, fuelEfficiency: 8.5 },
    { month: 'Mar', avgScore: 83, safetyIncidents: 3, fuelEfficiency: 8.0 },
    { month: 'Apr', avgScore: 89, safetyIncidents: 1, fuelEfficiency: 8.7 },
    { month: 'May', avgScore: 91, safetyIncidents: 0, fuelEfficiency: 8.9 },
    { month: 'Jun', avgScore: 88, safetyIncidents: 1, fuelEfficiency: 8.6 },
  ];

  const getSafetyBadgeVariant = (rating: string) => {
    if (rating === 'A+') return 'default';
    if (rating === 'A') return 'secondary';
    if (rating.startsWith('B')) return 'outline';
    return 'destructive';
  };

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {language === 'de' ? 'Aktive Fahrer' : 'Active Drivers'}
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              {language === 'de' ? 'Alle im Einsatz' : 'All deployed'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {language === 'de' ? 'Durchschn. Bewertung' : 'Avg. Score'}
            </CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">86.4</div>
            <p className="text-xs text-muted-foreground">
              {language === 'de' ? 'von 100 Punkten' : 'out of 100 points'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {language === 'de' ? 'Gesamtarbeitsstunden' : 'Total Work Hours'}
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">840h</div>
            <p className="text-xs text-muted-foreground">
              {language === 'de' ? 'Diesen Monat' : 'This month'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {language === 'de' ? 'Sicherheitsvorfälle' : 'Safety Incidents'}
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">1</div>
            <p className="text-xs text-muted-foreground">
              {language === 'de' ? 'Diesen Monat' : 'This month'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{language === 'de' ? 'Monatliche Leistungstrends' : 'Monthly Performance Trends'}</CardTitle>
            <CardDescription>
              {language === 'de' ? 'Durchschnittliche Bewertungen und Kraftstoffeffizienz' : 'Average scores and fuel efficiency'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                avgScore: {
                  label: language === 'de' ? 'Durchschn. Bewertung' : 'Avg Score',
                  color: "hsl(var(--chart-1))",
                },
                fuelEfficiency: {
                  label: language === 'de' ? 'Kraftstoffeffizienz (km/L)' : 'Fuel Efficiency (km/L)',
                  color: "hsl(var(--chart-2))",
                },
              }}
            >
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Line type="monotone" dataKey="avgScore" stroke="#3b82f6" name={language === 'de' ? 'Durchschn. Bewertung' : 'Avg Score'} />
                  <Line type="monotone" dataKey="fuelEfficiency" stroke="#10b981" name={language === 'de' ? 'Kraftstoffeffizienz' : 'Fuel Efficiency'} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{language === 'de' ? 'Sicherheitsvorfälle pro Monat' : 'Safety Incidents per Month'}</CardTitle>
            <CardDescription>
              {language === 'de' ? 'Anzahl der gemeldeten Sicherheitsvorfälle' : 'Number of reported safety incidents'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                safetyIncidents: {
                  label: language === 'de' ? 'Sicherheitsvorfälle' : 'Safety Incidents',
                  color: "hsl(var(--chart-3))",
                },
              }}
            >
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="safetyIncidents" fill="#f59e0b" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Driver Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>{language === 'de' ? 'Individuelle Fahrleistung' : 'Individual Driver Performance'}</CardTitle>
          <CardDescription>
            {language === 'de' ? 'Detaillierte Leistungskennzahlen für jeden Fahrer' : 'Detailed performance metrics for each driver'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">{language === 'de' ? 'Fahrer' : 'Driver'}</th>
                  <th className="text-left p-3">{language === 'de' ? 'Bewertung' : 'Score'}</th>
                  <th className="text-left p-3">{language === 'de' ? 'Arbeitsstunden' : 'Hours Worked'}</th>
                  <th className="text-left p-3">{language === 'de' ? 'Kraftstoffeffizienz' : 'Fuel Efficiency'}</th>
                  <th className="text-left p-3">{language === 'de' ? 'Sicherheitsbewertung' : 'Safety Rating'}</th>
                  <th className="text-left p-3">{language === 'de' ? 'Verstöße' : 'Violations'}</th>
                </tr>
              </thead>
              <tbody>
                {driverPerformanceData.map((driver, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium">{driver.driver}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{driver.score}</span>
                        <Progress value={driver.score} className="w-16 h-2" />
                      </div>
                    </td>
                    <td className="p-3">{driver.hoursWorked}h</td>
                    <td className="p-3">{driver.fuelEfficiency} km/L</td>
                    <td className="p-3">
                      <Badge variant={getSafetyBadgeVariant(driver.safetyRating)}>
                        {driver.safetyRating}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <span className={driver.violations === 0 ? 'text-green-600' : driver.violations <= 2 ? 'text-amber-600' : 'text-red-600'}>
                        {driver.violations}
                      </span>
                    </td>
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
