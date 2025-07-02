
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts";
import { useLanguage } from "@/contexts/LanguageContext";

const monthlyFuelData = [
  { month: 'Jan', consumption: 2400, cost: 3600, efficiency: 8.5 },
  { month: 'Feb', consumption: 2100, cost: 3150, efficiency: 9.2 },
  { month: 'Mar', consumption: 2800, cost: 4200, efficiency: 7.8 },
  { month: 'Apr', consumption: 2300, cost: 3450, efficiency: 8.9 },
  { month: 'May', consumption: 2600, cost: 3900, efficiency: 8.1 },
  { month: 'Jun', consumption: 2200, cost: 3300, efficiency: 9.0 },
];

export function FuelEfficiencyChart() {
  const { language } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{language === 'de' ? 'Kraftstoffeffizienz Trend' : 'Fuel Efficiency Trend'}</CardTitle>
        <CardDescription>
          {language === 'de' ? 'Durchschnittliche km/L über Monate' : 'Average km/L over months'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            efficiency: {
              label: "km/L",
              color: "hsl(var(--chart-3))",
            },
          }}
        >
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyFuelData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area type="monotone" dataKey="efficiency" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.2} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
