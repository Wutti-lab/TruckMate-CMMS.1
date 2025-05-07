
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

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
  // Max 100 Einträge im Verlauf pro Fahrzeug
  maxHistoryPerVehicle: number;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [vehicleLocations, setVehicleLocations] = useState<Record<string, LocationData>>({});
  const [locationHistory, setLocationHistory] = useState<LocationHistoryItem[]>([]);
  const [trackedVehicles, setTrackedVehicles] = useState<string[]>([]);
  const maxHistoryPerVehicle = 100;

  // Beim Initialisieren Daten aus dem localStorage laden
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
  }, []);

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
