import { useEffect } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { useLocation } from "@/contexts/LocationContext";
import { useMapInitialization } from "./hooks/useMapInitialization";
import { useLocationTracking } from "./hooks/useLocationTracking";
import { useVehicleMarkers } from "./hooks/useVehicleMarkers";
import { useMapToken } from "./hooks/useMapToken";
import { useMapState } from "./hooks/useMapState";
import { useMapHandlers } from "./hooks/useMapHandlers";
import { useMapEffects } from "./hooks/useMapEffects";
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";
import { MapTokenManager } from "./components/MapTokenManager";
import { MapContent } from "./components/MapContent";
import { MobileOptimized } from "@/components/shared/mobile/MobileOptimized";
import { useIsMobile } from "@/hooks/use-mobile";

interface MapContainerProps {
  className?: string;
  tracking?: boolean;
  onLocationUpdate?: (coords: [number, number]) => void;
  vehicleId?: string;
}

export function MapContainer({ 
  className, 
  tracking = false, 
  onLocationUpdate, 
  vehicleId 
}: MapContainerProps) {
  const isMobile = useIsMobile();
  
  // Location Context for real vehicle data
  const { 
    vehiclesFromDB, 
    loadVehiclesFromDatabase
  } = useLocation();

  // Custom hooks
  const {
    mapContainer,
    map,
    mapLoaded,
    setMapLoaded,
    userMarker,
    mapStyle,
    setMapStyle,
    showTraffic,
    setShowTraffic,
    showPOIs,
    setShowPOIs,
  } = useMapState();

  const {
    mapboxToken,
    setMapboxToken,
    tokenError,
    setTokenError,
    isSettingToken,
    setIsSettingToken,
    handleTokenSubmit: handleTokenSubmitHook,
    resetToken
  } = useMapToken();

  const {
    userLocation,
    locationError,
    startLocationTracking,
    stopLocationTracking,
    getUserLocation: getUserLocationHook
  } = useLocationTracking();

  const {
    addVehicleMarker,
    updateVehicleMarker,
    clearVehicleMarkers,
    simulateVehicleMovement
  } = useVehicleMarkers();

  const { getUserLocation } = useMapHandlers({
    map,
    userMarker,
    tracking,
    onLocationUpdate,
    getUserLocationHook,
    startLocationTracking
  });

  const { 
    initializeMap,
    updateMapStyle,
    toggleTraffic,
    togglePOIs
  } = useMapInitialization({
    mapContainer,
    map,
    setMapLoaded,
    mapboxToken,
    mapStyle,
    showTraffic,
    setTokenError,
    toast: { toast: () => {} }, // Simple placeholder
    getUserLocation
  });

  const handleTokenSubmit = () => {
    if (handleTokenSubmitHook()) {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
      initializeMap(mapboxToken);
    }
  };

  // Initialize map when token is available
  useEffect(() => {
    if (mapboxToken && !isSettingToken) {
      initializeMap(mapboxToken);
    }
    
    return () => {
      stopLocationTracking();
    };
  }, [isSettingToken]);

  // Handle all map effects through custom hook
  useMapEffects({
    mapLoaded,
    map,
    vehiclesFromDB,
    vehicleId,
    addVehicleMarker,
    clearVehicleMarkers,
    simulateVehicleMovement,
    tracking,
    userLocation,
    startLocationTracking,
    stopLocationTracking,
    getUserLocation,
    onLocationUpdate
  });

  return (
    <ErrorBoundary>
      <MobileOptimized 
        enableSwipe={isMobile}
        className={`relative h-full w-full rounded-md overflow-hidden ${className}`}
      >
        {isSettingToken ? (
          <MapTokenManager
            mapboxToken={mapboxToken}
            setMapboxToken={setMapboxToken}
            handleTokenSubmit={handleTokenSubmit}
            tokenError={tokenError}
          />
        ) : (
          <MapContent
            mapContainer={mapContainer}
            mapLoaded={mapLoaded}
            tokenError={tokenError}
            locationError={locationError}
            resetToken={resetToken}
            mapStyle={mapStyle}
            setMapStyle={updateMapStyle}
            showTraffic={showTraffic}
            setShowTraffic={toggleTraffic}
            showPOIs={showPOIs}
            setShowPOIs={togglePOIs}
            getUserLocation={getUserLocation}
          />
        )}
      </MobileOptimized>
    </ErrorBoundary>
  );
}