
import { TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Navigation, MapPin, CheckCircle2, History } from "lucide-react";
import { Link } from "react-router-dom";
import { VehicleQRModal } from "../VehicleQRModal";
import { Vehicle } from "../types/Vehicle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface VehicleActionsProps {
  vehicle: Vehicle;
  isTracked: boolean;
  handleTrack: () => void;
  onShowHealth: () => void;
  onShowHistory: () => void;
}

export function VehicleActions({ 
  vehicle, 
  isTracked, 
  handleTrack,
  onShowHealth,
  onShowHistory
}: VehicleActionsProps) {
  return (
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
        
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-1"
          onClick={onShowHealth}
        >
          <CheckCircle2 size={14} className="text-fleet-500" />
          <span className="hidden sm:inline">Health</span>
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-1"
          onClick={onShowHistory}
        >
          <History size={14} className="text-fleet-500" />
          <span className="hidden sm:inline">History</span>
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white">
            <DropdownMenuItem>View Details | Details anzeigen</DropdownMenuItem>
            <DropdownMenuItem>Show on Map | Auf Karte anzeigen</DropdownMenuItem>
            <DropdownMenuItem>Schedule Service | Wartung planen</DropdownMenuItem>
            <DropdownMenuItem>Reports | Berichte</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              Remove | Entfernen
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </TableCell>
  );
}
