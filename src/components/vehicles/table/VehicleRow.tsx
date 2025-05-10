
import { TableCell, TableRow } from "@/components/ui/table";
import { Vehicle } from "../types/Vehicle";
import { VehicleIdentifier } from "./VehicleIdentifier";
import { VehicleLocation } from "./VehicleLocation";
import { VehicleStatus } from "./VehicleStatus";
import { VehiclePower } from "./VehiclePower";
import { VehicleTemperature } from "./VehicleTemperature";
import { VehicleService } from "./VehicleService";
import { VehicleActions } from "./VehicleActions";
import { useState } from "react";
import { VehicleHealthDialog } from "../dialogs/VehicleHealthDialog";
import { VehicleHistoryDialog } from "../dialogs/VehicleHistoryDialog";
import { useLocation } from "@/contexts/LocationContext";
import { useToast } from "@/hooks/use-toast";

interface VehicleRowProps {
  vehicle: Vehicle;
}

export function VehicleRow({ vehicle }: VehicleRowProps) {
  const [showLocation, setShowLocation] = useState(false);
  const [showHealthDialog, setShowHealthDialog] = useState(false);
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);
  const { toast } = useToast();
  const { startTrackingVehicle, trackedVehicles } = useLocation();
  
  const isTracked = trackedVehicles.includes(vehicle.id);
  const needsMaintenance = vehicle.engineTemp > 90 || 
    (vehicle.batteryLevel && vehicle.batteryLevel < 20) ||
    (vehicle.fuelLevel && vehicle.fuelLevel < 15);

  const handleTrack = () => {
    if (!vehicle.coordinates) {
      // Add simulated coordinates for demo purposes
      vehicle.coordinates = {
        lat: 13.736717 + (Math.random() * 0.1 - 0.05),
        lng: 100.523186 + (Math.random() * 0.1 - 0.05)
      };
      vehicle.lastUpdated = new Date().toLocaleTimeString();
    }
    
    // Show coordinates directly in the row
    setShowLocation(!showLocation);
    
    // Begin tracking this vehicle
    startTrackingVehicle(vehicle.id);
    
    // Save the ID for map view
    localStorage.setItem('trackVehicleId', vehicle.id);
    
    toast({
      title: "GPS Tracking enabled | GPS-Tracking aktiviert",
      description: "Location data is now being recorded | Standortdaten werden jetzt aufgezeichnet",
      variant: "default"
    });
  };

  return (
    <TableRow>
      <VehicleIdentifier vehicle={vehicle} needsMaintenance={needsMaintenance} />
      <TableCell>{vehicle.driver}</TableCell>
      <TableCell>{vehicle.model}</TableCell>
      <VehicleLocation 
        vehicle={vehicle} 
        showLocation={showLocation} 
      />
      <VehicleStatus status={vehicle.status} />
      <VehiclePower 
        fuelLevel={vehicle.fuelLevel} 
        batteryLevel={vehicle.batteryLevel} 
      />
      <VehicleTemperature temperature={vehicle.engineTemp} />
      <VehicleService nextService={vehicle.nextService} />
      <VehicleActions
        vehicle={vehicle}
        isTracked={isTracked}
        handleTrack={handleTrack}
        onShowHealth={() => setShowHealthDialog(true)}
        onShowHistory={() => setShowHistoryDialog(true)}
      />

      <VehicleHealthDialog 
        vehicle={vehicle} 
        open={showHealthDialog} 
        onOpenChange={setShowHealthDialog} 
      />

      <VehicleHistoryDialog
        vehicle={vehicle}
        open={showHistoryDialog}
        onOpenChange={setShowHistoryDialog}
      />
    </TableRow>
  );
}
