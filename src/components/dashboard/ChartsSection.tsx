
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Area, AreaChart, Cell, Pie, PieChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { useLanguage } from "@/contexts/LanguageContext";

interface ChartsSectionProps {
  fleetStatusData: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

export function ChartsSection({ fleetStatusData }: ChartsSectionProps) {
  const { t } = useLanguage();

  // Sample data for charts (can be made dynamic later)
  const fuelData = [
    { month: 'Jan', consumption: 2400 },
    { month: 'Feb', consumption: 1398 },
    { month: 'Mar', consumption: 9800 },
    { month: 'Apr', consumption: 3908 },
    { month: 'May', consumption: 4800 },
    { month: 'Jun', consumption: 3800 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Fleet Status Chart */}
      <Card>
        <CardHeader>
          <CardTitle>{t("fleetStatus")}</CardTitle>
          <CardDescription>{t("overallHealth")}</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={fleetStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {fleetStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Fuel Consumption Chart */}
      <Card>
        <CardHeader>
          <CardTitle>{t("fuelConsumption")}</CardTitle>
          <CardDescription>Monthly fuel usage trends</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={fuelData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Area 
                type="monotone" 
                dataKey="consumption" 
                stroke="#3b82f6" 
                fill="#3b82f6" 
                fillOpacity={0.1} 
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
