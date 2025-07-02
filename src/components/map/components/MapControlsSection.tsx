
import { MapErrors } from "../MapErrors";
import { MapStyles } from "../MapStyles";
import { MapControls } from "../MapControls";

interface MapControlsSectionProps {
  tokenError: string | null;
  locationError: string | null;
  resetToken: () => void;
  mapStyle: string;
  setMapStyle: (style: string) => void;
  showTraffic: boolean;
  setShowTraffic: (show: boolean) => void;
  showPOIs: boolean;
  setShowPOIs: (show: boolean) => void;
  getUserLocation: () => void;
}

export function MapControlsSection({
  tokenError,
  locationError,
  resetToken,
  mapStyle,
  setMapStyle,
  showTraffic,
  setShowTraffic,
  showPOIs,
  setShowPOIs,
  getUserLocation
}: MapControlsSectionProps) {
  return (
    <>
      <MapErrors
        tokenError={tokenError}
        locationError={locationError}
        resetToken={resetToken}
      />
      
      <MapStyles 
        mapStyle={mapStyle}
        setMapStyle={setMapStyle}
        showTraffic={showTraffic}
        setShowTraffic={setShowTraffic}
        showPOIs={showPOIs}
        setShowPOIs={setShowPOIs}
      />
      
      <MapControls
        getUserLocation={getUserLocation}
        resetToken={resetToken}
      />
    </>
  );
}
