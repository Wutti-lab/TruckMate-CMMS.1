import { Skeleton } from "@/components/ui/skeleton";
import { MobileOptimized } from "@/components/shared/mobile/MobileOptimized";
import { AccessibleCard } from "@/components/shared/accessibility/AccessibleCard";
import { useVehicleTranslations } from "../hooks/useVehicleTranslations";

export function VehicleLoadingState() {
  const { getHeaderText } = useVehicleTranslations();

  return (
    <MobileOptimized>
      <AccessibleCard 
        title={getHeaderText("Loading Vehicles", "Fahrzeuge werden geladen")} 
        ariaLabel="Loading vehicles data"
      >
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-12 w-full animate-pulse" />
          ))}
        </div>
      </AccessibleCard>
    </MobileOptimized>
  );
}