
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Toggle } from "@/components/ui/toggle";
import { Layers, Route } from "lucide-react";

interface MapStylesProps {
  mapStyle: string;
  setMapStyle: (style: string) => void;
  showTraffic: boolean;
  setShowTraffic: (show: boolean) => void;
  showPOIs: boolean;
  setShowPOIs: (show: boolean) => void;
}

export function MapStyles({
  mapStyle,
  setMapStyle,
  showTraffic,
  setShowTraffic,
  showPOIs,
  setShowPOIs
}: MapStylesProps) {
  const mapStyles = {
    'streets-v11': 'Streets',
    'satellite-v9': 'Satellite',
    'light-v10': 'Light',
    'dark-v10': 'Dark',
    'outdoors-v11': 'Outdoors',
  };

  return (
    <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
      <Select value={mapStyle} onValueChange={setMapStyle}>
        <SelectTrigger className="w-36 bg-background">
          <SelectValue placeholder="Map Style" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(mapStyles).map(([value, label]) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <div className="flex gap-1">
        <Toggle
          pressed={showTraffic}
          onPressedChange={setShowTraffic}
          className="flex-1 bg-background shadow-lg hover:bg-accent data-[state=on]:bg-accent data-[state=on]:text-accent-foreground"
          title="Toggle Traffic"
        >
          <Route className="h-4 w-4 mr-1" />
          Traffic
        </Toggle>
        
        <Toggle
          pressed={showPOIs}
          onPressedChange={setShowPOIs}
          className="flex-1 bg-background shadow-lg hover:bg-accent data-[state=on]:bg-accent data-[state=on]:text-accent-foreground"
          title="Toggle POIs"
        >
          <Layers className="h-4 w-4 mr-1" />
          POIs
        </Toggle>
      </div>
    </div>
  );
}
