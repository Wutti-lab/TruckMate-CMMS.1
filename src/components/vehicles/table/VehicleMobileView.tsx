import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { MobileOptimized } from "@/components/shared/mobile/MobileOptimized";
import { AccessibleCard } from "@/components/shared/accessibility/AccessibleCard";
import { useVehicleTranslations } from "../hooks/useVehicleTranslations";
import { getStatusVariant } from "../utils/vehicleUtils";
import { Vehicle } from "../types/VehicleTable";

interface VehicleMobileViewProps {
  vehicles: Vehicle[];
  onEditVehicle: (vehicle: Vehicle) => void;
  onDeleteVehicle: (id: string) => void;
}

export function VehicleMobileView({ 
  vehicles, 
  onEditVehicle, 
  onDeleteVehicle 
}: VehicleMobileViewProps) {
  const { getHeaderText } = useVehicleTranslations();

  return (
    <MobileOptimized enableSwipe>
      <div className="space-y-4">
        {vehicles.map((vehicle) => (
          <AccessibleCard 
            key={vehicle.id}
            title={vehicle.license_plate}
            ariaLabel={`Vehicle ${vehicle.license_plate} details`}
            className="hover-scale"
          >
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{vehicle.model}</span>
                <Badge variant={getStatusVariant(vehicle.status)}>
                  {vehicle.status}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">{getHeaderText("Location", "Standort")}:</span>
                  <p className="font-medium">{vehicle.location}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">{getHeaderText("Fuel", "Kraftstoff")}:</span>
                  <p className="font-medium">N/A</p>
                </div>
                <div>
                  <span className="text-muted-foreground">{getHeaderText("Battery", "Batterie")}:</span>
                  <p className="font-medium">N/A</p>
                </div>
                <div>
                  <span className="text-muted-foreground">{getHeaderText("Temp", "Temperatur")}:</span>
                  <p className="font-medium">N/A</p>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2 border-t">
                <span className="text-xs text-muted-foreground">
                  {getHeaderText("Next Service", "Nächste Wartung")}: {new Date(vehicle.next_service).toLocaleDateString()}
                </span>
                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => onEditVehicle(vehicle)}
                    aria-label={`Edit vehicle ${vehicle.license_plate}`}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => onDeleteVehicle(vehicle.id)}
                    aria-label={`Delete vehicle ${vehicle.license_plate}`}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </div>
          </AccessibleCard>
        ))}
      </div>
    </MobileOptimized>
  );
}