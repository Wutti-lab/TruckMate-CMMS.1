import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Activity } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface RealtimeControlsProps {
  isTracking: boolean;
  autoRefresh: boolean;
  setAutoRefresh: (value: boolean) => void;
  criticalVehiclesCount: number;
}

export function RealtimeControls({ 
  isTracking, 
  autoRefresh, 
  setAutoRefresh, 
  criticalVehiclesCount 
}: RealtimeControlsProps) {
  const { t } = useLanguage();

  return (
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
        
        {criticalVehiclesCount > 0 && (
          <Badge variant="destructive" className="animate-pulse">
            {criticalVehiclesCount} {t('critical') || 'Critical'}
          </Badge>
        )}
      </div>
    </div>
  );
}