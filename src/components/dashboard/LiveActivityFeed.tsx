
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { useTranslation } from '@/hooks/useTranslation';

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
  const { t } = useTranslation();
  const [activities, setActivities] = useState<ActivityItem[]>([
    {
      id: '1',
      type: 'inspection',
      message: 'Daily inspection completed for B-FR-123',
      timestamp: new Date(Date.now() - 300000),
      vehicleId: 'B-FR-123'
    },
    {
      id: '2',
      type: 'alert',
      message: 'Low fuel warning for B-FR-234',
      timestamp: new Date(Date.now() - 600000),
      vehicleId: 'B-FR-234',
      severity: 'medium'
    },
    {
      id: '3',
      type: 'driver',
      message: 'Driver John Smith started shift',
      timestamp: new Date(Date.now() - 900000),
      driverId: 'john-smith'
    },
    {
      id: '4',
      type: 'maintenance',
      message: 'Scheduled maintenance due for B-FR-345',
      timestamp: new Date(Date.now() - 1200000),
      vehicleId: 'B-FR-345',
      severity: 'high'
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newActivity: ActivityItem = {
        id: Date.now().toString(),
        type: ['inspection', 'maintenance', 'alert', 'driver', 'vehicle'][Math.floor(Math.random() * 5)] as ActivityItem['type'],
        message: `New activity at ${new Date().toLocaleTimeString()}`,
        timestamp: new Date(),
        vehicleId: `B-FR-${Math.floor(Math.random() * 999).toString().padStart(3, '0')}`,
        severity: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as ActivityItem['severity']
      };

      setActivities(prev => [newActivity, ...prev.slice(0, 9)]);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

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
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Live Activity Feed</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg border">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="text-xs">
                    {getActivityIcon(activity.type)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {activity.message}
                  </p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-gray-500">
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
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
