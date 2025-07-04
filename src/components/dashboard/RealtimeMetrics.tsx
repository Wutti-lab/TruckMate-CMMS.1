
import { useState, useEffect, useCallback, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Truck, Users, AlertTriangle, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';

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
  const { t } = useLanguage();
  const [metrics, setMetrics] = useState<MetricData>({
    activeVehicles: 0,
    totalVehicles: 0,
    activeDrivers: 0,
    totalDrivers: 0,
    criticalAlerts: 0,
    completedInspections: 0,
    pendingInspections: 0,
    fuelEfficiency: 78.5
  });
  const [loading, setLoading] = useState(true);

  const fetchRealData = useCallback(async () => {
    try {
      const [vehiclesResult, driversResult, inspectionsResult] = await Promise.all([
        supabase.from('vehicles').select('status'),
        supabase.from('drivers').select('status'),
        supabase.from('inspections').select('status')
      ]);

      const vehicles = vehiclesResult.data || [];
      const drivers = driversResult.data || [];
      const inspections = inspectionsResult.data || [];

      setMetrics({
        activeVehicles: vehicles.filter(v => v.status === 'active').length,
        totalVehicles: vehicles.length,
        activeDrivers: drivers.filter(d => d.status === 'active').length,
        totalDrivers: drivers.length,
        criticalAlerts: Math.floor(Math.random() * 5), // This would come from a real alerts system
        completedInspections: inspections.filter(i => i.status === 'completed').length,
        pendingInspections: inspections.filter(i => i.status === 'pending').length,
        fuelEfficiency: 78.5 + (Math.random() - 0.5) * 10 // Simulated efficiency
      });
    } catch (error) {
      console.error('Error fetching real-time metrics:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRealData();
    
    // Set up real-time subscriptions
    const vehicleChannel = supabase
      .channel('vehicles-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'vehicles' }, fetchRealData)
      .subscribe();

    const driverChannel = supabase
      .channel('drivers-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'drivers' }, fetchRealData)
      .subscribe();

    const inspectionChannel = supabase
      .channel('inspections-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'inspections' }, fetchRealData)
      .subscribe();

    return () => {
      supabase.removeChannel(vehicleChannel);
      supabase.removeChannel(driverChannel);
      supabase.removeChannel(inspectionChannel);
    };
  }, [fetchRealData]);

  const vehicleUtilization = useMemo(() => 
    metrics.totalVehicles > 0 ? (metrics.activeVehicles / metrics.totalVehicles) * 100 : 0, 
    [metrics.activeVehicles, metrics.totalVehicles]
  );
  const driverUtilization = useMemo(() => 
    metrics.totalDrivers > 0 ? (metrics.activeDrivers / metrics.totalDrivers) * 100 : 0, 
    [metrics.activeDrivers, metrics.totalDrivers]
  );

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 bg-muted rounded w-24"></div>
              <div className="h-4 w-4 bg-muted rounded"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-muted rounded w-16 mb-2"></div>
              <div className="h-2 bg-muted rounded w-full mb-1"></div>
              <div className="h-3 bg-muted rounded w-20"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in">
      <Card className="hover-scale">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{t('vehicleStatus') || 'Vehicle Status'}</CardTitle>
          <Truck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.activeVehicles}/{metrics.totalVehicles}</div>
          <Progress value={vehicleUtilization} className="mt-2" />
          <p className="text-xs text-muted-foreground mt-1">
            {vehicleUtilization.toFixed(1)}% {t('utilization') || 'utilization'}
          </p>
        </CardContent>
      </Card>

      <Card className="hover-scale">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{t('driverStatus') || 'Driver Status'}</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.activeDrivers}/{metrics.totalDrivers}</div>
          <Progress value={driverUtilization} className="mt-2" />
          <p className="text-xs text-muted-foreground mt-1">
            {driverUtilization.toFixed(1)}% {t('active') || 'active'}
          </p>
        </CardContent>
      </Card>

      <Card className="hover-scale">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{t('criticalAlerts') || 'Critical Alerts'}</CardTitle>
          <AlertTriangle className="h-4 w-4 text-destructive" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-destructive">{metrics.criticalAlerts}</div>
          <Badge variant={metrics.criticalAlerts > 5 ? "destructive" : "secondary"} className="mt-2">
            {metrics.criticalAlerts > 5 ? (t('highPriority') || 'High Priority') : (t('normal') || 'Normal')}
          </Badge>
        </CardContent>
      </Card>

      <Card className="hover-scale">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{t('inspections') || 'Inspections'}</CardTitle>
          <CheckCircle className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{metrics.completedInspections}</div>
          <p className="text-xs text-muted-foreground">
            {metrics.pendingInspections} {t('pending') || 'pending'}
          </p>
          <Progress 
            value={(metrics.completedInspections / Math.max(1, metrics.completedInspections + metrics.pendingInspections)) * 100} 
            className="mt-2" 
          />
        </CardContent>
      </Card>
    </div>
  );
}
