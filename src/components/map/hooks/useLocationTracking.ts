
import { useState, useRef, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

export function useLocationTracking() {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const watchPositionId = useRef<number | null>(null);
  const { toast } = useToast();

  const handleLocationError = useCallback((error: GeolocationPositionError) => {
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
  }, []);

  const stopLocationTracking = useCallback(() => {
    if (watchPositionId.current !== null) {
      navigator.geolocation.clearWatch(watchPositionId.current);
      watchPositionId.current = null;
    }
  }, []);

  const startLocationTracking = useCallback((onLocationUpdate?: (coords: [number, number]) => void) => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser | เบราว์เซอร์ของคุณไม่รองรับการระบุตำแหน่ง");
      return;
    }

    stopLocationTracking();
    
    watchPositionId.current = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const coords: [number, number] = [longitude, latitude];
        setUserLocation(coords);
        setLocationError(null);
        
        if (onLocationUpdate) {
          onLocationUpdate(coords);
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
  }, [stopLocationTracking, handleLocationError]);

  const getUserLocation = useCallback((onLocationUpdate?: (coords: [number, number]) => void) => {
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
        
        if (onLocationUpdate) {
          onLocationUpdate(coords);
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
  }, [toast, handleLocationError]);

  return {
    userLocation,
    locationError,
    startLocationTracking,
    stopLocationTracking,
    getUserLocation
  };
}
