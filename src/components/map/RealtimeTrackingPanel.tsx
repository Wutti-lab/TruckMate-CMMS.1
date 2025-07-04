
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Play, Pause, MapPin, Gauge, Navigation } from 'lucide-react';
import { useRealtimeTracking } from './hooks/useRealtimeTracking';
import { useLanguage } from '@/contexts/LanguageContext';

export function RealtimeTrackingPanel() {
  const { t } = useLanguage();
  const { 
    trackingData, 
    isTracking, 
    startRealtimeTracking, 
    stopRealtimeTracking,
    getVehicleStatus 
  } = useRealtimeTracking();

  const handleToggleTracking = () => {
    if (isTracking) {
      stopRealtimeTracking();
    } else {
      startRealtimeTracking();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'idle': return 'bg-yellow-500';
      case 'offline': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className="w-80">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Real-time Tracking
          </span>
          <div className="flex items-center gap-2">
            <Switch
              checked={isTracking}
              onCheckedChange={handleToggleTracking}
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={handleToggleTracking}
            >
              {isTracking ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span>Status:</span>
            <Badge variant={isTracking ? "default" : "secondary"}>
              {isTracking ? "Active" : "Paused"}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <span>Vehicles Tracked:</span>
            <span className="font-medium">{trackingData.length}</span>
          </div>
          
          <ScrollArea className="h-[300px]">
            <div className="space-y-3">
              {trackingData.map((vehicle) => (
                <div key={vehicle.vehicleId} className="p-3 rounded-lg border bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">{vehicle.vehicleId}</span>
                    <div className="flex items-center gap-1">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(vehicle.status)}`} />
                      <span className="text-xs capitalize">{vehicle.status}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <Gauge className="h-3 w-3" />
                      <span>{vehicle.speed} km/h</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Navigation className="h-3 w-3" />
                      <span>{vehicle.heading}°</span>
                    </div>
                  </div>
                  
                  <div className="mt-2 text-xs text-gray-500">
                    Last update: {new Date(vehicle.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
}
