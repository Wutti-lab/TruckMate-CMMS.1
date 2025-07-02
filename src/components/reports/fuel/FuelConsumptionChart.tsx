
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import { useLanguage } from "@/contexts/LanguageContext";

const monthlyFuelData = [
  { month: 'Jan', consumption: 2400, cost: 3600, efficiency: 8.5 },
  { month: 'Feb', consumption: 2100, cost: 3150, efficiency: 9.2 },
  { month: 'Mar', consumption: 2800, cost: 4200, efficiency: 7.8 },
  { month: 'Apr', consumption: 2300, cost: 3450, efficiency: 8.9 },
  { month: 'May', consumption: 2600, cost: 3900, efficiency: 8.1 },
  { month: 'Jun', consumption: 2200, cost: 3300, efficiency: 9.0 },
];

export function FuelConsumptionChart() {
  const { language } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{language === 'de' ? 'Monatlicher Kraftstoffverbrauch' : 'Monthly Fuel Consumption'}</CardTitle>
        <CardDescription>
          {language === 'de' ? 'Kraftstoffverbrauch und -kosten über Zeit' : 'Fuel consumption and costs over time'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            consumption: {
              label: language === 'de' ? 'Verbrauch (L)' : 'Consumption (L)',
              color: "hsl(var(--chart-1))",
            },
            cost: {
              label: language === 'de' ? 'Kosten (฿)' : 'Cost (฿)',
              color: "hsl(var(--chart-2))",
            },
          }}
        >
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyFuelData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Line type="monotone" dataKey="consumption" stroke="#3b82f6" name={language === 'de' ? 'Verbrauch (L)' : 'Consumption (L)'} />
              <Line type="monotone" dataKey="cost" stroke="#10b981" name={language === 'de' ? 'Kosten (฿)' : 'Cost (฿)'} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
