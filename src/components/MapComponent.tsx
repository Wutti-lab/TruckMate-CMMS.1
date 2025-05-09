
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Locate, AlertTriangle, Map, Navigation, Route, Layers } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";
import { Toggle } from "./ui/toggle";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface MapProps {
  className?: string;
  tracking?: boolean;
  onLocationUpdate?: (coords: [number, number]) => void;
  vehicleId?: string;
}

// Extend the Error interface to include the status property
interface MapboxError extends Error {
  status?: number;
}

export function MapComponent({ className, tracking = false, onLocationUpdate, vehicleId }: MapProps) {
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

  const mapStyles = {
    'streets-v11': 'Streets',
    'satellite-v9': 'Satellite',
    'light-v10': 'Light',
    'dark-v10': 'Dark',
    'outdoors-v11': 'Outdoors',
  };

  const initializeMap = (token: string) => {
    if (!mapContainer.current || map.current) return;
    
    if (!token.trim()) {
      setTokenError("Please enter a valid Mapbox token | กรุณาใส่ Mapbox token ที่ถูกต้อง");
      return;
    }

    setTokenError(null);
    mapboxgl.accessToken = token;
    
    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: `mapbox://styles/mapbox/${mapStyle}`,
        center: [100.523186, 13.736717], // Bangkok as default
        zoom: 11,
        attributionControl: false
      });

      map.current.on('load', () => {
        setMapLoaded(true);
        toast({
          title: "Map loaded | แผนที่โหลดแล้ว",
          description: "Map is now ready to use | แผนที่พร้อมใช้งานแล้ว"
        });
        
        // Add traffic layer if selected
        if (showTraffic && map.current) {
          map.current.addSource('traffic', {
            'type': 'vector',
            'url': 'mapbox://mapbox.mapbox-traffic-v1'
          });
          
          map.current.addLayer({
            'id': 'traffic-layer',
            'type': 'line',
            'source': 'traffic',
            'source-layer': 'traffic',
            'paint': {
              'line-width': 2,
              'line-color': [
                'match',
                ['get', 'congestion'],
                'low', '#4BAE4F',
                'moderate', '#FFAB00',
                'heavy', '#F2594D',
                'severe', '#9C1912',
                '#4BAE4F'
              ]
            }
          });
        }
        
        // Get initial user location after map is loaded
        getUserLocation();
      });
      
      map.current.on('error', (e) => {
        console.error("Mapbox error:", e);
        
        // Check if the error is related to authentication
        // Use type assertion to access potential status property
        const mapboxError = e.error as MapboxError;
        if (mapboxError && (mapboxError.status === 401 || mapboxError.message?.includes('access token'))) {
          setTokenError("Invalid Mapbox token. Please check your token and try again. | Mapbox token ไม่ถูกต้อง กรุณาตรวจสอบ token ของคุณและลองอีกครั้ง");
          localStorage.removeItem('mapbox_token');
          setIsSettingToken(true);
          if (map.current) {
            map.current.remove();
            map.current = null;
          }
          setMapLoaded(false);
        }
      });

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
      
      // Add scale
      map.current.addControl(new mapboxgl.ScaleControl(), 'bottom-left');
      
      // Add attribution
      map.current.addControl(new mapboxgl.AttributionControl({
        compact: true
      }));

      return () => {
        stopLocationTracking();
        map.current?.remove();
      };
    } catch (error) {
      console.error("Mapbox error:", error);
      setLocationError("Failed to initialize map | ไม่สามารถเริ่มต้นแผนที่ได้");
    }
  };

  const updateMapStyle = (style: string) => {
    if (map.current) {
      map.current.setStyle(`mapbox://styles/mapbox/${style}`);
      setMapStyle(style);
    }
  };

  const toggleTraffic = () => {
    if (!map.current) return;
    
    const newShowTraffic = !showTraffic;
    setShowTraffic(newShowTraffic);
    
    if (newShowTraffic) {
      // Check if the source already exists to avoid errors
      if (!map.current.getSource('traffic')) {
        map.current.addSource('traffic', {
          'type': 'vector',
          'url': 'mapbox://mapbox.mapbox-traffic-v1'
        });
        
        map.current.addLayer({
          'id': 'traffic-layer',
          'type': 'line',
          'source': 'traffic',
          'source-layer': 'traffic',
          'paint': {
            'line-width': 2,
            'line-color': [
              'match',
              ['get', 'congestion'],
              'low', '#4BAE4F',
              'moderate', '#FFAB00',
              'heavy', '#F2594D',
              'severe', '#9C1912',
              '#4BAE4F'
            ]
          }
        });
      } else if (!map.current.getLayer('traffic-layer')) {
        map.current.addLayer({
          'id': 'traffic-layer',
          'type': 'line',
          'source': 'traffic',
          'source-layer': 'traffic',
          'paint': {
            'line-width': 2,
            'line-color': [
              'match',
              ['get', 'congestion'],
              'low', '#4BAE4F',
              'moderate', '#FFAB00',
              'heavy', '#F2594D',
              'severe', '#9C1912',
              '#4BAE4F'
            ]
          }
        });
      }
    } else {
      if (map.current.getLayer('traffic-layer')) {
        map.current.removeLayer('traffic-layer');
      }
    }
  };

  const togglePOIs = () => {
    if (!map.current) return;
    
    const newShowPOIs = !showPOIs;
    setShowPOIs(newShowPOIs);
    
    // Update POI visibility
    const layers = map.current.getStyle().layers;
    if (layers) {
      for (const layer of layers) {
        if (layer.id.includes('poi') || layer.id.includes('label')) {
          map.current.setLayoutProperty(
            layer.id, 
            'visibility', 
            newShowPOIs ? 'visible' : 'none'
          );
        }
      }
    }
  };

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

  const getUserLocation = () => {
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
  };

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
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 p-4 z-20">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex items-center gap-2 mb-4">
              <Map className="h-6 w-6 text-fleet-500" />
              <h2 className="text-xl font-bold text-fleet-500">Mapbox Token Required</h2>
            </div>
            
            {tokenError && (
              <Alert variant="destructive" className="mb-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{tokenError}</AlertDescription>
              </Alert>
            )}
            
            <p className="mb-4 text-gray-600">
              To use the map functionality, you need to provide a valid Mapbox public access token.
            </p>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="mapbox-token" className="block text-sm font-medium text-gray-700 mb-1">
                  Mapbox Public Token | Mapbox Public Token
                </label>
                <Input 
                  id="mapbox-token"
                  placeholder="Enter your Mapbox Public Token | ใส่ Mapbox Public Token ของคุณ" 
                  value={mapboxToken}
                  onChange={(e) => setMapboxToken(e.target.value)}
                  className="flex-grow"
                />
              </div>
              
              <Button 
                onClick={handleTokenSubmit}
                className="w-full bg-fleet-500 hover:bg-fleet-600"
              >
                Save & Load Map | บันทึกและโหลดแผนที่
              </Button>
            </div>
            
            <div className="mt-6">
              <p className="text-sm text-gray-500 text-center">
                You can find your Mapbox public token at{" "}
                <a 
                  href="https://account.mapbox.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-fleet-500 hover:underline"
                >
                  account.mapbox.com
                </a>
              </p>
              <p className="text-sm text-gray-500 text-center mt-1">
                Go to "Access tokens" section in your Mapbox account.
              </p>
            </div>
          </div>
        </div>
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

          {tokenError && (
            <div className="absolute top-4 left-4 right-4 z-10">
              <Alert variant="destructive">
                <AlertDescription className="flex justify-between items-center">
                  <span>{tokenError}</span>
                  <Button size="sm" variant="outline" onClick={resetToken}>
                    Reset Token | รีเซ็ต Token
                  </Button>
                </AlertDescription>
              </Alert>
            </div>
          )}

          {locationError && !tokenError && (
            <div className="absolute top-4 left-4 right-4 z-10">
              <Alert variant="destructive">
                <AlertDescription>{locationError}</AlertDescription>
              </Alert>
            </div>
          )}
          
          <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
            <Select value={mapStyle} onValueChange={updateMapStyle}>
              <SelectTrigger className="w-36 bg-white">
                <SelectValue placeholder="Map Style" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(mapStyles).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <div className="flex gap-1">
              <Toggle
                pressed={showTraffic}
                onPressedChange={toggleTraffic}
                className="flex-1 bg-white shadow-lg hover:bg-gray-100 data-[state=on]:bg-fleet-100 data-[state=on]:text-fleet-700"
                title="Toggle Traffic"
              >
                <Route className="h-4 w-4 mr-1" />
                Traffic
              </Toggle>
              
              <Toggle
                pressed={showPOIs}
                onPressedChange={togglePOIs}
                className="flex-1 bg-white shadow-lg hover:bg-gray-100 data-[state=on]:bg-fleet-100 data-[state=on]:text-fleet-700"
                title="Toggle POIs"
              >
                <Layers className="h-4 w-4 mr-1" />
                POIs
              </Toggle>
            </div>
          </div>
          
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
        </>
      )}
    </div>
  );
}
