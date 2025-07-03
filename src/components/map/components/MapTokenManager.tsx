import { MapTokenInput } from "../MapTokenInput";

interface MapTokenManagerProps {
  mapboxToken: string;
  setMapboxToken: (token: string) => void;
  handleTokenSubmit: () => void;
  tokenError: string | null;
}

export function MapTokenManager({
  mapboxToken,
  setMapboxToken,
  handleTokenSubmit,
  tokenError
}: MapTokenManagerProps) {
  return (
    <MapTokenInput 
      mapboxToken={mapboxToken}
      setMapboxToken={setMapboxToken}
      handleTokenSubmit={handleTokenSubmit}
      tokenError={tokenError}
    />
  );
}