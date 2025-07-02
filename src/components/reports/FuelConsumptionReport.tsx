
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import { Fuel, TrendingDown, TrendingUp, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";

export function FuelConsumptionReport() {
  const { language } = useLanguage();

  // Mock data for fuel consumption trends
  const monthlyFuelData = [
    { month: 'Jan', consumption: 2400, cost: 3600, efficiency: 8.5 },
    { month: 'Feb', consumption: 2100, cost: 3150, efficiency: 9.2 },
    { month: 'Mar', consumption: 2800, cost: 4200, efficiency: 7.8 },
    { month: 'Apr', consumption: 2300, cost: 3450, efficiency: 8.9 },
    { month: 'May', consumption: 2600, cost: 3900, efficiency: 8.1 },
    { month: 'Jun', consumption: 2200, cost: 3300, efficiency: 9.0 },
  ];

  const vehicleFuelData = [
    { vehicle: 'TM-001', consumption: 450, efficiency: 8.2, status: 'good' },
    { vehicle: 'TM-002', consumption: 520, efficiency: 7.1, status: 'warning' },
    { vehicle: 'TM-003', consumption: 380, efficiency: 9.5, status: 'excellent' },
    { vehicle: 'TM-004', consumption: 610, efficiency: 6.8, status: 'poor' },
    { vehicle: 'TM-005', consumption: 420, efficiency: 8.7, status: 'good' },
  ];

  const fuelAlerts = [
    { vehicle: 'TM-002', issue: 'Hoher Kraftstoffverbrauch', severity: 'warning' },
    { vehicle: 'TM-004', issue: 'Niedrige Kraftstoffeffizienz', severity: 'critical' },
  ];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {language === 'de' ? 'Gesamtverbrauch' : 'Total Consumption'}
            </CardTitle>
            <Fuel className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14,400L</div>
            <p className="text-xs text-muted-foreground">
              <TrendingDown className="inline h-3 w-3 text-green-600" />
              -5.2% {language === 'de' ? 'vs. Vormonat' : 'vs. last month'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {language === 'de' ? 'Durchschn. Effizienz' : 'Avg. Efficiency'}
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.4 km/L</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 text-green-600" />
              +2.1% {language === 'de' ? 'Verbesserung' : 'improvement'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {language === 'de' ? 'Kraftstoffkosten' : 'Fuel Costs'}
            </CardTitle>
            <div>฿</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">21,600 ฿</div>
            <p className="text-xs text-muted-foreground">
              <TrendingDown className="inline h-3 w-3 text-green-600" />
              -8.3% {language === 'de' ? 'Einsparung' : 'savings'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {language === 'de' ? 'Aktive Warnungen' : 'Active Alerts'}
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">2</div>
            <p className="text-xs text-muted-foreground">
              {language === 'de' ? 'Benötigen Aufmerksamkeit' : 'Need attention'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
      </div>

      {/* Vehicle Performance Table & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>{language === 'de' ? 'Fahrzeug-Kraftstoffleistung' : 'Vehicle Fuel Performance'}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">{language === 'de' ? 'Fahrzeug' : 'Vehicle'}</th>
                    <th className="text-left p-2">{language === 'de' ? 'Verbrauch (L)' : 'Consumption (L)'}</th>
                    <th className="text-left p-2">{language === 'de' ? 'Effizienz (km/L)' : 'Efficiency (km/L)'}</th>
                    <th className="text-left p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {vehicleFuelData.map((vehicle) => (
                    <tr key={vehicle.vehicle} className="border-b">
                      <td className="p-2 font-medium">{vehicle.vehicle}</td>
                      <td className="p-2">{vehicle.consumption}</td>
                      <td className="p-2">{vehicle.efficiency}</td>
                      <td className="p-2">
                        <Badge 
                          variant={
                            vehicle.status === 'excellent' ? 'default' :
                            vehicle.status === 'good' ? 'secondary' :
                            vehicle.status === 'warning' ? 'outline' : 'destructive'
                          }
                        >
                          {vehicle.status === 'excellent' ? (language === 'de' ? 'Ausgezeichnet' : 'Excellent') :
                           vehicle.status === 'good' ? (language === 'de' ? 'Gut' : 'Good') :
                           vehicle.status === 'warning' ? (language === 'de' ? 'Warnung' : 'Warning') :
                           (language === 'de' ? 'Schlecht' : 'Poor')}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              {language === 'de' ? 'Kraftstoff-Warnungen' : 'Fuel Alerts'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {fuelAlerts.map((alert, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <AlertTriangle className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">{alert.vehicle}</p>
                    <p className="text-xs text-gray-700">{alert.issue}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
