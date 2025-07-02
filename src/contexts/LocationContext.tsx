
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

// Typdefinitionen für die Standortdaten
export interface Coordinates {
  lat: number;
  lng: number;
}

export interface LocationData {
  vehicleId: string;
  coordinates: Coordinates;
  timestamp: string;
  speed?: number;
  heading?: number;
  driverId?: string;
}

export interface LocationHistoryItem extends LocationData {
  id: string;
}

interface LocationContextType {
  // Aktuelle Standorte der Fahrzeuge
  vehicleLocations: Record<string, LocationData>;
  // Standortverlauf für Analysen
  locationHistory: LocationHistoryItem[];
  // Funktionen zur Verwaltung der Standortdaten
  updateVehicleLocation: (vehicleId: string, data: Partial<LocationData>) => void;
  getVehicleLocation: (vehicleId: string) => LocationData | undefined;
  startTrackingVehicle: (vehicleId: string) => void;
  stopTrackingVehicle: (vehicleId: string) => void;
  trackedVehicles: string[];
  clearLocationHistory: () => void;
  // Echte Fahrzeugdaten laden
  loadVehiclesFromDatabase: () => Promise<void>;
  vehiclesFromDB: any[];
  // Max 100 Einträge im Verlauf pro Fahrzeug
  maxHistoryPerVehicle: number;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [vehicleLocations, setVehicleLocations] = useState<Record<string, LocationData>>({});
  const [locationHistory, setLocationHistory] = useState<LocationHistoryItem[]>([]);
  const [trackedVehicles, setTrackedVehicles] = useState<string[]>([]);
  const [vehiclesFromDB, setVehiclesFromDB] = useState<any[]>([]);
  const maxHistoryPerVehicle = 100;
  const { toast } = useToast();

  // Beim Initialisieren Daten aus dem localStorage und der Datenbank laden
  useEffect(() => {
    const storedLocations = localStorage.getItem('vehicleLocations');
    const storedHistory = localStorage.getItem('locationHistory');
    const storedTrackedVehicles = localStorage.getItem('trackedVehicles');
    
    if (storedLocations) {
      setVehicleLocations(JSON.parse(storedLocations));
    }
    
    if (storedHistory) {
      setLocationHistory(JSON.parse(storedHistory));
    }
    
    if (storedTrackedVehicles) {
      setTrackedVehicles(JSON.parse(storedTrackedVehicles));
    }

    // Fahrzeugdaten aus der Datenbank laden
    loadVehiclesFromDatabase();
  }, []);

  // Fahrzeuge aus der Supabase-Datenbank laden
  const loadVehiclesFromDatabase = async () => {
    try {
      const { data: vehicles, error } = await supabase
        .from('vehicles')
        .select(`
          *,
          vehicle_assignments!inner(
            driver_id,
            active,
            drivers(name, status)
          )
        `)
        .eq('vehicle_assignments.active', true);

      if (error) {
        console.error('Error loading vehicles:', error);
        toast({
          title: "Fehler beim Laden der Fahrzeuge",
          description: "Fahrzeugdaten konnten nicht geladen werden.",
          variant: "destructive"
        });
        return;
      }

      console.log('Loaded vehicles from database:', vehicles);
      setVehiclesFromDB(vehicles || []);

      // Fahrzeugpositionen in LocationContext einpflegen
      if (vehicles) {
        vehicles.forEach(vehicle => {
          if (vehicle.lat && vehicle.lng) {
            const locationData: LocationData = {
              vehicleId: vehicle.id,
              coordinates: { lat: vehicle.lat, lng: vehicle.lng },
              timestamp: vehicle.updated_at || new Date().toISOString(),
              speed: Math.floor(Math.random() * 60), // Simulierte Geschwindigkeit
              heading: Math.floor(Math.random() * 360), // Simulierte Richtung
              driverId: vehicle.vehicle_assignments?.[0]?.driver_id
            };
            
            setVehicleLocations(prev => ({
              ...prev,
              [vehicle.id]: locationData
            }));
          }
        });
      }
    } catch (error) {
      console.error('Error in loadVehiclesFromDatabase:', error);
    }
  };

