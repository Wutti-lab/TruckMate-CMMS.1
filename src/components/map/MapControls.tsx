
import { Button } from "@/components/ui/button";
import { Locate, Map, Search, PhoneCall, History, Bell } from "lucide-react";

interface MapControlsProps {
  getUserLocation?: () => void;
  resetToken?: () => void;
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
  setShowEmergencyContacts?: (show: boolean) => void;
  showEmergencyContacts?: boolean;
  toggleRouteHistory?: () => void;
  showRouteHistory?: boolean;
  toggleNotifications?: () => void;
  showNotifications?: boolean;
  notifications?: Array<{ id: number; message: string; time: string; type: string }>;
}

export function MapControls({
  getUserLocation = () => {},
  resetToken = () => {},
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
  // If this component is being used in the simplified context (just location and reset)
  // we'll render the minimal version
  if (!setShowEmergencyContacts && !toggleRouteHistory && !toggleNotifications) {
    return (
      <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-2">
        <Button
          variant="secondary"
          size="icon"
          className="bg-white shadow-lg hover:bg-gray-100"
          onClick={getUserLocation}
          title="Get Location | รับตำแหน่ง"
        >
          <Locate className="h-4 w-4" />
        </Button>
        
        <Button
          variant="secondary"
          size="icon"
          className="bg-white shadow-lg hover:bg-gray-100"
          onClick={resetToken}
          title="Change Mapbox Token | เปลี่ยน Mapbox Token"
        >
          <Map className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  // Otherwise, render the full version with all controls
  return (
    <div className="flex gap-2 flex-wrap">
      {setSearchQuery && (
        <div className="relative rounded-md shadow-sm">
          <input
            type="text"
            value={searchQuery || ""}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="py-2 pl-10 pr-4 block w-full rounded-md border border-gray-300 focus:border-fleet-500 focus:ring-fleet-500 text-sm"
            placeholder="Search location | ค้นหาตำแหน่ง"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
        </div>
      )}

      <div className="flex gap-2">
        {setShowEmergencyContacts && (
          <Button
            variant={showEmergencyContacts ? "default" : "outline"}
            size="sm"
            onClick={() => setShowEmergencyContacts(!showEmergencyContacts)}
            className={showEmergencyContacts ? "bg-fleet-600" : ""}
          >
            <PhoneCall className="h-4 w-4 mr-2" />
            Emergency Contacts | การติดต่อฉุกเฉิน
          </Button>
        )}

        {toggleRouteHistory && (
          <Button
            variant={showRouteHistory ? "default" : "outline"}
            size="sm"
            onClick={toggleRouteHistory}
            className={showRouteHistory ? "bg-fleet-600" : ""}
          >
            <History className="h-4 w-4 mr-2" />
            Route History | ประวัติเส้นทาง
          </Button>
        )}

        {toggleNotifications && (
          <Button
            variant={showNotifications ? "default" : "outline"}
            size="sm"
            onClick={toggleNotifications}
            className={showNotifications ? "bg-fleet-600" : ""}
          >
            <Bell className="h-4 w-4 mr-2" />
            Notifications | การแจ้งเตือน
            {notifications && notifications.length > 0 && (
              <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                {notifications.length}
              </span>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
