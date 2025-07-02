
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import { useLanguage } from "@/contexts/LanguageContext";

const monthlyPerformanceData = [
  { month: 'Jan', avgScore: 85, safetyIncidents: 2, fuelEfficiency: 8.2 },
  { month: 'Feb', avgScore: 87, safetyIncidents: 1, fuelEfficiency: 8.5 },
  { month: 'Mar', avgScore: 83, safetyIncidents: 3, fuelEfficiency: 8.0 },
  { month: 'Apr', avgScore: 89, safetyIncidents: 1, fuelEfficiency: 8.7 },
  { month: 'May', avgScore: 91, safetyIncidents: 0, fuelEfficiency: 8.9 },
  { month: 'Jun', avgScore: 88, safetyIncidents: 1, fuelEfficiency: 8.6 },
];

export function DriverPerformanceCharts() {
  const { language } = useLanguage();

  return (
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
  );
}
