
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "@/contexts/LocationContext";
import { MapTokenInput } from "./MapTokenInput";
import { MapStyles } from "./MapStyles";
import { MapControls } from "./MapControls";
import { MapErrors } from "./MapErrors";
import { useMapInitialization } from "./hooks/useMapInitialization";
import { useLocationTracking } from "./hooks/useLocationTracking";
import { useVehicleMarkers } from "./hooks/useVehicleMarkers";
import { useMapToken } from "./hooks/useMapToken";

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
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const userMarker = useRef<mapboxgl.Marker | null>(null);
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [mapStyle, setMapStyle] = useState('streets-v11');
  const [showTraffic, setShowTraffic] = useState(false);
  const [showPOIs, setShowPOIs] = useState(true);
  
  // Location Context für echte Fahrzeugdaten
  const { 
    vehicleLocations, 
    vehiclesFromDB, 
    loadVehiclesFromDatabase,
    updateVehicleLocation,
    startTrackingVehicle
  } = useLocation();

  // Custom hooks
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

  const getUserLocation = () => {
    getUserLocationHook((coords) => {
      if (onLocationUpdate) {
        onLocationUpdate(coords);
      }
      
      if (map.current) {
        map.current.flyTo({
          center: coords,
          zoom: 15,
          essential: true
        });

        if (userMarker.current) {
          userMarker.current.setLngLat(coords);
        } else {
          userMarker.current = new mapboxgl.Marker({ 
            color: '#FF0000',
            draggable: false
          })
          .setLngLat(coords)
          .addTo(map.current);
        }
      }
      
      if (tracking) {
        startLocationTracking((coords) => {
          if (onLocationUpdate) {
            onLocationUpdate(coords);
          }
          
          if (userMarker.current) {
            userMarker.current.setLngLat(coords);
          } else if (map.current) {
            userMarker.current = new mapboxgl.Marker({ 
              color: '#FF0000',
              draggable: false
            })
            .setLngLat(coords)
            .addTo(map.current);
          }
          
          if (tracking && map.current) {
            map.current.flyTo({
              center: coords,
              zoom: 15,
              essential: true
            });
          }
        });
      }
    });
  };

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
    toast,
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
          
          {!mapLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="text-center p-4">
                <p className="text-lg text-fleet-500 font-medium mb-2">Real-Time Fleet Map | Live-Flottenansicht</p>
                <p className="text-sm text-gray-500">Loading real vehicle data... | Lade echte Fahrzeugdaten...</p>
              </div>
            </div>
          )}

          <MapErrors
            tokenError={tokenError}
            locationError={locationError}
            resetToken={resetToken}
          />
          
          <MapStyles 
            mapStyle={mapStyle}
            setMapStyle={updateMapStyle}
            showTraffic={showTraffic}
            setShowTraffic={toggleTraffic}
            showPOIs={showPOIs}
            setShowPOIs={togglePOIs}
          />
          
          <MapControls
            getUserLocation={getUserLocation}
            resetToken={resetToken}
          />
        </>
      )}
    </div>
  );
}
