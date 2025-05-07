
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Battery,
  Calendar,
  Car,
  Fuel,
  MapPin,
  MoreHorizontal,
  Thermometer,
  Navigation
} from "lucide-react";
import { VehicleQRModal } from "./VehicleQRModal";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "@/contexts/LocationContext";

interface Vehicle {
  id: string;
  driver: string;
  model: string;
  location: string;
  status: string;
  fuelLevel: number;
  batteryLevel: number;
  lastService: string;
  nextService: string;
  engineTemp: number;
  coordinates?: {
    lat: number;
    lng: number;
  };
  lastUpdated?: string;
}

interface VehicleTableRowProps {
  vehicle: Vehicle;
}

export function VehicleTableRow({ vehicle }: VehicleTableRowProps) {
  const [showLocation, setShowLocation] = useState(false);
  const { toast } = useToast();
  const { startTrackingVehicle, trackedVehicles } = useLocation();
  
  const isTracked = trackedVehicles.includes(vehicle.id);

  const handleTrack = () => {
    if (!vehicle.coordinates) {
      toast({
        title: "No GPS data | Keine GPS-Daten",
        description: "This vehicle doesn't have GPS tracking enabled | Dieses Fahrzeug hat kein GPS-Tracking aktiviert",
        variant: "destructive"
      });
      return;
    }
    
    // Show coordinates directly in the row
    setShowLocation(!showLocation);
    
    // Beginne das Tracking dieses Fahrzeugs
    startTrackingVehicle(vehicle.id);
    
    // Speichere die ID für die Kartenansicht
    localStorage.setItem('trackVehicleId', vehicle.id);
    
    toast({
      title: "GPS-Tracking aktiviert | GPS tracking enabled",
      description: "Die Standortdaten werden jetzt aufgezeichnet | Location data is now being recorded",
      variant: "default"
    });
  };

  return (
    <TableRow>
      <TableCell className="font-medium">
        <div className="flex items-center gap-2">
          <Car size={16} className="text-fleet-500" />
          {vehicle.id}
        </div>
      </TableCell>
      <TableCell>{vehicle.driver}</TableCell>
      <TableCell>{vehicle.model}</TableCell>
      <TableCell>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <MapPin size={14} className="text-muted-foreground" />
            {vehicle.location}
          </div>
          
          {showLocation && vehicle.coordinates && (
            <div className="text-xs font-mono mt-1 text-muted-foreground">
              GPS: {vehicle.coordinates.lat.toFixed(6)}°, {vehicle.coordinates.lng.toFixed(6)}°
              {vehicle.lastUpdated && <div>Updated: {vehicle.lastUpdated}</div>}
            </div>
          )}
        </div>
      </TableCell>
      <TableCell>
        <Badge
          variant="outline"
          className={
            vehicle.status === "Active"
              ? "border-green-200 bg-green-50 text-green-600"
              : vehicle.status === "Inactive"
              ? "border-gray-200 bg-gray-50 text-gray-600"
              : "border-orange-200 bg-orange-50 text-orange-600"
          }
        >
          {vehicle.status}
        </Badge>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-3 w-32">
          {vehicle.fuelLevel > 0 ? (
            <div className="flex items-center gap-1">
              <Fuel size={14} className="text-muted-foreground" />
              <span>{vehicle.fuelLevel}%</span>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <Battery size={14} className="text-muted-foreground" />
              <span>{vehicle.batteryLevel}%</span>
            </div>
          )}
          <div className="w-full bg-gray-200 h-1.5 rounded-full">
            <div
              className={`h-1.5 rounded-full ${
                (vehicle.fuelLevel || vehicle.batteryLevel) > 50
                  ? "bg-green-500"
                  : (vehicle.fuelLevel || vehicle.batteryLevel) > 25
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
              style={{
                width: `${vehicle.fuelLevel || vehicle.batteryLevel}%`,
              }}
            ></div>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-1">
          <Thermometer
            size={16}
            className={
              vehicle.engineTemp > 90
                ? "text-red-500"
                : vehicle.engineTemp > 85
                ? "text-yellow-500"
                : "text-blue-500"
            }
          />
          <span>{vehicle.engineTemp}°C</span>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-1">
          <Calendar size={14} className="text-muted-foreground" />
          {vehicle.nextService}
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <VehicleQRModal vehicle={vehicle} />
          
          <Button 
            variant="outline" 
            size="sm" 
            className={`flex items-center gap-1 ${isTracked ? "border-green-500" : ""}`}
            onClick={handleTrack}
          >
            <Navigation size={14} className={vehicle.coordinates ? (isTracked ? "text-green-500" : "text-fleet-500") : "text-gray-400"} />
            <span className="hidden sm:inline">GPS</span>
          </Button>
          
          <Link to={`/map?vehicle=${vehicle.id}`}>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <MapPin size={14} className="text-fleet-500" />
              <span className="hidden sm:inline">Track</span>
            </Button>
          </Link>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white">
              <DropdownMenuItem>View Details | ดูรายละเอียด</DropdownMenuItem>
              <DropdownMenuItem>Show on Map | แสดงบนแผนที่</DropdownMenuItem>
              <DropdownMenuItem>Schedule Service | กำหนดการซ่อมบำรุง</DropdownMenuItem>
              <DropdownMenuItem>Reports | รายงาน</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                Remove | ลบ
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </TableCell>
    </TableRow>
  );
}
