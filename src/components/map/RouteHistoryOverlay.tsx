
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage, extractLanguageText } from "@/contexts/LanguageContext";

interface RouteHistoryItem {
  time: string;
  location: string;
  status: string;
}

interface RouteHistoryOverlayProps {
  showRouteHistory: boolean;
  setShowRouteHistory: (show: boolean) => void;
  selectedVehicle: string | null;
  routeHistory: RouteHistoryItem[];
}

export function RouteHistoryOverlay({ 
  showRouteHistory, 
  setShowRouteHistory,
  selectedVehicle,
  routeHistory
}: RouteHistoryOverlayProps) {
  const { language } = useLanguage();

  if (!showRouteHistory || !selectedVehicle) {
    return null;
  }

  return (
    <div className="absolute left-4 top-4 w-[350px] max-h-[80vh] overflow-y-auto bg-white rounded-lg shadow-lg p-4 z-20">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">
          {extractLanguageText("Route History | ประวัติเส้นทาง | Routenverlauf", language)}
          <Badge className="ml-2 bg-fleet-500">{selectedVehicle}</Badge>
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowRouteHistory(false)}
        >
          ✕
        </Button>
      </div>
      <div className="space-y-3">
        {routeHistory.map((item, index) => (
          <div key={index} className="border-l-2 border-fleet-500 pl-3 pb-3">
            <p className="font-semibold text-sm">{item.time}</p>
            <p className="text-sm">{item.location}</p>
            <Badge variant="outline" className="mt-1">
              {item.status}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
}
