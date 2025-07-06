import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/ui/date-picker";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  Filter,
  Eye,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  Fuel,
  Users,
  Truck
} from "lucide-react";
import { useLanguage, extractLanguageText } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { format, subDays, startOfMonth, endOfMonth } from "date-fns";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
  AreaChart,
  Area
} from "recharts";

interface KPIData {
  totalVehicles: number;
  activeDrivers: number;
  totalInspections: number;
  passedInspections: number;
  fuelConsumption: number;
  maintenanceCosts: number;
  utilizationRate: number;
  avgResponseTime: number;
}

interface ChartData {
  name: string;
  value: number;
  trend?: number;
  color?: string;
}

interface DateRange {
  from: Date;
  to: Date;
}

export function AnalyticsOverview() {
  const [kpiData, setKpiData] = useState<KPIData>({
    totalVehicles: 0,
    activeDrivers: 0,
    totalInspections: 0,
    passedInspections: 0,
    fuelConsumption: 0,
    maintenanceCosts: 0,
    utilizationRate: 0,
    avgResponseTime: 0
  });
  
  const [chartData, setChartData] = useState<{
    monthly: ChartData[];
    vehicles: ChartData[];
    status: ChartData[];
    trends: ChartData[];
  }>({
    monthly: [],
    vehicles: [],
    status: [],
    trends: []
  });

  const [dateRange, setDateRange] = useState<DateRange>({
    from: subDays(new Date(), 30),
    to: new Date()
  });
  
  const [selectedPeriod, setSelectedPeriod] = useState("30d");
  const [isLoading, setIsLoading] = useState(true);
  const { language } = useLanguage();
  const { toast } = useToast();

  useEffect(() => {
    fetchAnalyticsData();
  }, [dateRange]);

  const fetchAnalyticsData = async () => {
    setIsLoading(true);
    try {
      // Fetch KPI data from multiple tables
      const [
        vehiclesData,
        driversData,
        inspectionsData,
        workOrdersData
      ] = await Promise.all([
        supabase.from('vehicles').select('*'),
        supabase.from('drivers').select('*'),
        supabase.from('inspections').select('*').gte('inspection_date', format(dateRange.from, 'yyyy-MM-dd')).lte('inspection_date', format(dateRange.to, 'yyyy-MM-dd')),
        supabase.from('work_orders').select('*').gte('created_at', dateRange.from.toISOString()).lte('created_at', dateRange.to.toISOString())
      ]);

      if (vehiclesData.error || driversData.error || inspectionsData.error || workOrdersData.error) {
        throw new Error('Failed to fetch data');
      }

      const vehicles = vehiclesData.data || [];
      const drivers = driversData.data || [];
      const inspections = inspectionsData.data || [];
      const workOrders = workOrdersData.data || [];

      // Calculate KPIs
      const totalVehicles = vehicles.length;
      const activeDrivers = drivers.filter(d => d.status === 'active').length;
      const totalInspections = inspections.length;
      const passedInspections = inspections.filter(i => i.passed === true).length;
      const maintenanceCosts = workOrders.reduce((sum, order) => sum + (order.cost || 0), 0);
      const utilizationRate = vehicles.filter(v => v.status === 'active').length / totalVehicles * 100;

      setKpiData({
        totalVehicles,
        activeDrivers,
        totalInspections,
        passedInspections,
        fuelConsumption: Math.random() * 10000, // Mock data
        maintenanceCosts,
        utilizationRate,
        avgResponseTime: Math.random() * 24 // Mock data
      });

      // Generate chart data
      const monthlyData = generateMonthlyData(inspections, workOrders);
      const vehicleStatusData = generateVehicleStatusData(vehicles);
      const inspectionStatusData = generateInspectionStatusData(inspections);
      const trendData = generateTrendData();

      setChartData({
        monthly: monthlyData,
        vehicles: vehicleStatusData,
        status: inspectionStatusData,
        trends: trendData
      });

    } catch (error) {
      console.error('Error fetching analytics data:', error);
      toast({
        title: extractLanguageText("Error | Fehler", language),
        description: extractLanguageText("Failed to load analytics data | Analytics-Daten konnten nicht geladen werden", language),
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generateMonthlyData = (inspections: any[], workOrders: any[]) => {
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const date = subDays(new Date(), i * 30);
      const monthName = format(date, 'MMM');
      const monthInspections = inspections.filter(i => 
        new Date(i.inspection_date).getMonth() === date.getMonth()
      ).length;
      
      months.push({
        name: monthName,
        value: monthInspections,
        trend: Math.random() * 20 - 10
      });
    }
    return months;
  };

  const generateVehicleStatusData = (vehicles: any[]) => {
    const statusCounts = vehicles.reduce((acc, vehicle) => {
      const status = vehicle.status || 'unknown';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const colors = {
      active: '#22c55e',
      maintenance: '#eab308',
      inactive: '#ef4444',
      unknown: '#6b7280'
    };

    return Object.entries(statusCounts).map(([status, count]) => ({
      name: extractLanguageText(`${status} | ${status}`, language),
      value: count as number,
      color: colors[status as keyof typeof colors] || '#6b7280'
    }));
  };

  const generateInspectionStatusData = (inspections: any[]) => {
    const passed = inspections.filter(i => i.passed === true).length;
    const failed = inspections.filter(i => i.passed === false).length;
    const pending = inspections.filter(i => i.passed === null).length;

    return [
      {
        name: extractLanguageText("Passed | Bestanden", language),
        value: passed,
        color: '#22c55e'
      },
      {
        name: extractLanguageText("Failed | Nicht bestanden", language),
        value: failed,
        color: '#ef4444'
      },
      {
        name: extractLanguageText("Pending | Ausstehend", language),
        value: pending,
        color: '#eab308'
      }
    ];
  };

  const generateTrendData = () => {
    return Array.from({ length: 12 }, (_, i) => ({
      name: format(subDays(new Date(), (11 - i) * 7), 'MMM dd'),
      value: Math.random() * 100 + 50,
      trend: Math.random() * 20 - 10
    }));
  };

  const handlePeriodChange = (period: string) => {
    setSelectedPeriod(period);
    let from: Date;
    const to = new Date();
    
    switch (period) {
      case '7d':
        from = subDays(to, 7);
        break;
      case '30d':
        from = subDays(to, 30);
        break;
      case '90d':
        from = subDays(to, 90);
        break;
      case 'this_month':
        from = startOfMonth(to);
        break;
      case 'last_month':
        from = startOfMonth(subDays(to, 30));
        break;
      default:
        from = subDays(to, 30);
    }
    
    setDateRange({ from, to });
  };

  const exportData = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Metric,Value,Period\n"
      + `Total Vehicles,${kpiData.totalVehicles},${selectedPeriod}\n`
      + `Active Drivers,${kpiData.activeDrivers},${selectedPeriod}\n`
      + `Total Inspections,${kpiData.totalInspections},${selectedPeriod}\n`
      + `Passed Inspections,${kpiData.passedInspections},${selectedPeriod}\n`
      + `Maintenance Costs,${kpiData.maintenanceCosts},${selectedPeriod}\n`
      + `Utilization Rate,${kpiData.utilizationRate}%,${selectedPeriod}\n`;
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `analytics_${format(new Date(), 'yyyy-MM-dd')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: extractLanguageText("Export Complete | Export abgeschlossen", language),
      description: extractLanguageText("Analytics data exported successfully | Analytics-Daten erfolgreich exportiert", language)
    });
  };

  const KPICard = ({ 
    title, 
    value, 
    icon: Icon, 
    trend, 
    format: valueFormat = 'number' 
  }: { 
    title: string; 
    value: number; 
    icon: any; 
    trend?: number; 
    format?: 'number' | 'currency' | 'percentage' 
  }) => {
    const formatValue = (val: number) => {
      switch (valueFormat) {
        case 'currency':
          return `€${val.toLocaleString()}`;
        case 'percentage':
          return `${val.toFixed(1)}%`;
        default:
          return val.toLocaleString();
      }
    };

    return (
      <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              <p className="text-2xl font-bold">{formatValue(value)}</p>
              {trend !== undefined && (
                <div className="flex items-center gap-1">
                  {trend > 0 ? (
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-600" />
                  )}
                  <span className={`text-sm font-medium ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {Math.abs(trend).toFixed(1)}%
                  </span>
                </div>
              )}
            </div>
            <div className="p-3 bg-primary/10 rounded-full">
              <Icon className="h-6 w-6 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Loading skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-muted rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-muted rounded w-1/4"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">
            {extractLanguageText("Analytics Overview | Analytics-Übersicht", language)}
          </h2>
          <p className="text-muted-foreground">
            {extractLanguageText("Comprehensive fleet analytics and performance metrics | Umfassende Flottenanalysen und Leistungskennzahlen", language)}
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedPeriod} onValueChange={handlePeriodChange}>
            <SelectTrigger className="w-48">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">{extractLanguageText("Last 7 days | Letzte 7 Tage", language)}</SelectItem>
              <SelectItem value="30d">{extractLanguageText("Last 30 days | Letzte 30 Tage", language)}</SelectItem>
              <SelectItem value="90d">{extractLanguageText("Last 90 days | Letzte 90 Tage", language)}</SelectItem>
              <SelectItem value="this_month">{extractLanguageText("This month | Dieser Monat", language)}</SelectItem>
              <SelectItem value="last_month">{extractLanguageText("Last month | Letzter Monat", language)}</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={exportData} variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            {extractLanguageText("Export | Exportieren", language)}
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title={extractLanguageText("Total Vehicles | Fahrzeuge Gesamt", language)}
          value={kpiData.totalVehicles}
          icon={Truck}
          trend={5.2}
        />
        <KPICard
          title={extractLanguageText("Active Drivers | Aktive Fahrer", language)}
          value={kpiData.activeDrivers}
          icon={Users}
          trend={2.1}
        />
        <KPICard
          title={extractLanguageText("Inspection Rate | Inspektionsrate", language)}
          value={kpiData.totalInspections > 0 ? (kpiData.passedInspections / kpiData.totalInspections) * 100 : 0}
          icon={CheckCircle}
          trend={-1.3}
          format="percentage"
        />
        <KPICard
          title={extractLanguageText("Maintenance Costs | Wartungskosten", language)}
          value={kpiData.maintenanceCosts}
          icon={DollarSign}
          trend={-8.7}
          format="currency"
        />
        <KPICard
          title={extractLanguageText("Fuel Consumption | Kraftstoffverbrauch", language)}
          value={kpiData.fuelConsumption}
          icon={Fuel}
          trend={-3.2}
        />
        <KPICard
          title={extractLanguageText("Utilization Rate | Auslastungsrate", language)}
          value={kpiData.utilizationRate}
          icon={BarChart3}
          trend={4.8}
          format="percentage"
        />
        <KPICard
          title={extractLanguageText("Total Inspections | Inspektionen Gesamt", language)}
          value={kpiData.totalInspections}
          icon={Eye}
          trend={12.5}
        />
        <KPICard
          title={extractLanguageText("Avg Response Time | Durchschn. Reaktionszeit", language)}
          value={kpiData.avgResponseTime}
          icon={AlertTriangle}
          trend={-15.2}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trend Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              {extractLanguageText("Monthly Inspection Trend | Monatlicher Inspektionsverlauf", language)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData.monthly}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="hsl(var(--primary))" 
                  fill="hsl(var(--primary))" 
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Vehicle Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              {extractLanguageText("Vehicle Status Distribution | Fahrzeugstatus-Verteilung", language)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData.vehicles}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {chartData.vehicles.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Inspection Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              {extractLanguageText("Inspection Results | Inspektionsergebnisse", language)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData.status}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {chartData.status.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Performance Trend */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              {extractLanguageText("Performance Trend | Leistungstrend", language)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData.trends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">
              {extractLanguageText("Fleet Health Score | Flottengesundheitswert", language)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600 mb-2">
              {((kpiData.passedInspections / Math.max(kpiData.totalInspections, 1)) * 100).toFixed(1)}%
            </div>
            <p className="text-sm text-muted-foreground">
              {extractLanguageText("Based on inspection pass rate | Basierend auf Inspektions-Erfolgsrate", language)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">
              {extractLanguageText("Cost Efficiency | Kosteneffizienz", language)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600 mb-2">
              €{(kpiData.maintenanceCosts / Math.max(kpiData.totalVehicles, 1)).toFixed(0)}
            </div>
            <p className="text-sm text-muted-foreground">
              {extractLanguageText("Average cost per vehicle | Durchschnittskosten pro Fahrzeug", language)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">
              {extractLanguageText("Operational Status | Betriebsstatus", language)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <span className="text-2xl font-bold">
                {extractLanguageText("Optimal | Optimal", language)}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {extractLanguageText("All systems operational | Alle Systeme betriebsbereit", language)}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}