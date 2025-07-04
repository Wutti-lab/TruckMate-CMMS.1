import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface CriticalAlertsViewProps {
  criticalVehicles: any[];
}

export function CriticalAlertsView({ criticalVehicles }: CriticalAlertsViewProps) {
  const { t } = useLanguage();

  if (criticalVehicles.length === 0) {
    return (
      <div className="text-center py-8">
        <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
        <p className="text-muted-foreground">{t('noCriticalAlerts') || 'No critical alerts'}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {criticalVehicles.map((vehicle) => (
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
      ))}
    </div>
  );
}