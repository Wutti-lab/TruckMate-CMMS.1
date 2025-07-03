import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  MapPin, 
  Zap, 
  Fuel, 
  Thermometer, 
  Activity,
  Eye,
  Navigation,
  Clock
} from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { formatDistanceToNow } from 'date-fns';
import { AccessibleCard } from '@/components/shared/accessibility/AccessibleCard';

interface RealtimeVehiclePanelProps {
  trackingData: any[];
  vehicles: any[];
  onSelectVehicle: (vehicleId: string) => void;
  selectedVehicle: string | null;
  className?: string;
}

export function RealtimeVehiclePanel({ 
  trackingData, 
  vehicles, 
  onSelectVehicle, 
  selectedVehicle,
  className 
}: RealtimeVehiclePanelProps) {
  const { t } = useTranslation();
  const [showAll, setShowAll] = useState(false);

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

  const displayedVehicles = showAll ? vehicles : vehicles.slice(0, 3);

  return (
    <AccessibleCard 
      title={t('liveTracking') || 'Live Vehicle Tracking'}
      ariaLabel="Real-time vehicle tracking panel"
      className={`w-80 ${className} animate-fade-in`}
    >
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm">
          <Activity className="h-4 w-4 text-green-600 animate-pulse" />
          {t('liveTracking') || 'Live Tracking'}
          <Badge variant="outline" className="ml-auto">
            {trackingData.length} {t('active') || 'Active'}
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <ScrollArea className="max-h-96">
          {displayedVehicles.map((vehicle) => {
            const trackingInfo = trackingData.find(t => t.vehicleId === vehicle.id);
            const healthScore = getHealthScore(vehicle);
            const isSelected = selectedVehicle === vehicle.id;
            
            return (
              <Card 
                key={vehicle.id} 
                className={`mb-3 cursor-pointer transition-all hover-scale ${
                  isSelected ? 'ring-2 ring-primary bg-primary/5' : 'hover:bg-muted/50'
                }`}
                onClick={() => onSelectVehicle(vehicle.id)}
              >
                <CardContent className="p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium text-sm">{vehicle.license_plate}</h4>
                      <p className="text-xs text-muted-foreground">{vehicle.model}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(vehicle.status)}`}></div>
                      <Badge variant={getStatusBadgeVariant(vehicle.status)} className="text-xs">
                        {vehicle.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-2 text-xs">
                    <div className="flex items-center gap-1">
                      <Fuel className="h-3 w-3 text-blue-600" />
                      <span>{vehicle.fuel_level || 0}%</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Zap className="h-3 w-3 text-green-600" />
                      <span>{vehicle.battery_level || 0}%</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Thermometer className="h-3 w-3 text-red-600" />
                      <span>{vehicle.engine_temp || 0}°C</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Navigation className="h-3 w-3 text-purple-600" />
                      <span>{trackingInfo?.speed || 0} km/h</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>{t('healthScore') || 'Health'}</span>
                      <span className={healthScore > 70 ? 'text-green-600' : healthScore > 40 ? 'text-yellow-600' : 'text-red-600'}>
                        {healthScore}%
                      </span>
                    </div>
                    <Progress value={healthScore} className="h-1" />
                  </div>

                  {trackingInfo && (
                    <div className="mt-2 pt-2 border-t flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>
                          {formatDistanceToNow(new Date(trackingInfo.timestamp), { addSuffix: true })}
                        </span>
                      </div>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-6 px-2 text-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectVehicle(vehicle.id);
                        }}
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        {t('track') || 'Track'}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </ScrollArea>

        {vehicles.length > 3 && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowAll(!showAll)}
            className="w-full text-xs"
          >
            {showAll 
              ? `${t('showLess') || 'Show Less'} (${vehicles.length - 3} ${t('hidden') || 'hidden'})`
              : `${t('showAll') || 'Show All'} (${vehicles.length - 3} ${t('more') || 'more'})`
            }
          </Button>
        )}

        <div className="pt-2 border-t text-xs text-muted-foreground text-center">
          <div className="flex items-center justify-center gap-1">
            <MapPin className="h-3 w-3" />
            <span>{t('clickToTrack') || 'Click vehicle to track on map'}</span>
          </div>
        </div>
      </CardContent>
    </AccessibleCard>
  );
}