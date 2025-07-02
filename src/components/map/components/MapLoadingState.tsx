
interface MapLoadingStateProps {
  mapLoaded: boolean;
}

export function MapLoadingState({ mapLoaded }: MapLoadingStateProps) {
  if (mapLoaded) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
      <div className="text-center p-4">
        <p className="text-lg text-fleet-500 font-medium mb-2">Real-Time Fleet Map | Live-Flottenansicht</p>
        <p className="text-sm text-gray-500">Loading real vehicle data... | Lade echte Fahrzeugdaten...</p>
      </div>
    </div>
  );
}
