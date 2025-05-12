
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Map, AlertTriangle } from "lucide-react";

interface MapTokenInputProps {
  mapboxToken: string;
  setMapboxToken: (token: string) => void;
  handleTokenSubmit: () => void;
  tokenError: string | null;
}

export function MapTokenInput({
  mapboxToken,
  setMapboxToken,
  handleTokenSubmit,
  tokenError
}: MapTokenInputProps) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 p-4 z-20">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex items-center gap-2 mb-4">
          <Map className="h-6 w-6 text-fleet-500" />
          <h2 className="text-xl font-bold text-fleet-500">Mapbox Token Required</h2>
        </div>
        
        {tokenError && (
          <Alert variant="destructive" className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{tokenError}</AlertDescription>
          </Alert>
        )}
        
        <p className="mb-4 text-gray-600">
          To use the map functionality, you need to provide a valid Mapbox public access token.
        </p>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="mapbox-token" className="block text-sm font-medium text-gray-700 mb-1">
              Mapbox Public Token | Mapbox Public Token
            </label>
            <Input 
              id="mapbox-token"
              placeholder="Enter your Mapbox Public Token | ใส่ Mapbox Public Token ของคุณ" 
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              className="flex-grow"
            />
          </div>
          
          <Button 
            onClick={handleTokenSubmit}
            className="w-full bg-fleet-500 hover:bg-fleet-600"
          >
            Save & Load Map | บันทึกและโหลดแผนที่
          </Button>
        </div>
        
        <div className="mt-6">
          <p className="text-sm text-gray-500 text-center">
            You can find your Mapbox public token at{" "}
            <a 
              href="https://account.mapbox.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-fleet-500 hover:underline"
            >
              account.mapbox.com
            </a>
          </p>
          <p className="text-sm text-gray-500 text-center mt-1">
            Go to "Access tokens" section in your Mapbox account.
          </p>
        </div>
      </div>
    </div>
  );
}
