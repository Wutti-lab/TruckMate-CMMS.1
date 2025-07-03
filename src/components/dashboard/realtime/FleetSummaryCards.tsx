import { Card, CardContent } from '@/components/ui/card';
import { Truck, Users, CheckCircle } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface FleetSummaryCardsProps {
  vehiclesCount: number;
  driversCount: number;
  activeVehiclesCount: number;
}

export function FleetSummaryCards({ 
  vehiclesCount, 
  driversCount, 
  activeVehiclesCount 
}: FleetSummaryCardsProps) {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="hover-scale">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Truck className="h-8 w-8 text-primary" />
            <div>
              <p className="text-2xl font-bold">{vehiclesCount}</p>
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
              <p className="text-2xl font-bold">{driversCount}</p>
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
              <p className="text-2xl font-bold">{activeVehiclesCount}</p>
              <p className="text-sm text-muted-foreground">{t('activeVehicles') || 'Active'}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}