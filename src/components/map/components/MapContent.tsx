import { MapLoadingState } from "./MapLoadingState";
import { MapControlsSection } from "./MapControlsSection";

interface MapContentProps {
  mapContainer: React.RefObject<HTMLDivElement>;
  mapLoaded: boolean;
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

export function MapContent({
  mapContainer,
  mapLoaded,
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
}: MapContentProps) {
  return (
    <>
      <div ref={mapContainer} className="h-full w-full" />
      
      <MapLoadingState mapLoaded={mapLoaded} />

      <MapControlsSection
        tokenError={tokenError}
        locationError={locationError}
        resetToken={resetToken}
        mapStyle={mapStyle}
        setMapStyle={setMapStyle}
        showTraffic={showTraffic}
        setShowTraffic={setShowTraffic}
        showPOIs={showPOIs}
        setShowPOIs={setShowPOIs}
        getUserLocation={getUserLocation}
      />
    </>
  );
}