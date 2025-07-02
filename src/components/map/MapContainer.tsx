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
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const userMarker = useRef<mapboxgl.Marker | null>(null);
  const vehicleMarkers = useRef<Record<string, mapboxgl.Marker>>({});
  const watchPositionId = useRef<number | null>(null);
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  // Location Context für echte Fahrzeugdaten
  const { 
    vehicleLocations, 
    vehiclesFromDB, 
    loadVehiclesFromDatabase,
    updateVehicleLocation,
    startTrackingVehicle
  } = useLocation();
  
  const [mapboxToken, setMapboxToken] = useState(
    localStorage.getItem('mapbox_token') || ''
  );
  
  const [tokenError, setTokenError] = useState<string | null>(null);
  const [isSettingToken, setIsSettingToken] = useState(!localStorage.getItem('mapbox_token'));
  const [mapStyle, setMapStyle] = useState('streets-v11');
  const [showTraffic, setShowTraffic] = useState(false);
  const [showPOIs, setShowPOIs] = useState(true);

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

  const stopLocationTracking = () => {
    if (watchPositionId.current !== null) {
      navigator.geolocation.clearWatch(watchPositionId.current);
      watchPositionId.current = null;
    }
  };

  const startLocationTracking = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser | เบราว์เซอร์ของคุณไม่รองรับการระบุตำแหน่ง");
      return;
    }

    // Clear any previous tracking
    stopLocationTracking();
    
    // Start new tracking
    watchPositionId.current = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const coords: [number, number] = [longitude, latitude];
        setUserLocation(coords);
        setLocationError(null);
        
        // Notify parent component about location update
        if (onLocationUpdate) {
          onLocationUpdate(coords);
        }
        
        if (userMarker.current) {
          userMarker.current.setLngLat(coords);
        } else if (map.current) {
          // Create new marker if it doesn't exist
          userMarker.current = new mapboxgl.Marker({ 
            color: '#FF0000',
            draggable: false
          })
          .setLngLat(coords)
          .addTo(map.current);
        }
        
        // Center map on user location if tracking is enabled
        if (tracking && map.current) {
          map.current.flyTo({
            center: coords,
            zoom: 15,
            essential: true
          });
        }
      },
      (error) => {
        console.error("Error watching location:", error);
        handleLocationError(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );
  };

  const handleLocationError = (error: GeolocationPositionError) => {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        setLocationError("Location access denied | การเข้าถึงตำแหน่งถูกปฏิเสธ");
        break;
      case error.POSITION_UNAVAILABLE:
        setLocationError("Location information unavailable | ข้อมูลตำแหน่งไม่พร้อมใช้งาน");
        break;
      case error.TIMEOUT:
        setLocationError("Location request timed out | คำขอตำแหน่งหมดเวลา");
        break;
      default:
        setLocationError("Unknown error getting location | ข้อผิดพลาดที่ไม่รู้จักในการรับตำแหน่ง");
        break;
    }
  };

  function getUserLocation() {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported | การระบุตำแหน่งไม่ได้รับการสนับสนุน");
      return;
    }

    setLocationError(null);
    toast({
      title: "Getting your location | กำลังรับตำแหน่งของคุณ",
      description: "Please wait... | กรุณารอสักครู่..."
    });

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const coords: [number, number] = [longitude, latitude];
        setUserLocation(coords);
        
        // Notify parent component about location update
        if (onLocationUpdate) {
          onLocationUpdate(coords);
        }
        
        if (map.current) {
          map.current.flyTo({
            center: coords,
            zoom: 15,
            essential: true
          });

          // Update or create marker
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
          // Start continuous tracking
          startLocationTracking();
        }
        
        toast({
          title: "Location found | ค้นพบตำแหน่งแล้ว",
          description: "Map centered to your location | แผนที่ถูกจัดให้อยู่ที่ตำแหน่งของคุณ"
        });
      },
      (error) => {
        console.error("Error getting location:", error);
        handleLocationError(error);
        toast({
          title: "Location error | ข้อผิดพลาดตำแหน่ง",
          description: "Could not get your location | ไม่สามารถรับตำแหน่งของคุณได้",
          variant: "destructive"
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  }

  const handleTokenSubmit = () => {
    if (mapboxToken && mapboxToken.trim()) {
      localStorage.setItem('mapbox_token', mapboxToken);
      setIsSettingToken(false);
      setTokenError(null);
      
      // If we had a map already, clean it up
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
      
      // Initialize with new token
      initializeMap(mapboxToken);
    } else {
      setTokenError("Please enter a valid Mapbox token | กรุณาใส่ Mapbox token ที่ถูกต้อง");
    }
  };
  
  const resetToken = () => {
    localStorage.removeItem('mapbox_token');
    setMapboxToken('');
    setIsSettingToken(true);
    
    if (map.current) {
      map.current.remove();
      map.current = null;
    }
    setMapLoaded(false);
  };

  // Add a vehicle marker to the map using real data
  const addVehicleMarker = (vehicle: any) => {
    if (!map.current || !vehicle.lat || !vehicle.lng) return;
    
    const position: [number, number] = [vehicle.lng, vehicle.lat];
    const vehicleId = vehicle.id;
    
    // Remove existing marker if it exists
    if (vehicleMarkers.current[vehicleId]) {
      vehicleMarkers.current[vehicleId].remove();
    }
    
    // Get driver info
    const driverInfo = vehicle.vehicle_assignments?.[0]?.drivers;
    const driverName = driverInfo?.name || 'Unassigned';
    const driverStatus = driverInfo?.status || 'unknown';
    
    // Create a custom element for the marker
    const el = document.createElement('div');
    el.className = 'vehicle-marker';
    el.style.width = '35px';
    el.style.height = '35px';
    el.style.borderRadius = '50%';
    el.style.backgroundColor = vehicle.status === 'active' ? '#10B981' : 
                              vehicle.status === 'maintenance' ? '#F59E0B' : 
                              vehicle.status === 'inactive' ? '#6B7280' : '#10B981';
    el.style.border = '3px solid white';
    el.style.display = 'flex';
    el.style.justifyContent = 'center';
    el.style.alignItems = 'center';
    el.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
    el.style.cursor = 'pointer';
    el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-truck" style="color: white;"><path d="M10 17h4V5H2v12h3"></path><path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5v8h1"></path><circle cx="7.5" cy="17.5" r="2.5"></circle><circle cx="17.5" cy="17.5" r="2.5"></circle></svg>`;
    
    // Create popup for the marker with real data
    const popup = new mapboxgl.Popup({ offset: 25 })
      .setHTML(`
        <div style="font-family: system-ui, sans-serif; padding: 12px; min-width: 200px;">
          <h3 style="margin: 0 0 12px 0; font-weight: 600; color: #1f2937;">${vehicle.license_plate}</h3>
          <div style="display: grid; gap: 6px;">
            <p style="margin: 0; display: flex; justify-content: space-between;">
              <strong>Model:</strong> <span>${vehicle.model}</span>
            </p>
            <p style="margin: 0; display: flex; justify-content: space-between;">
              <strong>Driver:</strong> <span>${driverName}</span>
            </p>
            <p style="margin: 0; display: flex; justify-content: space-between;">
              <strong>Status:</strong> 
              <span style="color: ${vehicle.status === 'active' ? '#059669' : vehicle.status === 'maintenance' ? '#D97706' : '#6B7280'};">
                ${vehicle.status}
              </span>
            </p>
            <p style="margin: 0; display: flex; justify-content: space-between;">
              <strong>Battery:</strong> <span>${vehicle.battery_level || 'N/A'}%</span>
            </p>
            <p style="margin: 0; display: flex; justify-content: space-between;">
              <strong>Fuel:</strong> <span>${vehicle.fuel_level || 'N/A'}%</span>
            </p>
            <p style="margin: 0; display: flex; justify-content: space-between;">
              <strong>Location:</strong> <span>${vehicle.location || 'Unknown'}</span>
            </p>
          </div>
          <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280;">
            Last updated: ${new Date(vehicle.updated_at).toLocaleString()}
          </div>
        </div>
      `);
    
    // Create the marker
    const marker = new mapboxgl.Marker(el)
      .setLngLat(position)
      .setPopup(popup)
      .addTo(map.current);
    
    vehicleMarkers.current[vehicleId] = marker;
    
    return marker;
  };
  
  // Update a vehicle marker's position using real data
  const updateVehicleMarker = (vehicle: any) => {
    if (!vehicle.lat || !vehicle.lng) return;
    
    const position: [number, number] = [vehicle.lng, vehicle.lat];
    const vehicleId = vehicle.id;
    
    if (vehicleMarkers.current[vehicleId]) {
      vehicleMarkers.current[vehicleId].setLngLat(position);
    } else {
      // Create new marker if it doesn't exist
      addVehicleMarker(vehicle);
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
        // If we already have a location, just start tracking
        startLocationTracking();
      } else {
        // Otherwise get the location first
        getUserLocation();
      }
    } else {
      stopLocationTracking();
    }
    
    // Cleanup when component unmounts
    return () => {
      stopLocationTracking();
    };
  }, [tracking]);

  // Load real vehicles and display them on map
  useEffect(() => {
    if (!mapLoaded || !map.current) return;
    
    console.log('Displaying real vehicles on map:', vehiclesFromDB);
    
    // Clear existing vehicle markers
    Object.values(vehicleMarkers.current).forEach(marker => marker.remove());
    vehicleMarkers.current = {};
    
    // Add real vehicles to map
    vehiclesFromDB.forEach(vehicle => {
      if (vehicle.lat && vehicle.lng) {
        addVehicleMarker(vehicle);
      }
    });
    
    // If a specific vehicle ID is provided, focus on that vehicle
    if (vehicleId) {
      const targetVehicle = vehiclesFromDB.find(v => v.id === vehicleId);
      if (targetVehicle && targetVehicle.lat && targetVehicle.lng && map.current) {
        map.current.flyTo({
          center: [targetVehicle.lng, targetVehicle.lat],
          zoom: 15,
          essential: true
        });
        
        // Open the popup for this vehicle
        if (vehicleMarkers.current[vehicleId]) {
          setTimeout(() => {
            vehicleMarkers.current[vehicleId].togglePopup();
          }, 1000);
        }
      }
    }
    
    // Set up location updates for tracked vehicles
    const updateInterval = setInterval(() => {
      vehiclesFromDB.forEach(vehicle => {
        if (vehicle.status === 'active' && vehicle.lat && vehicle.lng) {
          // Simulate small movements for active vehicles
          const jitter = 0.0005 * (Math.random() - 0.5);
          const newLat = vehicle.lat + jitter;
          const newLng = vehicle.lng + jitter;
          
          // Update vehicle position in database and marker
          vehicle.lat = newLat;
          vehicle.lng = newLng;
          updateVehicleMarker(vehicle);
          
          // Update location context
          updateVehicleLocation(vehicle.id, {
            vehicleId: vehicle.id,
            coordinates: { lat: newLat, lng: newLng },
            timestamp: new Date().toISOString(),
            speed: Math.floor(Math.random() * 60),
            heading: Math.floor(Math.random() * 360),
          });
        }
      });
    }, 5000); // Update every 5 seconds
    
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
