
import { TableCell } from "@/components/ui/table";
import { Car, AlertTriangle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Vehicle } from "../types/Vehicle";

interface VehicleIdentifierProps {
  vehicle: Vehicle;
  needsMaintenance: boolean;
}

export function VehicleIdentifier({ vehicle, needsMaintenance }: VehicleIdentifierProps) {
  return (
    <TableCell className="font-medium">
      <div className="flex items-center gap-2">
        <Car size={16} className="text-fleet-500" />
        {vehicle.id}
        
        {needsMaintenance && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <AlertTriangle size={16} className="text-amber-500" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Maintenance needed | Wartung erforderlich</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </TableCell>
  );
}
