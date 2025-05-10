
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, Search, Phone, History, Bell } from "lucide-react";
import { useLanguage, extractLanguageText } from "@/contexts/LanguageContext";

interface MapControlsProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setShowEmergencyContacts: (show: boolean) => void;
  showEmergencyContacts: boolean;
  toggleRouteHistory: () => void;
  showRouteHistory: boolean;
  toggleNotifications: () => void;
  showNotifications: boolean;
  notifications: Array<{ id: number; message: string; time: string; type: string }>;
}

export function MapControls({
  searchQuery,
  setSearchQuery,
  setShowEmergencyContacts,
  showEmergencyContacts,
  toggleRouteHistory,
  showRouteHistory,
  toggleNotifications,
  showNotifications,
  notifications
}: MapControlsProps) {
  const { language } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={extractLanguageText(
            "Search address or vehicle... | ค้นหาที่อยู่หรือยานพาหนะ... | Adresse oder Fahrzeug suchen...", 
            language
          )}
          className="pl-8 w-[200px] md:w-[300px]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <Button variant="outline" size="icon">
        <Filter size={16} />
      </Button>
      <Button 
        variant="outline" 
        size="icon" 
        onClick={() => setShowEmergencyContacts(!showEmergencyContacts)}
        className={showEmergencyContacts ? "bg-red-100 text-red-600" : ""}
      >
        <Phone size={16} />
      </Button>
      <Button 
        variant="outline" 
        size="icon" 
        onClick={toggleRouteHistory}
        className={showRouteHistory ? "bg-blue-100 text-blue-600" : ""}
      >
        <History size={16} />
      </Button>
      <Button 
        variant="outline" 
        size="icon" 
        onClick={toggleNotifications}
        className={showNotifications ? "bg-amber-100 text-amber-600" : ""}
        aria-label={extractLanguageText("Show notifications | แสดงการแจ้งเตือน | Benachrichtigungen anzeigen", language)}
      >
        <div className="relative">
          <Bell size={16} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            {notifications.length}
          </span>
        </div>
      </Button>
    </div>
  );
}
