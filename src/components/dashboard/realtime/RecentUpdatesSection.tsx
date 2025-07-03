import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Activity } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

interface RecentUpdatesSectionProps {
  trackingData: any[];
  vehicles: any[];
  getStatusColor: (status: string) => string;
  getStatusBadgeVariant: (status: string) => any;
}

export function RecentUpdatesSection({ 
  trackingData, 
  vehicles, 
  getStatusColor, 
  getStatusBadgeVariant 
}: RecentUpdatesSectionProps) {
  const { t } = useTranslation();

  return (
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
                  <p className="font-medium">{vehicles.find(v => v.id === update.vehicleId)?.license_plate || update.vehicleId}</p>
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
  );
}