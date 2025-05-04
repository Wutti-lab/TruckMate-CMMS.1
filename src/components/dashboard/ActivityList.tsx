
import React from "react";
import { useAuth, Activity } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { 
  LogIn, LogOut, Truck, Wrench, Package, 
  ActivitySquare, UserCircle, ClipboardCheck 
} from "lucide-react";

const getActivityIcon = (type: Activity['type']) => {
  switch (type) {
    case 'login':
      return <LogIn className="h-4 w-4 text-green-500" />;
    case 'logout':
      return <LogOut className="h-4 w-4 text-orange-500" />;
    case 'inspection':
      return <ClipboardCheck className="h-4 w-4 text-blue-500" />;
    case 'maintenance':
      return <Wrench className="h-4 w-4 text-yellow-500" />;
    case 'delivery':
      return <Package className="h-4 w-4 text-purple-500" />;
    default:
      return <ActivitySquare className="h-4 w-4 text-gray-500" />;
  }
};

export function ActivityList() {
  const { activities } = useAuth();

  const formatTime = (date: Date) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ActivitySquare className="h-5 w-5" />
          Latest Activities | กิจกรรมล่าสุด
        </CardTitle>
      </CardHeader>
      <CardContent>
        {activities.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No activities yet | ยังไม่มีกิจกรรม
          </div>
        ) : (
          <ul className="space-y-4">
            {activities.map((activity) => (
              <li 
                key={activity.id}
                className="flex items-start gap-3 p-3 border-b border-gray-100 last:border-0"
              >
                <div className="mt-0.5">{getActivityIcon(activity.type)}</div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.description}</p>
                  <div className="flex gap-2 mt-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <UserCircle className="h-3 w-3" />
                      {activity.user.name}
                    </span>
                    <span>•</span>
                    <span>{formatTime(activity.timestamp)}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
