
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// Bitte hier deinen eigenen Mapbox-Token einsetzen
// Dies ist ein Platzhalter und funktioniert nicht in der Produktion
const MAPBOX_TOKEN = "pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjbGVhcmx5LW5vdC1hLXJlYWwtdG9rZW4ifQ.clearly-not-a-real-token";

interface MapProps {
  className?: string;
}

export function MapComponent({ className }: MapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

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
    } catch (error) {
      console.error("Mapbox error:", error);
    }

    return () => {
      map.current?.remove();
    };
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
    </div>
  );
}
