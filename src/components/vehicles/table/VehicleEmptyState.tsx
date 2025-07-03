import { MobileOptimized } from "@/components/shared/mobile/MobileOptimized";
import { AccessibleCard } from "@/components/shared/accessibility/AccessibleCard";
import { useVehicleTranslations } from "../hooks/useVehicleTranslations";

interface VehicleEmptyStateProps {
  searchQuery: string;
}

export function VehicleEmptyState({ searchQuery }: VehicleEmptyStateProps) {
  const { getHeaderText } = useVehicleTranslations();

  return (
    <MobileOptimized>
      <AccessibleCard 
        title={getHeaderText("No Vehicles", "Keine Fahrzeuge")} 
        ariaLabel="No vehicles found message"
      >
        <p className="text-muted-foreground text-center">
          {searchQuery
            ? getHeaderText("No vehicles match your search query", "Keine Fahrzeuge entsprechen Ihrer Suchanfrage")
            : getHeaderText("No vehicles found", "Keine Fahrzeuge gefunden")}
        </p>
      </AccessibleCard>
    </MobileOptimized>
  );
}