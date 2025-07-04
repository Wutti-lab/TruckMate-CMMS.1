
import { useState, useEffect, useCallback, memo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { AccessibleCard } from '@/components/shared/accessibility/AccessibleCard';

interface ActivityItem {
  id: string;
  type: 'inspection' | 'maintenance' | 'alert' | 'driver' | 'vehicle';
  message: string;
  timestamp: Date;
  vehicleId?: string;
  driverId?: string;
  severity?: 'low' | 'medium' | 'high';
}

export function LiveActivityFeed() {
  const { t } = useLanguage();
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRecentActivities = useCallback(async () => {
    try {
      const [vehiclesResult, driversResult, inspectionsResult] = await Promise.all([
        supabase.from('vehicles').select('*').order('updated_at', { ascending: false }).limit(5),
        supabase.from('drivers').select('*').order('updated_at', { ascending: false }).limit(5),
        supabase.from('inspections').select('*').order('inspection_date', { ascending: false }).limit(5)
      ]);

      const recentActivities: ActivityItem[] = [];

      // Add vehicle updates
      vehiclesResult.data?.forEach(vehicle => {
        recentActivities.push({
          id: `vehicle-${vehicle.id}`,
          type: 'vehicle',
          message: `Vehicle ${vehicle.license_plate} status: ${vehicle.status}`,
          timestamp: new Date(vehicle.updated_at),
          vehicleId: vehicle.license_plate
        });
      });

      // Add driver updates
      driversResult.data?.forEach(driver => {
        recentActivities.push({
          id: `driver-${driver.id}`,
          type: 'driver',
          message: `Driver ${driver.name} status: ${driver.status}`,
          timestamp: new Date(driver.updated_at),
          driverId: driver.id
        });
      });

      // Add inspection updates
      inspectionsResult.data?.forEach(inspection => {
        recentActivities.push({
          id: `inspection-${inspection.id}`,
          type: 'inspection',
          message: `${inspection.type} inspection: ${inspection.status}`,
          timestamp: new Date(inspection.inspection_date),
          vehicleId: inspection.vehicle_id,
          severity: inspection.status === 'failed' ? 'high' : 'low'
        });
      });

      // Sort by timestamp and limit to 10 most recent
      const sortedActivities = recentActivities
        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
        .slice(0, 10);

      setActivities(sortedActivities);
    } catch (error) {
      console.error('Error fetching activities:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRecentActivities();

    // Set up real-time subscriptions for live updates
    const vehicleChannel = supabase
      .channel('vehicle-activity')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'vehicles' }, fetchRecentActivities)
      .subscribe();

    const driverChannel = supabase
      .channel('driver-activity')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'drivers' }, fetchRecentActivities)
      .subscribe();

    const inspectionChannel = supabase
      .channel('inspection-activity')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'inspections' }, fetchRecentActivities)
      .subscribe();

    return () => {
      supabase.removeChannel(vehicleChannel);
      supabase.removeChannel(driverChannel);
      supabase.removeChannel(inspectionChannel);
    };
  }, [fetchRecentActivities]);

  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'inspection': return 'I';
      case 'maintenance': return 'M';
      case 'alert': return 'A';
      case 'driver': return 'D';
      case 'vehicle': return 'V';
      default: return '?';
    }
  };

  const getBadgeVariant = (severity?: ActivityItem['severity']) => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <AccessibleCard 
      title={t('liveActivityFeed') || 'Live Activity Feed'}
      className="animate-fade-in"
      ariaLabel="Live activity feed showing recent fleet activities"
    >
        {loading ? (
          <div className="flex items-center justify-center h-[400px]">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <ScrollArea className="h-[400px]">
            <div className="space-y-4">
              {activities.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  {t('noActivitiesFound') || 'No activities found'}
                </div>
              ) : (
                activities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg border hover-scale transition-all duration-200">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">
                        {getActivityIcon(activity.type)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {activity.message}
                      </p>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-xs text-muted-foreground">
                          {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                        </p>
                        {activity.severity && (
                          <Badge variant={getBadgeVariant(activity.severity)} className="text-xs">
                            {activity.severity}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        )}
    </AccessibleCard>
  );
}

export const MemoizedLiveActivityFeed = memo(LiveActivityFeed);
