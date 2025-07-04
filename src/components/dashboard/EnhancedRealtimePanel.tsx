import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useRealtimeTracking } from '@/components/map/hooks/useRealtimeTracking';
import { useRealtimeData } from './hooks/useRealtimeData';
import { AccessibleCard } from '@/components/shared/accessibility/AccessibleCard';
import { MobileOptimized } from '@/components/shared/mobile/MobileOptimized';
import { useIsMobile } from '@/hooks/use-mobile';
import { FleetSummaryCards } from './realtime/FleetSummaryCards';
import { RecentUpdatesSection } from './realtime/RecentUpdatesSection';
import { VehicleDetailsView } from './realtime/VehicleDetailsView';
import { CriticalAlertsView } from './realtime/CriticalAlertsView';
import { RealtimeControls } from './realtime/RealtimeControls';

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
  const { t } = useLanguage();
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
        <RealtimeControls
          isTracking={isTracking}
          autoRefresh={autoRefresh}
          setAutoRefresh={setAutoRefresh}
          criticalVehiclesCount={criticalVehicles.length}
        />

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
              <FleetSummaryCards
                vehiclesCount={data.vehicles.length}
                driversCount={data.drivers.length}
                activeVehiclesCount={data.vehicles.filter(v => v.status === 'active').length}
              />

              <RecentUpdatesSection
                trackingData={trackingData}
                vehicles={data.vehicles}
                getStatusColor={getStatusColor}
                getStatusBadgeVariant={getStatusBadgeVariant}
              />
            </TabsContent>

            <TabsContent value="vehicles" className="space-y-4">
              <VehicleDetailsView
                vehicles={data.vehicles}
                trackingData={trackingData}
                getStatusBadgeVariant={getStatusBadgeVariant}
                getHealthScore={getHealthScore}
              />
            </TabsContent>

            {!isMobile && (
              <TabsContent value="alerts" className="space-y-4">
                <CriticalAlertsView criticalVehicles={criticalVehicles} />
              </TabsContent>
            )}
          </Tabs>
        )}
      </AccessibleCard>
    </MobileOptimized>
  );
}