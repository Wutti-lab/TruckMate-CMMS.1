import { useEffect } from 'react';
import { useLocation } from '@/contexts/LocationContext';

interface UseMapEffectsProps {
  mapLoaded: boolean;
  map: React.MutableRefObject<mapboxgl.Map | null>;
  vehiclesFromDB: any[];
  vehicleId?: string;
  addVehicleMarker: (vehicle: any, map: mapboxgl.Map) => any;
  clearVehicleMarkers: () => void;
  simulateVehicleMovement: (vehicles: any[]) => void;
  tracking: boolean;
  userLocation: [number, number] | null;
  startLocationTracking: (callback?: (coords: [number, number]) => void) => void;
  stopLocationTracking: () => void;
  getUserLocation: () => void;
  onLocationUpdate?: (coords: [number, number]) => void;
}

export function useMapEffects({
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
}: UseMapEffectsProps) {
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
          const marker = addVehicleMarker(targetVehicle, map.current!);
          if (marker && 'togglePopup' in marker) {
            (marker as any).togglePopup();
          }
        }, 1000);
      }
    }
    
    const updateInterval = setInterval(() => {
      simulateVehicleMovement(vehiclesFromDB);
    }, 5000);
    
    return () => clearInterval(updateInterval);
  }, [mapLoaded, vehiclesFromDB, vehicleId]);

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
}