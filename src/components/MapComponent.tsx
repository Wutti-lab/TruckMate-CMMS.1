
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Locate } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface MapProps {
  className?: string;
}

export function MapComponent({ className }: MapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const userMarker = useRef<mapboxgl.Marker | null>(null);
  const [mapboxToken, setMapboxToken] = useState(localStorage.getItem('mapbox_token') || '');

  const initializeMap = (token: string) => {
    if (!mapContainer.current || map.current) return;

    mapboxgl.accessToken = token;
    
    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [13.404954, 52.520008], // Berlin
        zoom: 11
      });

      map.current.on('load', () => {
        setMapLoaded(true);
      });

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

      // Get initial user location
      getUserLocation();

      // Watch user position
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([longitude, latitude]);
          
          if (userMarker.current) {
            userMarker.current.setLngLat([longitude, latitude]);
          }
        },
        (error) => {
          console.error("Error watching location:", error);
        }
      );

      return () => {
        navigator.geolocation.clearWatch(watchId);
        map.current?.remove();
      };
    } catch (error) {
      console.error("Mapbox error:", error);
    }
  };

  const getUserLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([longitude, latitude]);

          if (map.current) {
            map.current.flyTo({
              center: [longitude, latitude],
              zoom: 15
            });

            // Update or create marker
            if (!userMarker.current) {
              userMarker.current = new mapboxgl.Marker({ color: '#FF0000' })
                .setLngLat([longitude, latitude])
                .addTo(map.current);
            } else {
              userMarker.current.setLngLat([longitude, latitude]);
            }
          }
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
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
  }, [mapboxToken]);

  return (
    <div className={`relative h-full w-full rounded-md overflow-hidden ${className}`}>
      {!mapboxToken ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 p-4 z-20">
          <p className="text-lg text-fleet-500 font-medium mb-4">Mapbox Token erforderlich</p>
          <div className="flex gap-2 w-full max-w-md">
            <Input 
              placeholder="Geben Sie Ihren Mapbox Public Token ein" 
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              className="flex-grow"
            />
            <Button onClick={handleTokenSubmit}>
              Speichern
            </Button>
          </div>
          <p className="mt-4 text-sm text-gray-600 text-center">
            Sie können Ihren Mapbox Public Token unter mapbox.com finden
          </p>
        </div>
      ) : (
        <>
          <div ref={mapContainer} className="h-full w-full" />
          
          {!mapLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="text-center">
                <p className="text-lg text-fleet-500 font-medium mb-2">Kartenansicht</p>
                <p className="text-sm text-gray-500">Karte wird geladen...</p>
              </div>
            </div>
          )}

          <Button
            variant="secondary"
            size="icon"
            className="absolute bottom-4 right-4 z-10 bg-white shadow-lg hover:bg-gray-100"
            onClick={getUserLocation}
          >
            <Locate className="h-4 w-4" />
          </Button>
        </>
      )}
    </div>
  );
}
