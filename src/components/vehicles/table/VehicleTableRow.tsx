import { TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { getStatusVariant } from "../utils/vehicleUtils";
import { Vehicle } from "../types/VehicleTable";

interface VehicleTableRowProps {
  vehicle: Vehicle;
  onEditVehicle: (vehicle: Vehicle) => void;
  onDeleteVehicle: (id: string) => void;
}

export function VehicleTableRow({ 
  vehicle, 
  onEditVehicle, 
  onDeleteVehicle 
}: VehicleTableRowProps) {
  return (
    <TableRow className="hover:bg-muted/50 transition-colors">
      <td className="font-medium">{vehicle.license_plate}</td>
      <td>{vehicle.model}</td>
      <td>
        <Badge variant={getStatusVariant(vehicle.status)}>
          {vehicle.status}
        </Badge>
      </td>
      <td>{vehicle.location}</td>
      <td>
        <div className="flex items-center gap-2">
          <span>{vehicle.fuel_level}%</span>
          <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${vehicle.fuel_level}%` }}
            />
          </div>
        </div>
      </td>
      <td>
        <div className="flex items-center gap-2">
          <span>{vehicle.battery_level}%</span>
          <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-accent transition-all duration-300"
              style={{ width: `${vehicle.battery_level}%` }}
            />
          </div>
        </div>
      </td>
      <td>
        <span className={vehicle.engine_temp > 90 ? 'text-destructive font-medium' : ''}>
          {vehicle.engine_temp}°C
        </span>
      </td>
      <td>{new Date(vehicle.next_service).toLocaleDateString()}</td>
      <td className="text-right">
        <div className="flex justify-end gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onEditVehicle(vehicle)}
            aria-label={`Edit vehicle ${vehicle.license_plate}`}
            className="hover-scale"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => onDeleteVehicle(vehicle.id)}
            aria-label={`Delete vehicle ${vehicle.license_plate}`}
            className="hover-scale"
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      </td>
    </TableRow>
  );
}