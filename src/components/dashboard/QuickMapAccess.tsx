import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Navigation, Eye, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';
import { useRealtimeData } from './hooks/useRealtimeData';
import { AccessibleCard } from '@/components/shared/accessibility/AccessibleCard';

export function QuickMapAccess() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data } = useRealtimeData();
  const [hoveredVehicle, setHoveredVehicle] = useState<string | null>(null);

  const activeVehicles = data.vehicles.filter(v => v.status === 'active');
  const criticalVehicles = data.vehicles.filter(v => 
    (v.fuel_level && v.fuel_level < 20) || 
    (v.battery_level && v.battery_level < 15) || 
    (v.engine_temp && v.engine_temp > 95)
  );

  const handleViewOnMap = (vehicleId?: string) => {
    const mapUrl = vehicleId ? `/map?vehicle=${vehicleId}` : '/map';
    navigate(mapUrl);
  };

  return (
    <AccessibleCard 
      title={t('quickMapAccess') || 'Quick Map Access'}
      ariaLabel="Quick access to fleet map"
      className="hover-scale"
    >
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <MapPin className="h-5 w-5 text-primary" />
          {t('fleetMap') || 'Fleet Map'}
          <Badge variant="outline" className="ml-auto">
            {activeVehicles.length} {t('active') || 'Active'}
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{activeVehicles.length}</div>
            <div className="text-xs text-muted-foreground">{t('tracking') || 'Tracking'}</div>
          </div>
          <div className="text-center p-3 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">{criticalVehicles.length}</div>
            <div className="text-xs text-muted-foreground">{t('alerts') || 'Alerts'}</div>
          </div>
        </div>

        {/* Quick Vehicle List */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium flex items-center gap-2">
            <Zap className="h-4 w-4" />
            {t('activeVehicles') || 'Active Vehicles'}
          </h4>
          
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {activeVehicles.slice(0, 4).map((vehicle) => (
              <div
                key={vehicle.id}
                className={`flex items-center justify-between p-2 rounded-lg transition-colors cursor-pointer ${
                  hoveredVehicle === vehicle.id ? 'bg-primary/10' : 'hover:bg-muted/50'
                }`}
                onMouseEnter={() => setHoveredVehicle(vehicle.id)}
                onMouseLeave={() => setHoveredVehicle(null)}
                onClick={() => handleViewOnMap(vehicle.id)}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">{vehicle.license_plate}</span>
                </div>
                <Button size="sm" variant="ghost" className="h-6 px-2">
                  <Eye className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>

          {activeVehicles.length > 4 && (
            <div className="text-xs text-muted-foreground text-center pt-1">
              +{activeVehicles.length - 4} {t('more') || 'more'} {t('vehicles') || 'vehicles'}
            </div>
          )}
        </div>

        {/* Critical Alerts */}
        {criticalVehicles.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-destructive flex items-center gap-2">
              <Navigation className="h-4 w-4" />
              {t('criticalAlerts') || 'Critical Alerts'}
            </h4>
            
            <div className="space-y-1">
              {criticalVehicles.slice(0, 2).map((vehicle) => (
                <div
                  key={vehicle.id}
                  className="flex items-center justify-between p-2 rounded-lg bg-destructive/10 cursor-pointer hover:bg-destructive/20 transition-colors"
                  onClick={() => handleViewOnMap(vehicle.id)}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">{vehicle.license_plate}</span>
                  </div>
                  <Button size="sm" variant="ghost" className="h-6 px-2">
                    <Eye className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Map Button */}
        <Button 
          onClick={() => handleViewOnMap()}
          className="w-full"
          size="lg"
        >
          <MapPin className="h-4 w-4 mr-2" />
          {t('openFullMap') || 'Open Full Map'}
        </Button>

        <div className="text-xs text-muted-foreground text-center">
          {t('clickToViewOnMap') || 'Click vehicles to view location on map'}
        </div>
      </CardContent>
    </AccessibleCard>
  );
}