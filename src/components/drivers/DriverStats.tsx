
import { Card, CardContent } from "@/components/ui/card";
import { Users, UserCheck, UserX } from "lucide-react";

interface DriverStatsProps {
  title: string;
  value: number;
  icon: "users" | "user-check" | "user-x";
  variant?: "default" | "active" | "inactive";
}

export function DriverStats({ title, value, icon, variant = "default" }: DriverStatsProps) {
  const getIcon = () => {
    switch (icon) {
      case "users":
        return <Users className="h-4 w-4 md:h-5 md:w-5 text-fleet-500" />;
      case "user-check":
        return <UserCheck className="h-4 w-4 md:h-5 md:w-5 text-green-500" />;
      case "user-x":
        return <UserX className="h-4 w-4 md:h-5 md:w-5 text-orange-500" />;
      default:
        return <Users className="h-4 w-4 md:h-5 md:w-5 text-fleet-500" />;
    }
  };

  const getBgColor = () => {
    switch (variant) {
      case "active":
        return "bg-green-50";
      case "inactive":
        return "bg-orange-50";
      default:
        return "bg-fleet-50";
    }
  };

  return (
    <Card className={getBgColor()}>
      <CardContent className="p-3 md:p-4">
        <div className="flex items-center justify-between">
          <p className="text-xs md:text-sm font-medium text-gray-600 line-clamp-2">{title}</p>
          <div className="rounded-full p-1.5 md:p-2 bg-white shadow-sm shrink-0 ml-2">
            {getIcon()}
          </div>
        </div>
        <p className="mt-2 md:mt-3 text-2xl md:text-3xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
}
