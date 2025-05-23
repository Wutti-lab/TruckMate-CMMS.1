
import { TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Navigation, MapPin, CheckCircle2, History, Eye, Map, Calendar, FileText, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { VehicleQRModal } from "../VehicleQRModal";
import { Vehicle } from "../types/Vehicle";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
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
  const { toast } = useToast();
  const { language, t } = useLanguage();
  
  const handleViewDetails = () => {
    toast({
      title: language === 'de' ? "Details anzeigen" : language === 'th' ? "ดูรายละเอียด" : "View Details",
      description: `${vehicle.id} - ${vehicle.model}`
    });
  };
  
  const handleScheduleService = () => {
    toast({
      title: language === 'de' ? "Wartung planen" : language === 'th' ? "กำหนดการบำรุงรักษา" : "Schedule Service",
      description: language === 'de' 
        ? `Wartung für ${vehicle.id} wird geplant` 
        : language === 'th'
          ? `กำลังวางแผนการบำรุงรักษาสำหรับ ${vehicle.id}`
          : `Scheduling maintenance for ${vehicle.id}`
    });
  };
  
  const handleReports = () => {
    toast({
      title: language === 'de' ? "Berichte" : language === 'th' ? "รายงาน" : "Reports",
      description: language === 'de' 
        ? `Berichte für ${vehicle.id} werden generiert` 
        : language === 'th'
          ? `กำลังสร้างรายงานสำหรับ ${vehicle.id}`
          : `Generating reports for ${vehicle.id}`
    });
  };
  
  const handleRemove = () => {
    toast({
      title: language === 'de' ? "Entfernen" : language === 'th' ? "ลบ" : "Remove",
      description: language === 'de' 
        ? `${vehicle.id} wird entfernt` 
        : language === 'th'
          ? `กำลังลบ ${vehicle.id}`
          : `Removing ${vehicle.id}`,
      variant: "destructive"
    });
  };
  
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
            <DropdownMenuItem onClick={handleViewDetails}>
              <Eye size={14} className="mr-2" />
              {language === 'de' ? "Details anzeigen" : language === 'th' ? "ดูรายละเอียด" : "View Details"}
            </DropdownMenuItem>
            
            <DropdownMenuItem onClick={() => window.open(`/map?vehicle=${vehicle.id}`, '_blank')}>
              <Map size={14} className="mr-2" />
              {language === 'de' ? "Auf Karte anzeigen" : language === 'th' ? "แสดงบนแผนที่" : "Show on Map"}
            </DropdownMenuItem>
            
            <DropdownMenuItem onClick={handleScheduleService}>
              <Calendar size={14} className="mr-2" />
              {language === 'de' ? "Wartung planen" : language === 'th' ? "กำหนดการบำรุงรักษา" : "Schedule Service"}
            </DropdownMenuItem>
            
            <DropdownMenuItem onClick={handleReports}>
              <FileText size={14} className="mr-2" />
              {language === 'de' ? "Berichte" : language === 'th' ? "รายงาน" : "Reports"}
            </DropdownMenuItem>
            
            <DropdownMenuItem 
              onClick={handleRemove}
              className="text-red-600"
            >
              <Trash2 size={14} className="mr-2" />
              {language === 'de' ? "Entfernen" : language === 'th' ? "ลบ" : "Remove"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </TableCell>
  );
}
