
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
        return <Users className="h-5 w-5 text-fleet-500" />;
      case "user-check":
        return <UserCheck className="h-5 w-5 text-green-500" />;
      case "user-x":
        return <UserX className="h-5 w-5 text-orange-500" />;
      default:
        return <Users className="h-5 w-5 text-fleet-500" />;
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
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <div className="rounded-full p-2 bg-white shadow-sm">
            {getIcon()}
          </div>
        </div>
        <p className="mt-3 text-3xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
}
