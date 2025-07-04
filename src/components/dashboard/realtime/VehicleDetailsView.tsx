import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Fuel, Zap, Thermometer, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { formatDistanceToNow } from 'date-fns';

interface VehicleDetailsViewProps {
  vehicles: any[];
  trackingData: any[];
  getStatusBadgeVariant: (status: string) => any;
  getHealthScore: (vehicle: any) => number;
}

export function VehicleDetailsView({ 
  vehicles, 
  trackingData, 
  getStatusBadgeVariant, 
  getHealthScore 
}: VehicleDetailsViewProps) {
  const { t } = useLanguage();

  return (
    <div className="space-y-4">
      {vehicles.map((vehicle) => {
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
    </div>
  );
}