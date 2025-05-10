
import { Card, CardContent } from "@/components/ui/card";
import { Users, UserCheck, UserX } from "lucide-react";

interface DriverStatsProps {
  title: string;
  value: number;
  icon: "users" | "user-check" | "user-x";
  variant?: "active" | "inactive";
}

export function DriverStats({ title, value, icon, variant }: DriverStatsProps) {
  const getIcon = () => {
    switch (icon) {
      case "users":
        return <Users className="h-5 w-5 text-slate-600" />;
      case "user-check":
        return <UserCheck className="h-5 w-5 text-green-600" />;
      case "user-x":
        return <UserX className="h-5 w-5 text-orange-600" />;
      default:
        return null;
    }
  };

  const getBgColor = () => {
    if (variant === "active") return "bg-green-50";
    if (variant === "inactive") return "bg-orange-50";
    return "bg-slate-50";
  };

  return (
    <Card className={getBgColor()}>
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
            <p className="text-3xl font-bold">{value}</p>
          </div>
          <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center shadow-sm">
            {getIcon()}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
