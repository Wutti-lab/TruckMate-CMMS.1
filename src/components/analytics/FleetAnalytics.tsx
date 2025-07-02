
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { useTranslation } from '@/hooks/useTranslation';

const fuelData = [
  { month: 'Jan', consumption: 2400, efficiency: 78 },
  { month: 'Feb', consumption: 2210, efficiency: 82 },
  { month: 'Mar', consumption: 2290, efficiency: 79 },
  { month: 'Apr', consumption: 2000, efficiency: 85 },
  { month: 'May', consumption: 2181, efficiency: 81 },
  { month: 'Jun', consumption: 2500, efficiency: 76 }
];

const maintenanceData = [
  { type: 'Routine', count: 45, cost: 15000 },
  { type: 'Emergency', count: 12, cost: 8500 },
  { type: 'Preventive', count: 28, cost: 12000 },
  { type: 'Inspection', count: 67, cost: 5500 }
];

const vehicleStatusData = [
  { name: 'Active', value: 32, color: '#10b981' },
  { name: 'Maintenance', value: 8, color: '#f59e0b' },
  { name: 'Idle', value: 12, color: '#6b7280' },
  { name: 'Out of Service', value: 3, color: '#ef4444' }
];

export function FleetAnalytics() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Fuel Consumption & Efficiency</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={fuelData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Bar yAxisId="left" dataKey="consumption" fill="#3b82f6" name="Consumption (L)" />
                <Line yAxisId="right" type="monotone" dataKey="efficiency" stroke="#10b981" strokeWidth={2} name="Efficiency %" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vehicle Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={vehicleStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {vehicleStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Maintenance Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={maintenanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Bar yAxisId="left" dataKey="count" fill="#3b82f6" name="Count" />
              <Bar yAxisId="right" dataKey="cost" fill="#f59e0b" name="Cost (THB)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
