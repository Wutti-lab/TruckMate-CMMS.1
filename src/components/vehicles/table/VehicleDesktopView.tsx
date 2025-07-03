import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MobileOptimized } from "@/components/shared/mobile/MobileOptimized";
import { AccessibleCard } from "@/components/shared/accessibility/AccessibleCard";
import { useVehicleTranslations } from "../hooks/useVehicleTranslations";
import { VehicleTableRow } from "./VehicleTableRow";
import { Vehicle } from "../types/VehicleTable";

interface VehicleDesktopViewProps {
  vehicles: Vehicle[];
  onEditVehicle: (vehicle: Vehicle) => void;
  onDeleteVehicle: (id: string) => void;
}

export function VehicleDesktopView({ 
  vehicles, 
  onEditVehicle, 
  onDeleteVehicle 
}: VehicleDesktopViewProps) {
  const { getHeaderText } = useVehicleTranslations();

  return (
    <MobileOptimized>
      <AccessibleCard 
        title={getHeaderText("Vehicles Overview", "Fahrzeugübersicht")}
        ariaLabel="Vehicles data table"
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{getHeaderText("License Plate", "Kennzeichen")}</TableHead>
              <TableHead>{getHeaderText("Model", "Modell")}</TableHead>
              <TableHead>{getHeaderText("Status", "Status")}</TableHead>
              <TableHead>{getHeaderText("Location", "Standort")}</TableHead>
              <TableHead>{getHeaderText("Fuel", "Kraftstoff")}</TableHead>
              <TableHead>{getHeaderText("Battery", "Batterie")}</TableHead>
              <TableHead>{getHeaderText("Engine Temp", "Motortemperatur")}</TableHead>
              <TableHead>{getHeaderText("Next Service", "Nächste Wartung")}</TableHead>
              <TableHead className="text-right">{getHeaderText("Actions", "Aktionen")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vehicles.map((vehicle) => (
              <VehicleTableRow
                key={vehicle.id}
                vehicle={vehicle}
                onEditVehicle={onEditVehicle}
                onDeleteVehicle={onDeleteVehicle}
              />
            ))}
          </TableBody>
        </Table>
      </AccessibleCard>
    </MobileOptimized>
  );
}