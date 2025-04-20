
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { locate } from "lucide-react";
import { Button } from "./ui/button";

const MAPBOX_TOKEN = "pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjbGVhcmx5LW5vdC1hLXJlYWwtdG9rZW4ifQ.clearly-not-a-real-token";

interface MapProps {
  className?: string;
}

export function MapComponent({ className }: MapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const userMarker = useRef<mapboxgl.Marker | null>(null);

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

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;
    
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
  }, []);

  return (
    <div className={`relative h-full w-full rounded-md overflow-hidden ${className}`}>
      <div ref={mapContainer} className="h-full w-full" />
      
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <p className="text-lg text-fleet-500 font-medium mb-2">Kartenansicht</p>
            <p className="text-sm text-gray-500">
              Bitte füge einen gültigen Mapbox-Token hinzu, um die Karte anzuzeigen
            </p>
          </div>
        </div>
      )}

      <Button
        variant="secondary"
        size="icon"
        className="absolute bottom-4 right-4 z-10 bg-white shadow-lg hover:bg-gray-100"
        onClick={getUserLocation}
      >
        <locate className="h-4 w-4" />
      </Button>
    </div>
  );
}
