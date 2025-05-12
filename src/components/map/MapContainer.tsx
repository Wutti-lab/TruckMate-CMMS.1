import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";
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

  // Add a vehicle marker to the map
  const addVehicleMarker = (id: string, position: [number, number], details: any) => {
    if (!map.current) return;
    
    // Remove existing marker if it exists
    if (vehicleMarkers.current[id]) {
      vehicleMarkers.current[id].remove();
    }
    
    // Create a custom element for the marker
    const el = document.createElement('div');
    el.className = 'vehicle-marker';
    el.style.width = '30px';
    el.style.height = '30px';
    el.style.borderRadius = '50%';
    el.style.backgroundColor = details.status === 'Active' ? '#10B981' : 
                              details.status === 'Inactive' ? '#6B7280' : '#F59E0B';
    el.style.border = '2px solid white';
    el.style.display = 'flex';
    el.style.justifyContent = 'center';
    el.style.alignItems = 'center';
    el.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
    el.style.cursor = 'pointer';
    el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-truck" style="color: white;"><path d="M10 17h4V5H2v12h3"></path><path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5v8h1"></path><circle cx="7.5" cy="17.5" r="2.5"></circle><circle cx="17.5" cy="17.5" r="2.5"></circle></svg>`;
    
    // Create popup for the marker
    const popup = new mapboxgl.Popup({ offset: 25 })
      .setHTML(`
        <div style="font-family: system-ui, sans-serif; padding: 10px;">
          <h3 style="margin: 0 0 10px 0; font-weight: 600;">${id}</h3>
          <p style="margin: 5px 0;"><strong>Driver:</strong> ${details.driver || 'N/A'}</p>
          <p style="margin: 5px 0;"><strong>Status:</strong> ${details.status || 'N/A'}</p>
          <p style="margin: 5px 0;"><strong>Speed:</strong> ${details.speed || '0'} km/h</p>
        </div>
      `);
    
    // Create the marker
    const marker = new mapboxgl.Marker(el)
      .setLngLat(position)
      .setPopup(popup)
      .addTo(map.current);
    
    vehicleMarkers.current[id] = marker;
    
    return marker;
  };
  
  // Update a vehicle marker's position
  const updateVehicleMarker = (id: string, position: [number, number], details?: any) => {
    if (vehicleMarkers.current[id]) {
      vehicleMarkers.current[id].setLngLat(position);
      
      if (details) {
        // Update the popup content if details are provided
        const popup = vehicleMarkers.current[id].getPopup();
        popup.setHTML(`
          <div style="font-family: system-ui, sans-serif; padding: 10px;">
            <h3 style="margin: 0 0 10px 0; font-weight: 600;">${id}</h3>
            <p style="margin: 5px 0;"><strong>Driver:</strong> ${details.driver || 'N/A'}</p>
            <p style="margin: 5px 0;"><strong>Status:</strong> ${details.status || 'N/A'}</p>
            <p style="margin: 5px 0;"><strong>Speed:</strong> ${details.speed || '0'} km/h</p>
          </div>
        `);
      }
    } else {
      // Create new marker if it doesn't exist
      addVehicleMarker(id, position, details || { status: 'Active' });
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

  // Add sample vehicles for demo (remove in production)
  useEffect(() => {
    if (!mapLoaded || !map.current) return;
    
    const demoVehicles = [
      { id: "B-FR-123", position: [100.513, 13.732], details: { driver: "Max Müller", status: "Active", speed: "45" } },
      { id: "B-FR-234", position: [100.533, 13.746], details: { driver: "Lisa Schmidt", status: "Inactive", speed: "0" } },
      { id: "B-FR-345", position: [100.523, 13.756], details: { driver: "Jan Weber", status: "Maintenance", speed: "0" } },
      { id: "B-FR-456", position: [100.543, 13.726], details: { driver: "Anna Becker", status: "Active", speed: "32" } }
    ];
    
    demoVehicles.forEach(vehicle => {
      addVehicleMarker(vehicle.id, vehicle.position as [number, number], vehicle.details);
    });
    
    // If a specific vehicle ID is provided, focus on that vehicle
    if (vehicleId) {
      const targetVehicle = demoVehicles.find(v => v.id === vehicleId);
      if (targetVehicle && map.current) {
        map.current.flyTo({
          center: targetVehicle.position as [number, number],
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
    
    // Simulate vehicle movement for demo
    const interval = setInterval(() => {
      demoVehicles.forEach(vehicle => {
        if (vehicle.details.status === "Active") {
          const jitter = 0.001 * (Math.random() - 0.5);
          vehicle.position[0] += jitter;
          vehicle.position[1] += jitter;
          updateVehicleMarker(vehicle.id, vehicle.position as [number, number], vehicle.details);
        }
      });
    }, 3000);
    
    return () => clearInterval(interval);
  }, [mapLoaded, vehicleId]);

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
                <p className="text-lg text-fleet-500 font-medium mb-2">Map View | มุมมองแผนที่</p>
                <p className="text-sm text-gray-500">Loading map... | กำลังโหลดแผนที่...</p>
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
