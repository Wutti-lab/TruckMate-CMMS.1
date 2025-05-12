
import { Button } from "@/components/ui/button";
import { Locate, Map } from "lucide-react";

interface MapControlsProps {
  getUserLocation: () => void;
  resetToken: () => void;
}

export function MapControls({
  getUserLocation,
  resetToken
}: MapControlsProps) {
  return (
    <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-2">
      <Button
        variant="secondary"
        size="icon"
        className="bg-white shadow-lg hover:bg-gray-100"
        onClick={getUserLocation}
        title="Get Location | รับตำแหน่ง"
      >
        <Locate className="h-4 w-4" />
      </Button>
      
      <Button
        variant="secondary"
        size="icon"
        className="bg-white shadow-lg hover:bg-gray-100"
        onClick={resetToken}
        title="Change Mapbox Token | เปลี่ยน Mapbox Token"
      >
        <Map className="h-4 w-4" />
      </Button>
    </div>
  );
}
