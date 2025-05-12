
import { MutableRefObject, RefObject, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import { MapboxError } from "../types/map-types";

interface UseMapInitializationProps {
  mapContainer: RefObject<HTMLDivElement>;
  map: MutableRefObject<mapboxgl.Map | null>;
  setMapLoaded: (loaded: boolean) => void;
  mapboxToken: string;
  mapStyle: string;
  showTraffic: boolean;
  setTokenError: (error: string | null) => void;
  toast: any; // Using any for simplicity
  getUserLocation: () => void;
}

export function useMapInitialization({
  mapContainer,
  map,
  setMapLoaded,
  mapboxToken,
  mapStyle,
  showTraffic,
  setTokenError,
  toast,
  getUserLocation
}: UseMapInitializationProps) {
  const initializeMap = useCallback((token: string) => {
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
    } catch (error) {
      console.error("Mapbox error:", error);
      setTokenError("Failed to initialize map | ไม่สามารถเริ่มต้นแผนที่ได้");
    }
  }, [mapContainer, map, setMapLoaded, mapStyle, showTraffic, setTokenError, toast, getUserLocation]);

  const updateMapStyle = useCallback((style: string) => {
    if (map.current) {
      map.current.setStyle(`mapbox://styles/mapbox/${style}`);
    }
  }, [map]);

  const toggleTraffic = useCallback(() => {
    if (!map.current) return;
    
    const newShowTraffic = !showTraffic;
    
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
  }, [map, showTraffic]);

  const togglePOIs = useCallback(() => {
    if (!map.current) return;
    
    const newShowPOIs = !showTraffic;
    
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
  }, [map, showTraffic]);

  return {
    initializeMap,
    updateMapStyle,
    toggleTraffic,
    togglePOIs
  };
}
