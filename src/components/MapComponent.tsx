
import { MapContainer } from "@/components/map/MapContainer";

interface MapProps {
  className?: string;
  tracking?: boolean;
  onLocationUpdate?: (coords: [number, number]) => void;
  vehicleId?: string;
}

export function MapComponent(props: MapProps) {
  return <MapContainer {...props} />;
}
