
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, Pie, PieChart, Cell, Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import { DollarSign, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";

export function CostAnalysisReport() {
  const { language } = useLanguage();

  const monthlyCosts = [
    { month: 'Jan', fuel: 3600, maintenance: 2400, insurance: 800, total: 6800 },
    { month: 'Feb', fuel: 3150, maintenance: 1800, insurance: 800, total: 5750 },
    { month: 'Mar', fuel: 4200, maintenance: 3200, insurance: 800, total: 8200 },
    { month: 'Apr', fuel: 3450, maintenance: 2100, insurance: 800, total: 6350 },
    { month: 'May', fuel: 3900, maintenance: 2800, insurance: 800, total: 7500 },
    { month: 'Jun', fuel: 3300, maintenance: 1900, insurance: 800, total: 6000 },
  ];

  const costBreakdown = [
    { category: 'Kraftstoff', value: 21600, color: '#3b82f6' },
    { category: 'Wartung', value: 14200, color: '#10b981' },
    { category: 'Versicherung', value: 4800, color: '#f59e0b' },
    { category: 'Reparaturen', value: 6500, color: '#ef4444' },
    { category: 'Sonstige', value: 2900, color: '#8b5cf6' },
  ];

  const vehicleCosts = [
    { vehicle: 'TM-001', totalCost: 8900, fuelCost: 4200, maintenanceCost: 3500, costPerKm: 0.85 },
    { vehicle: 'TM-002', totalCost: 12400, fuelCost: 5800, maintenanceCost: 4900, costPerKm: 1.15 },
    { vehicle: 'TM-003', totalCost: 7200, fuelCost: 3600, maintenanceCost: 2800, costPerKm: 0.72 },
    { vehicle: 'TM-004', totalCost: 15600, fuelCost: 7200, maintenanceCost: 6100, costPerKm: 1.42 },
    { vehicle: 'TM-005', totalCost: 9800, fuelCost: 4800, maintenanceCost: 3600, costPerKm: 0.89 },
  ];

  const totalCosts = monthlyCosts.reduce((sum, month) => sum + month.total, 0);
  const avgMonthlyCost = totalCosts / monthlyCosts.length;
  const costTrend = ((monthlyCosts[monthlyCosts.length - 1].total - monthlyCosts[0].total) / monthlyCosts[0].total) * 100;

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {language === 'de' ? 'Gesamtkosten' : 'Total Costs'}
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">50,000 ฿</div>
            <p className="text-xs text-muted-foreground">
              {language === 'de' ? 'Letzten 6 Monate' : 'Last 6 months'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {language === 'de' ? 'Durchschn. Monatlich' : 'Avg. Monthly'}
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(avgMonthlyCost).toLocaleString()} ฿</div>
            <p className="text-xs text-muted-foreground">
              {costTrend > 0 ? (
                <TrendingUp className="inline h-3 w-3 text-red-600" />
              ) : (
                <TrendingDown className="inline h-3 w-3 text-green-600" />
              )}
              {Math.abs(costTrend).toFixed(1)}% {language === 'de' ? 'Trend' : 'trend'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {language === 'de' ? 'Kosten pro km' : 'Cost per km'}
            </CardTitle>
            <div>฿/km</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.01 ฿</div>
            <p className="text-xs text-muted-foreground">
              {language === 'de' ? 'Flottendurchschnitt' : 'Fleet average'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {language === 'de' ? 'Kostenüberschreitungen' : 'Cost Overruns'}
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">1</div>
            <p className="text-xs text-muted-foreground">
              {language === 'de' ? 'Fahrzeug über Budget' : 'Vehicle over budget'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{language === 'de' ? 'Monatliche Kostentrends' : 'Monthly Cost Trends'}</CardTitle>
            <CardDescription>
              {language === 'de' ? 'Aufschlüsselung der Kosten nach Kategorie' : 'Cost breakdown by category'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                fuel: {
                  label: language === 'de' ? 'Kraftstoff' : 'Fuel',
                  color: "hsl(var(--chart-1))",
                },
                maintenance: {
                  label: language === 'de' ? 'Wartung' : 'Maintenance',
                  color: "hsl(var(--chart-2))",
                },
                insurance: {
                  label: language === 'de' ? 'Versicherung' : 'Insurance',
                  color: "hsl(var(--chart-3))",
                },
              }}
            >
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyCosts}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar dataKey="fuel" stackId="a" fill="#3b82f6" name={language === 'de' ? 'Kraftstoff' : 'Fuel'} />
                  <Bar dataKey="maintenance" stackId="a" fill="#10b981" name={language === 'de' ? 'Wartung' : 'Maintenance'} />
                  <Bar dataKey="insurance" stackId="a" fill="#f59e0b" name={language === 'de' ? 'Versicherung' : 'Insurance'} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{language === 'de' ? 'Kostenverteilung' : 'Cost Distribution'}</CardTitle>
            <CardDescription>
              {language === 'de' ? 'Gesamtkosten nach Kategorie' : 'Total costs by category'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                costs: {
                  label: language === 'de' ? 'Kosten' : 'Costs',
                },
              }}
            >
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={costBreakdown}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ category, value }) => `${category}: ${value.toLocaleString()} ฿`}
                  >
                    {costBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Cost Analysis Table */}
      <Card>
        <CardHeader>
          <CardTitle>{language === 'de' ? 'Fahrzeug-Kostenanalyse' : 'Vehicle Cost Analysis'}</CardTitle>
          <CardDescription>
            {language === 'de' ? 'Detaillierte Kostenaufschlüsselung pro Fahrzeug' : 'Detailed cost breakdown per vehicle'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">{language === 'de' ? 'Fahrzeug' : 'Vehicle'}</th>
                  <th className="text-left p-3">{language === 'de' ? 'Gesamtkosten' : 'Total Cost'}</th>
                  <th className="text-left p-3">{language === 'de' ? 'Kraftstoffkosten' : 'Fuel Cost'}</th>
                  <th className="text-left p-3">{language === 'de' ? 'Wartungskosten' : 'Maintenance Cost'}</th>
                  <th className="text-left p-3">{language === 'de' ? 'Kosten/km' : 'Cost/km'}</th>
                  <th className="text-left p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {vehicleCosts.map((vehicle, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium">{vehicle.vehicle}</td>
                    <td className="p-3 font-semibold">{vehicle.totalCost.toLocaleString()} ฿</td>
                    <td className="p-3">{vehicle.fuelCost.toLocaleString()} ฿</td>
                    <td className="p-3">{vehicle.maintenanceCost.toLocaleString()} ฿</td>
                    <td className="p-3">{vehicle.costPerKm.toFixed(2)} ฿</td>
                    <td className="p-3">
                      <Badge 
                        variant={
                          vehicle.costPerKm < 0.8 ? 'default' :
                          vehicle.costPerKm < 1.0 ? 'secondary' :
                          vehicle.costPerKm < 1.2 ? 'outline' : 'destructive'
                        }
                      >
                        {vehicle.costPerKm < 0.8 ? (language === 'de' ? 'Effizient' : 'Efficient') :
                         vehicle.costPerKm < 1.0 ? (language === 'de' ? 'Normal' : 'Normal') :
                         vehicle.costPerKm < 1.2 ? (language === 'de' ? 'Hoch' : 'High') :
                         (language === 'de' ? 'Kritisch' : 'Critical')}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Cost Savings Opportunities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingDown className="h-5 w-5 text-green-600" />
            {language === 'de' ? 'Einsparmöglichkeiten' : 'Cost Saving Opportunities'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2">
                {language === 'de' ? 'Kraftstoffoptimierung' : 'Fuel Optimization'}
              </h4>
              <p className="text-sm text-green-700 mb-2">
                {language === 'de' 
                  ? 'Durch bessere Routenplanung können bis zu 8% Kraftstoff gespart werden.'
                  : 'Better route planning could save up to 8% on fuel costs.'}
              </p>
              <p className="text-sm font-medium text-green-800">
                {language === 'de' ? 'Potenzielle Einsparung: 1,728 ฿/Monat' : 'Potential savings: 1,728 ฿/month'}
              </p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">
                {language === 'de' ? 'Vorbeugende Wartung' : 'Preventive Maintenance'}
              </h4>
              <p className="text-sm text-blue-700 mb-2">
                {language === 'de' 
                  ? 'Regelmäßige Wartung kann teure Reparaturen um 25% reduzieren.'
                  : 'Regular maintenance can reduce expensive repairs by 25%.'}
              </p>
              <p className="text-sm font-medium text-blue-800">
                {language === 'de' ? 'Potenzielle Einsparung: 1,625 ฿/Monat' : 'Potential savings: 1,625 ฿/month'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
