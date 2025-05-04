
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Locate } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Alert, AlertDescription } from "./ui/alert";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";

interface MapProps {
  className?: string;
}

export function MapComponent({ className }: MapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const userMarker = useRef<mapboxgl.Marker | null>(null);
  const watchPositionId = useRef<number | null>(null);
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  const [mapboxToken, setMapboxToken] = useState(
    localStorage.getItem('mapbox_token') || 
    'pk.eyJ1Ijoid3V0dGljIiwiYSI6ImNtOXBzNjF1cDE3ZnkyaXBxMWsyZjU1czUifQ.honrXxOPHxMySJUTb-syXyg'
  );

  const initializeMap = (token: string) => {
    if (!mapContainer.current || map.current) return;

    mapboxgl.accessToken = token;
    
    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [100.523186, 13.736717], // Bangkok as default
        zoom: 11
      });

      map.current.on('load', () => {
        setMapLoaded(true);
        toast({
          title: "Map loaded | แผนที่โหลดแล้ว",
          description: "Map is now ready to use | แผนที่พร้อมใช้งานแล้ว"
        });
        
        // Get initial user location after map is loaded
        getUserLocation();
      });

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
      
      // Add scale
      map.current.addControl(new mapboxgl.ScaleControl(), 'bottom-left');

      return () => {
        stopLocationTracking();
        map.current?.remove();
      };
    } catch (error) {
      console.error("Mapbox error:", error);
      setLocationError("Failed to initialize map | ไม่สามารถเริ่มต้นแผนที่ได้");
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
        setUserLocation([longitude, latitude]);
        setLocationError(null);
        
        if (userMarker.current) {
          userMarker.current.setLngLat([longitude, latitude]);
        } else if (map.current) {
          // Create new marker if it doesn't exist
          userMarker.current = new mapboxgl.Marker({ 
            color: '#FF0000',
            draggable: false
          })
          .setLngLat([longitude, latitude])
          .addTo(map.current);
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
        setUserLocation([longitude, latitude]);
        
        if (map.current) {
          map.current.flyTo({
            center: [longitude, latitude],
            zoom: 15,
            essential: true
          });

          // Update or create marker
          if (userMarker.current) {
            userMarker.current.setLngLat([longitude, latitude]);
          } else {
            userMarker.current = new mapboxgl.Marker({ 
              color: '#FF0000',
              draggable: false
            })
            .setLngLat([longitude, latitude])
            .addTo(map.current);
          }
        }
        
        // Start continuous tracking
        startLocationTracking();
        
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
    if (mapboxToken) {
      localStorage.setItem('mapbox_token', mapboxToken);
      initializeMap(mapboxToken);
    }
  };

  useEffect(() => {
    if (mapboxToken) {
      initializeMap(mapboxToken);
    }
    
    return () => {
      stopLocationTracking();
    };
  }, [mapboxToken]);

  return (
    <div className={`relative h-full w-full rounded-md overflow-hidden ${className}`}>
      {!mapboxToken ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 p-4 z-20">
          <p className="text-lg text-fleet-500 font-medium mb-4">Mapbox Token required | ต้องใช้ Mapbox Token</p>
          <div className="flex flex-col sm:flex-row gap-2 w-full max-w-md">
            <Input 
              placeholder="Enter your Mapbox Public Token | ใส่ Mapbox Public Token ของคุณ" 
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              className="flex-grow"
            />
            <Button 
              onClick={handleTokenSubmit}
              className="w-full sm:w-auto"
            >
              Save | บันทึก
            </Button>
          </div>
          <p className="mt-4 text-sm text-gray-600 text-center">
            You can find your Mapbox Public Token at mapbox.com | คุณสามารถหา Mapbox Public Token ของคุณได้ที่ mapbox.com
          </p>
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

          {locationError && (
            <div className="absolute top-4 left-4 right-4 z-10">
              <Alert variant="destructive">
                <AlertDescription>{locationError}</AlertDescription>
              </Alert>
            </div>
          )}
          
          <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-2">
            <Button
              variant="secondary"
              size="icon"
              className="bg-white shadow-lg hover:bg-gray-100"
              onClick={getUserLocation}
            >
              <Locate className="h-4 w-4" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
