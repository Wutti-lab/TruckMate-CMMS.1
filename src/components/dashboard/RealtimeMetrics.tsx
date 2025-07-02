
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Truck, Users, AlertTriangle, CheckCircle } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface MetricData {
  activeVehicles: number;
  totalVehicles: number;
  activeDrivers: number;
  totalDrivers: number;
  criticalAlerts: number;
  completedInspections: number;
  pendingInspections: number;
  fuelEfficiency: number;
}

export function RealtimeMetrics() {
  const { t } = useTranslation();
  const [metrics, setMetrics] = useState<MetricData>({
    activeVehicles: 28,
    totalVehicles: 45,
    activeDrivers: 32,
    totalDrivers: 40,
    criticalAlerts: 3,
    completedInspections: 127,
    pendingInspections: 8,
    fuelEfficiency: 78.5
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        activeVehicles: Math.floor(Math.random() * 5) + prev.activeVehicles - 2,
        criticalAlerts: Math.max(0, prev.criticalAlerts + (Math.random() > 0.8 ? 1 : -1)),
        fuelEfficiency: Math.max(60, Math.min(95, prev.fuelEfficiency + (Math.random() - 0.5) * 2))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const vehicleUtilization = (metrics.activeVehicles / metrics.totalVehicles) * 100;
  const driverUtilization = (metrics.activeDrivers / metrics.totalDrivers) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Vehicle Status</CardTitle>
          <Truck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.activeVehicles}/{metrics.totalVehicles}</div>
          <Progress value={vehicleUtilization} className="mt-2" />
          <p className="text-xs text-muted-foreground mt-1">
            {vehicleUtilization.toFixed(1)}% utilization
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Driver Status</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.activeDrivers}/{metrics.totalDrivers}</div>
          <Progress value={driverUtilization} className="mt-2" />
          <p className="text-xs text-muted-foreground mt-1">
            {driverUtilization.toFixed(1)}% active
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Critical Alerts</CardTitle>
          <AlertTriangle className="h-4 w-4 text-destructive" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-destructive">{metrics.criticalAlerts}</div>
          <Badge variant={metrics.criticalAlerts > 5 ? "destructive" : "secondary"} className="mt-2">
            {metrics.criticalAlerts > 5 ? "High Priority" : "Normal"}
          </Badge>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Inspections</CardTitle>
          <CheckCircle className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{metrics.completedInspections}</div>
          <p className="text-xs text-muted-foreground">
            {metrics.pendingInspections} pending
          </p>
          <Progress 
            value={(metrics.completedInspections / (metrics.completedInspections + metrics.pendingInspections)) * 100} 
            className="mt-2" 
          />
        </CardContent>
      </Card>
    </div>
  );
}
