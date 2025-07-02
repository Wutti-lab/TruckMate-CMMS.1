
import { useEffect, useRef } from 'react';
import { useLocation } from '@/contexts/LocationContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface GPSDataManagerProps {
  isActive: boolean;
  vehicleId?: string;
}

export function GPSDataManager({ isActive, vehicleId }: GPSDataManagerProps) {
  const { updateVehicleLocation, vehiclesFromDB, loadVehiclesFromDatabase } = useLocation();
  const { toast } = useToast();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Echte GPS-Daten von Navigator API abrufen
  const getCurrentGPSPosition = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation not supported'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        resolve,
        reject,
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000 // Cache für 1 Minute
        }
      );
    });
  };

  // GPS-Position in Datenbank speichern
  const saveGPSToDatabase = async (vehicleId: string, lat: number, lng: number) => {
    try {
      const { error } = await supabase
        .from('vehicles')
        .update({
          lat: lat,
          lng: lng,
          location: `${lat.toFixed(6)}, ${lng.toFixed(6)}`,
          updated_at: new Date().toISOString()
        })
        .eq('id', vehicleId);

      if (error) {
        console.error('Error saving GPS data:', error);
        throw error;
      }

      console.log(`GPS data saved for vehicle ${vehicleId}:`, { lat, lng });
    } catch (error) {
      console.error('Failed to save GPS data:', error);
      toast({
        title: "GPS-Daten Fehler",
        description: "Konnte GPS-Position nicht speichern",
        variant: "destructive"
      });
    }
  };

  // Simuliere GPS-Updates für Demo-Zwecke (falls echte GPS nicht verfügbar)
  const simulateGPSUpdates = () => {
    if (!vehiclesFromDB.length) return;

    vehiclesFromDB.forEach(async (vehicle) => {
      if (vehicle.status === 'active' && vehicle.lat && vehicle.lng) {
        // Kleine zufällige Bewegung simulieren
        const latJitter = (Math.random() - 0.5) * 0.001; // ~100m Radius
        const lngJitter = (Math.random() - 0.5) * 0.001;
        
        const newLat = vehicle.lat + latJitter;
        const newLng = vehicle.lng + lngJitter;

        // Position in Context aktualisieren
        updateVehicleLocation(vehicle.id, {
          vehicleId: vehicle.id,
          coordinates: { lat: newLat, lng: newLng },
          timestamp: new Date().toISOString(),
          speed: Math.floor(Math.random() * 60) + 20, // 20-80 km/h
          heading: Math.floor(Math.random() * 360)
        });

        // In Datenbank speichern
        await saveGPSToDatabase(vehicle.id, newLat, newLng);
      }
    });
  };

  // Echte GPS-Position abrufen und speichern
  const updateRealGPSPosition = async () => {
    if (!vehicleId) return;

    try {
      const position = await getCurrentGPSPosition();
      const { latitude, longitude } = position.coords;

      // Position in Context aktualisieren
      updateVehicleLocation(vehicleId, {
        vehicleId: vehicleId,
        coordinates: { lat: latitude, lng: longitude },
        timestamp: new Date().toISOString(),
        speed: position.coords.speed ? Math.round(position.coords.speed * 3.6) : undefined, // m/s zu km/h
        heading: position.coords.heading || undefined
      });

      // In Datenbank speichern
      await saveGPSToDatabase(vehicleId, latitude, longitude);

      console.log(`Real GPS updated for vehicle ${vehicleId}:`, { latitude, longitude });
    } catch (error) {
      console.error('Error getting real GPS position:', error);
      // Fallback auf simulierte Daten
      simulateGPSUpdates();
    }
  };

  // GPS-Updates starten/stoppen
  useEffect(() => {
    if (isActive) {
      // Initialer Update
      if (vehicleId) {
        updateRealGPSPosition();
      } else {
        simulateGPSUpdates();
      }

      // Regelmäßige Updates alle 10 Sekunden
      intervalRef.current = setInterval(() => {
        if (vehicleId) {
          updateRealGPSPosition();
        } else {
          simulateGPSUpdates();
        }
      }, 10000);

      toast({
        title: "GPS-Tracking aktiviert",
        description: vehicleId 
          ? `Echte GPS-Daten für Fahrzeug ${vehicleId}` 
          : "Simulierte GPS-Daten für alle aktiven Fahrzeuge"
      });
    } else {
      // Updates stoppen
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, vehicleId, vehiclesFromDB]);

  // Fahrzeugdaten neu laden wenn Component mounted wird
  useEffect(() => {
    loadVehiclesFromDatabase();
  }, []);

  return null; // Diese Komponente rendert nichts, sie verwaltet nur GPS-Daten
}
