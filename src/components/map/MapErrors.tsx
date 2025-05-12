
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface MapErrorsProps {
  tokenError: string | null;
  locationError: string | null;
  resetToken: () => void;
}

export function MapErrors({
  tokenError,
  locationError,
  resetToken
}: MapErrorsProps) {
  return (
    <>
      {tokenError && (
        <div className="absolute top-4 left-4 right-4 z-10">
          <Alert variant="destructive">
            <AlertDescription className="flex justify-between items-center">
              <span>{tokenError}</span>
              <Button size="sm" variant="outline" onClick={resetToken}>
                Reset Token | รีเซ็ต Token
              </Button>
            </AlertDescription>
          </Alert>
        </div>
      )}

      {locationError && !tokenError && (
        <div className="absolute top-4 left-4 right-4 z-10">
          <Alert variant="destructive">
            <AlertDescription>{locationError}</AlertDescription>
          </Alert>
        </div>
      )}
    </>
  );
}
