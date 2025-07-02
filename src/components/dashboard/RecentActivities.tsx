
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Wrench, Users, Clock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "date-fns";
import { de } from "date-fns/locale";

interface RecentActivity {
  id: string;
  type: 'inspection' | 'maintenance' | 'assignment';
  message: string;
  timestamp: string;
  vehicleId?: string;
}

interface RecentActivitiesProps {
  activities: RecentActivity[];
  loading: boolean;
}

export function RecentActivities({ activities, loading }: RecentActivitiesProps) {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'inspection':
        return <Activity className="h-4 w-4 text-blue-600" />;
      case 'maintenance':
        return <Wrench className="h-4 w-4 text-orange-600" />;
      case 'assignment':
        return <Users className="h-4 w-4 text-green-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Letzte Aktivitäten</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-3">
                <Skeleton className="h-4 w-4" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-48 mb-1" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!activities.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Letzte Aktivitäten</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Keine Aktivitäten gefunden</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Letzte Aktivitäten</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.slice(0, 5).map((activity) => (
            <div key={activity.id} className="flex items-center space-x-3">
              {getActivityIcon(activity.type)}
              <div className="flex-1">
                <p className="text-sm font-medium">{activity.message}</p>
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(activity.timestamp), { 
                    addSuffix: true, 
                    locale: de 
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
