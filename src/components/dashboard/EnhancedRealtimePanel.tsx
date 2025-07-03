import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MapPin, 
  Zap, 
  Fuel, 
  Thermometer, 
  Clock, 
  AlertTriangle,
  CheckCircle,
  Activity,
  Users,
  Truck
} from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { useRealtimeTracking } from '@/components/map/hooks/useRealtimeTracking';
import { useRealtimeData } from './hooks/useRealtimeData';
import { AccessibleCard } from '@/components/shared/accessibility/AccessibleCard';
import { MobileOptimized } from '@/components/shared/mobile/MobileOptimized';
import { useIsMobile } from '@/hooks/use-mobile';
import { formatDistanceToNow } from 'date-fns';

interface VehicleStatus {
  id: string;
  license_plate: string;
  status: 'active' | 'idle' | 'maintenance' | 'offline';
  location: { lat: number; lng: number };
  speed: number;
  fuel_level: number;
  battery_level: number;
  engine_temp: number;
  driver?: string;
  lastUpdate: Date;
}

export function EnhancedRealtimePanel() {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  
  const { data, loading, error } = useRealtimeData();
  const { 
    trackingData, 
    isTracking, 
    startRealtimeTracking, 
    stopRealtimeTracking 
  } = useRealtimeTracking();

  useEffect(() => {
    if (autoRefresh) {
      startRealtimeTracking();
    } else {
      stopRealtimeTracking();
    }
    
    return () => {
      stopRealtimeTracking();
    };
  }, [autoRefresh, startRealtimeTracking, stopRealtimeTracking]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'idle': return 'bg-yellow-500';
      case 'maintenance': return 'bg-orange-500';
      case 'offline': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'idle': return 'secondary';
      case 'maintenance': return 'destructive';
      case 'offline': return 'outline';
      default: return 'outline';
    }
  };

  const getHealthScore = (vehicle: any) => {
    const fuelScore = vehicle.fuel_level || 0;
    const batteryScore = vehicle.battery_level || 0;
    const tempScore = vehicle.engine_temp ? Math.max(0, 100 - (vehicle.engine_temp - 70)) : 100;
    
    return Math.round((fuelScore + batteryScore + tempScore) / 3);
  };

  const criticalVehicles = data.vehicles.filter(v => 
    (v.fuel_level && v.fuel_level < 20) || 
    (v.battery_level && v.battery_level < 15) || 
    (v.engine_temp && v.engine_temp > 95)
  );

  return (
    <MobileOptimized enableSwipe={isMobile}>
      <AccessibleCard 
        title={t('realtimeFleetStatus') || 'Real-time Fleet Status'}
        ariaLabel="Real-time fleet monitoring dashboard"
        className="animate-fade-in"
      >
        {/* Header Controls */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Activity className={`h-5 w-5 ${isTracking ? 'text-green-600 animate-pulse' : 'text-muted-foreground'}`} />
            <span className="text-sm font-medium">
              {isTracking ? (t('liveTracking') || 'Live Tracking') : (t('trackingPaused') || 'Tracking Paused')}
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label htmlFor="auto-refresh" className="text-sm">
                {t('autoRefresh') || 'Auto Refresh'}
              </label>
              <Switch
                id="auto-refresh"
                checked={autoRefresh}
                onCheckedChange={setAutoRefresh}
              />
            </div>
            
            {criticalVehicles.length > 0 && (
              <Badge variant="destructive" className="animate-pulse">
                {criticalVehicles.length} {t('critical') || 'Critical'}
              </Badge>
            )}
          </div>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-muted rounded w-full mb-2"></div>
                <div className="h-20 bg-muted rounded"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <p className="text-destructive">{t('errorLoadingData') || 'Error loading real-time data'}</p>
          </div>
        ) : (
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className={`grid w-full ${isMobile ? 'grid-cols-2' : 'grid-cols-3'}`}>
              <TabsTrigger value="overview">{t('overview') || 'Overview'}</TabsTrigger>
              <TabsTrigger value="vehicles">{t('vehicles') || 'Vehicles'}</TabsTrigger>
              {!isMobile && <TabsTrigger value="alerts">{t('alerts') || 'Alerts'}</TabsTrigger>}
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Fleet Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="hover-scale">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Truck className="h-8 w-8 text-primary" />
                      <div>
                        <p className="text-2xl font-bold">{data.vehicles.length}</p>
                        <p className="text-sm text-muted-foreground">{t('totalVehicles') || 'Total Vehicles'}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover-scale">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Users className="h-8 w-8 text-accent" />
                      <div>
                        <p className="text-2xl font-bold">{data.drivers.length}</p>
                        <p className="text-sm text-muted-foreground">{t('activeDrivers') || 'Active Drivers'}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover-scale">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                      <div>
                        <p className="text-2xl font-bold">{data.vehicles.filter(v => v.status === 'active').length}</p>
                        <p className="text-sm text-muted-foreground">{t('activeVehicles') || 'Active'}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Real-time Updates */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    {t('recentUpdates') || 'Recent Updates'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {trackingData.slice(0, 5).map((update, index) => (
                      <div key={`${update.vehicleId}-${index}`} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${getStatusColor(update.status)}`}></div>
                          <div>
                            <p className="font-medium">{data.vehicles.find(v => v.id === update.vehicleId)?.license_plate || update.vehicleId}</p>
                            <p className="text-sm text-muted-foreground">
                              {update.speed} km/h • {update.heading}°
                            </p>
                          </div>
                        </div>
                        <Badge variant={getStatusBadgeVariant(update.status)}>
                          {update.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="vehicles" className="space-y-4">
              {data.vehicles.map((vehicle) => {
                const trackingInfo = trackingData.find(t => t.vehicleId === vehicle.id);
                const healthScore = getHealthScore(vehicle);
                
                return (
                  <Card key={vehicle.id} className="hover-scale">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">{vehicle.license_plate}</h3>
                          <p className="text-sm text-muted-foreground">{vehicle.model}</p>
                        </div>
                        <Badge variant={getStatusBadgeVariant(vehicle.status)}>
                          {vehicle.status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <Fuel className="h-4 w-4 text-blue-600" />
                          <span className="text-sm">{vehicle.fuel_level || 0}%</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4 text-green-600" />
                          <span className="text-sm">{vehicle.battery_level || 0}%</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Thermometer className="h-4 w-4 text-red-600" />
                          <span className="text-sm">{vehicle.engine_temp || 0}°C</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-purple-600" />
                          <span className="text-sm">{trackingInfo?.speed || 0} km/h</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{t('healthScore') || 'Health Score'}</span>
                          <span className={healthScore > 70 ? 'text-green-600' : healthScore > 40 ? 'text-yellow-600' : 'text-red-600'}>
                            {healthScore}%
                          </span>
                        </div>
                        <Progress value={healthScore} className="h-2" />
                      </div>

                      {trackingInfo && (
                        <div className="mt-3 pt-3 border-t text-xs text-muted-foreground">
                          {t('lastUpdate') || 'Last Update'}: {formatDistanceToNow(new Date(trackingInfo.timestamp), { addSuffix: true })}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </TabsContent>

            {!isMobile && (
              <TabsContent value="alerts" className="space-y-4">
                {criticalVehicles.length === 0 ? (
                  <div className="text-center py-8">
                    <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                    <p className="text-muted-foreground">{t('noCriticalAlerts') || 'No critical alerts'}</p>
                  </div>
                ) : (
                  criticalVehicles.map((vehicle) => (
                    <Card key={vehicle.id} className="border-destructive">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <AlertTriangle className="h-6 w-6 text-destructive" />
                          <div className="flex-1">
                            <h4 className="font-semibold">{vehicle.license_plate}</h4>
                            <div className="space-y-1 text-sm text-muted-foreground">
                              {vehicle.fuel_level && vehicle.fuel_level < 20 && (
                                <p>• {t('lowFuel') || 'Low fuel'}: {vehicle.fuel_level}%</p>
                              )}
                              {vehicle.battery_level && vehicle.battery_level < 15 && (
                                <p>• {t('lowBattery') || 'Low battery'}: {vehicle.battery_level}%</p>
                              )}
                              {vehicle.engine_temp && vehicle.engine_temp > 95 && (
                                <p>• {t('highTemperature') || 'High temperature'}: {vehicle.engine_temp}°C</p>
                              )}
                            </div>
                          </div>
                          <Button size="sm" variant="outline">
                            {t('viewDetails') || 'View Details'}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>
            )}
          </Tabs>
        )}
      </AccessibleCard>
    </MobileOptimized>
  );
}