  // Fahrzeugstandort in der Datenbank aktualisieren
  const updateVehicleLocationInDB = async (vehicleId: string, coordinates: Coordinates) => {
    try {
      const { error } = await supabase
        .from('vehicles')
        .update({
          lat: coordinates.lat,
          lng: coordinates.lng,
          updated_at: new Date().toISOString()
        })
        .eq('id', vehicleId);

      if (error) {
        console.error('Error updating vehicle location in DB:', error);
      }
    } catch (error) {
      console.error('Error in updateVehicleLocationInDB:', error);
    }
  };

  // Fahrzeugstandort aktualisieren
  const updateVehicleLocation = (vehicleId: string, data: Partial<LocationData>) => {
    const timestamp = new Date().toISOString();
    
    setVehicleLocations(prev => {
      const existingData = prev[vehicleId] || { 
        vehicleId,
        coordinates: { lat: 0, lng: 0 },
        timestamp
      };
      
      const newData = {
        ...existingData,
        ...data,
        timestamp
      };
      
      const updated = {
        ...prev,
        [vehicleId]: newData
      };
      
      // Speichern im localStorage
      localStorage.setItem('vehicleLocations', JSON.stringify(updated));
      
      // In Datenbank aktualisieren wenn Koordinaten vorhanden
      if (newData.coordinates) {
        updateVehicleLocationInDB(vehicleId, newData.coordinates);
      }
      
      return updated;
    });
    
    // Zum Verlauf hinzufügen wenn das Fahrzeug verfolgt wird
    if (trackedVehicles.includes(vehicleId)) {
      setLocationHistory(prev => {
        const historyItem: LocationHistoryItem = {
          ...(data as LocationData),
          vehicleId,
          timestamp,
          id: `${vehicleId}-${Date.now()}`
        };
        
        // Verlauf pro Fahrzeug auf maxHistoryPerVehicle begrenzen
        const vehicleHistory = prev.filter(item => item.vehicleId === vehicleId);
        let newHistory = [...prev, historyItem];
        
        if (vehicleHistory.length >= maxHistoryPerVehicle) {
          // Älteste Einträge für dieses Fahrzeug entfernen
          const oldestEntries = vehicleHistory
            .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
            .slice(0, vehicleHistory.length - maxHistoryPerVehicle + 1)
            .map(item => item.id);
          
          newHistory = newHistory.filter(item => !oldestEntries.includes(item.id));
        }
        
        // Speichern im localStorage
        localStorage.setItem('locationHistory', JSON.stringify(newHistory));
        return newHistory;
      });
    }
  };

  // Fahrzeugstandort abrufen
  const getVehicleLocation = (vehicleId: string) => {
    return vehicleLocations[vehicleId];
  };

  // Fahrzeug-Tracking starten
  const startTrackingVehicle = (vehicleId: string) => {
    if (!trackedVehicles.includes(vehicleId)) {
      const updated = [...trackedVehicles, vehicleId];
      setTrackedVehicles(updated);
      localStorage.setItem('trackedVehicles', JSON.stringify(updated));
    }
  };

  // Fahrzeug-Tracking stoppen
  const stopTrackingVehicle = (vehicleId: string) => {
    const updated = trackedVehicles.filter(id => id !== vehicleId);
    setTrackedVehicles(updated);
    localStorage.setItem('trackedVehicles', JSON.stringify(updated));
  };

  // Verlauf löschen
  const clearLocationHistory = () => {
    setLocationHistory([]);
    localStorage.removeItem('locationHistory');
  };

  return (
    <LocationContext.Provider
      value={{
        vehicleLocations,
        locationHistory,
        updateVehicleLocation,
        getVehicleLocation,
        startTrackingVehicle,
        stopTrackingVehicle,
        trackedVehicles,
        clearLocationHistory,
        loadVehiclesFromDatabase,
        vehiclesFromDB,
        maxHistoryPerVehicle
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};
