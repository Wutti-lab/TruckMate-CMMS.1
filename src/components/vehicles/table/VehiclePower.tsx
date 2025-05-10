
import { TableCell } from "@/components/ui/table";
import { Battery, Fuel } from "lucide-react";

interface VehiclePowerProps {
  fuelLevel: number;
  batteryLevel: number;
}

export function VehiclePower({ fuelLevel, batteryLevel }: VehiclePowerProps) {
  // Determine which level to display
  const level = fuelLevel > 0 ? fuelLevel : batteryLevel;

  return (
    <TableCell>
      <div className="flex items-center gap-3 w-32">
        {fuelLevel > 0 ? (
          <div className="flex items-center gap-1">
            <Fuel size={14} className="text-muted-foreground" />
            <span>{fuelLevel}%</span>
          </div>
        ) : (
          <div className="flex items-center gap-1">
            <Battery size={14} className="text-muted-foreground" />
            <span>{batteryLevel}%</span>
          </div>
        )}
        <div className="w-full bg-gray-200 h-1.5 rounded-full">
          <div
            className={`h-1.5 rounded-full ${
              level > 50
                ? "bg-green-500"
                : level > 25
                ? "bg-yellow-500"
                : "bg-red-500"
            }`}
            style={{
              width: `${level}%`,
            }}
          ></div>
        </div>
      </div>
    </TableCell>
  );
}
