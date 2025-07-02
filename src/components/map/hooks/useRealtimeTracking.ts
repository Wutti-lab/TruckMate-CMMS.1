
import { useState, useEffect, useRef } from 'react';
import { useLocation } from '@/contexts/LocationContext';

interface TrackingData {
  vehicleId: string;
  coordinates: { lat: number; lng: number };
  speed: number;
  heading: number;
  timestamp: string;
  status: 'active' | 'idle' | 'offline';
}

export function useRealtimeTracking() {
  const [trackingData, setTrackingData] = useState<TrackingData[]>([]);
  const [isTracking, setIsTracking] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout>();
  const { vehiclesFromDB, updateVehicleLocation } = useLocation();

  const startRealtimeTracking = () => {
    setIsTracking(true);
    
    intervalRef.current = setInterval(() => {
      // Simulate real-time updates for existing vehicles
      vehiclesFromDB.forEach(vehicle => {
        if (vehicle.lat && vehicle.lng) {
          // Simulate small movements
          const latOffset = (Math.random() - 0.5) * 0.001;
          const lngOffset = (Math.random() - 0.5) * 0.001;
          
          const updatedData: TrackingData = {
            vehicleId: vehicle.id,
            coordinates: {
              lat: vehicle.lat + latOffset,
              lng: vehicle.lng + lngOffset
            },
            speed: Math.floor(Math.random() * 80),
            heading: Math.floor(Math.random() * 360),
            timestamp: new Date().toISOString(),
            status: Math.random() > 0.1 ? 'active' : 'idle'
          };

          // Update the location context
          updateVehicleLocation(vehicle.id, {
            vehicleId: vehicle.id,
            coordinates: updatedData.coordinates,
            timestamp: updatedData.timestamp,
            speed: updatedData.speed,
            heading: updatedData.heading
          });

          setTrackingData(prev => {
            const filtered = prev.filter(item => item.vehicleId !== vehicle.id);
            return [...filtered, updatedData];
          });
        }
      });
    }, 3000); // Update every 3 seconds
  };

  const stopRealtimeTracking = () => {
    setIsTracking(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const getVehicleStatus = (vehicleId: string): TrackingData | undefined => {
    return trackingData.find(data => data.vehicleId === vehicleId);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    trackingData,
    isTracking,
    startRealtimeTracking,
    stopRealtimeTracking,
    getVehicleStatus
  };
}
