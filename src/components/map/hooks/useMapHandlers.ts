import { useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import { useToast } from '@/hooks/use-toast';

interface UseMapHandlersProps {
  map: React.MutableRefObject<mapboxgl.Map | null>;
  userMarker: React.MutableRefObject<mapboxgl.Marker | null>;
  tracking: boolean;
  onLocationUpdate?: (coords: [number, number]) => void;
  getUserLocationHook: (callback: (coords: [number, number]) => void) => void;
  startLocationTracking: (callback: (coords: [number, number]) => void) => void;
}

export function useMapHandlers({
  map,
  userMarker,
  tracking,
  onLocationUpdate,
  getUserLocationHook,
  startLocationTracking
}: UseMapHandlersProps) {
  const { toast } = useToast();

  const getUserLocation = useCallback(() => {
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
  }, [map, userMarker, tracking, onLocationUpdate, getUserLocationHook, startLocationTracking]);

  return { getUserLocation };
}