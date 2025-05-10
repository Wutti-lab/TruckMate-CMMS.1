
import { TableCell } from "@/components/ui/table";
import { Thermometer } from "lucide-react";

interface VehicleTemperatureProps {
  temperature: number;
}

export function VehicleTemperature({ temperature }: VehicleTemperatureProps) {
  return (
    <TableCell>
      <div className="flex items-center gap-1">
        <Thermometer
          size={16}
          className={
            temperature > 90
              ? "text-red-500"
              : temperature > 85
              ? "text-yellow-500"
              : "text-blue-500"
          }
        />
        <span>{temperature}°C</span>
      </div>
    </TableCell>
  );
}
