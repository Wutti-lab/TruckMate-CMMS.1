
import { useIsMobile } from "@/hooks/use-mobile";
import { filterVehicles } from "./utils/vehicleUtils";
import { VehicleLoadingState } from "./table/VehicleLoadingState";
import { VehicleEmptyState } from "./table/VehicleEmptyState";
import { VehicleMobileView } from "./table/VehicleMobileView";
import { VehicleDesktopView } from "./table/VehicleDesktopView";
import { Vehicle } from "./types/VehicleTable";

interface VehiclesTableProps {
  vehicles: Vehicle[];
  isLoading: boolean;
  searchQuery: string;
  onEditVehicle: (vehicle: Vehicle) => void;
  onDeleteVehicle: (id: string) => void;
  onViewDetails?: (vehicle: Vehicle) => void;
  onGenerateQR?: (vehicle: Vehicle) => void;
  selectedVehicles?: string[];
  onVehicleSelect?: (vehicleId: string, selected: boolean) => void;
}

export function VehiclesTable({ 
  vehicles, 
  isLoading, 
  searchQuery,
  onEditVehicle,
  onDeleteVehicle 
}: VehiclesTableProps) {
  const isMobile = useIsMobile();
  
  const filteredVehicles = filterVehicles(vehicles, searchQuery);

  if (isLoading) {
    return <VehicleLoadingState />;
  }

  if (filteredVehicles.length === 0) {
    return <VehicleEmptyState searchQuery={searchQuery} />;
  }

  if (isMobile) {
    return (
      <VehicleMobileView
        vehicles={filteredVehicles}
        onEditVehicle={onEditVehicle}
        onDeleteVehicle={onDeleteVehicle}
      />
    );
  }

  return (
    <VehicleDesktopView
      vehicles={filteredVehicles}
      onEditVehicle={onEditVehicle}
      onDeleteVehicle={onDeleteVehicle}
    />
  );
}
