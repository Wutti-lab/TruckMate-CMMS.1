
import { TableCell } from "@/components/ui/table";
import { MapPin } from "lucide-react";
import { Vehicle } from "../types/Vehicle";

interface VehicleLocationProps {
  vehicle: Vehicle;
  showLocation: boolean;
}

export function VehicleLocation({ vehicle, showLocation }: VehicleLocationProps) {
  return (
    <TableCell>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1">
          <MapPin size={14} className="text-muted-foreground" />
          {vehicle.location}
        </div>
        
        {showLocation && vehicle.coordinates && (
          <div className="text-xs font-mono mt-1 text-muted-foreground">
            GPS: {vehicle.coordinates.lat.toFixed(6)}°, {vehicle.coordinates.lng.toFixed(6)}°
            {vehicle.lastUpdated && <div>Updated: {vehicle.lastUpdated}</div>}
          </div>
        )}
      </div>
    </TableCell>
  );
}
