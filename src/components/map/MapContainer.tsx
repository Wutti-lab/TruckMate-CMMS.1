
import { useEffect, useRef } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLocation } from "@/contexts/LocationContext";
import { MapTokenInput } from "./MapTokenInput";
import { MapLoadingState } from "./components/MapLoadingState";
import { MapControlsSection } from "./components/MapControlsSection";
import { useMapInitialization } from "./hooks/useMapInitialization";
import { useLocationTracking } from "./hooks/useLocationTracking";
import { useVehicleMarkers } from "./hooks/useVehicleMarkers";
import { useMapToken } from "./hooks/useMapToken";
import { useMapState } from "./hooks/useMapState";
import { useMapHandlers } from "./hooks/useMapHandlers";

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
    vehicleLocations, 
    vehiclesFromDB, 
    loadVehiclesFromDatabase,
    updateVehicleLocation,
    startTrackingVehicle
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

  useEffect(() => {
    if (mapboxToken && !isSettingToken) {
      initializeMap(mapboxToken);
    }
    
    return () => {
      stopLocationTracking();
    };
  }, [isSettingToken]);

  // Effect to handle tracking state changes
  useEffect(() => {
    if (tracking) {
      if (userLocation) {
        startLocationTracking((coords) => {
          if (onLocationUpdate) {
            onLocationUpdate(coords);
          }
        });
      } else {
        getUserLocation();
      }
    } else {
      stopLocationTracking();
    }
    
    return () => {
      stopLocationTracking();
    };
  }, [tracking]);

  // Load real vehicles and display them on map
  useEffect(() => {
    if (!mapLoaded || !map.current) return;
    
    console.log('Displaying real vehicles on map:', vehiclesFromDB);
    
    clearVehicleMarkers();
    
    vehiclesFromDB.forEach(vehicle => {
      if (vehicle.lat && vehicle.lng) {
        addVehicleMarker(vehicle, map.current!);
      }
    });
    
    if (vehicleId) {
      const targetVehicle = vehiclesFromDB.find(v => v.id === vehicleId);
      if (targetVehicle && targetVehicle.lat && targetVehicle.lng && map.current) {
        map.current.flyTo({
          center: [targetVehicle.lng, targetVehicle.lat],
          zoom: 15,
          essential: true
        });
        
        setTimeout(() => {
          const marker = Object.values(addVehicleMarker(targetVehicle, map.current!));
          if (marker && marker[0] && 'togglePopup' in marker[0]) {
            (marker[0] as any).togglePopup();
          }
        }, 1000);
      }
    }
    
    const updateInterval = setInterval(() => {
      simulateVehicleMovement(vehiclesFromDB);
    }, 5000);
    
    return () => clearInterval(updateInterval);
  }, [mapLoaded, vehiclesFromDB, vehicleId]);

  return (
    <div className={`relative h-full w-full rounded-md overflow-hidden ${className}`}>
      {isSettingToken ? (
        <MapTokenInput 
          mapboxToken={mapboxToken}
          setMapboxToken={setMapboxToken}
          handleTokenSubmit={handleTokenSubmit}
          tokenError={tokenError}
        />
      ) : (
        <>
          <div ref={mapContainer} className="h-full w-full" />
          
          <MapLoadingState mapLoaded={mapLoaded} />

          <MapControlsSection
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
        </>
      )}
    </div>
  );
}
