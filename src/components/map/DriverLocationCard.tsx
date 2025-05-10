
import { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Navigation } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useLanguage, extractLanguageText } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";

interface DriverLocationCardProps {
  trackingActive: boolean;
  setTrackingActive: (value: boolean) => void;
  driverLocation: [number, number] | null;
  lastUpdateTime: string | null;
  selectedVehicle: string | null;
  startTrackingVehicle: (vehicleId: string) => void;
}

export function DriverLocationCard({ 
  trackingActive, 
  setTrackingActive,
  driverLocation,
  lastUpdateTime,
  selectedVehicle,
  startTrackingVehicle
}: DriverLocationCardProps) {
  const { toast } = useToast();
  const { language } = useLanguage();

  const toggleTracking = (value: boolean) => {
    setTrackingActive(value);
    if (value) {
      // Update the last update time when tracking is enabled
      if (selectedVehicle) {
        startTrackingVehicle(selectedVehicle);
        toast({
          title: extractLanguageText(`Tracking ${selectedVehicle} | กำลังติดตาม ${selectedVehicle} | Verfolge ${selectedVehicle}`, language),
          description: extractLanguageText("Real-time location updates enabled | เปิดใช้งานการอัปเดตตำแหน่งแบบเรียลไทม์ | Echtzeit-Standortaktualisierungen aktiviert", language)
        });
      }
    }
  };

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-md flex items-center gap-2">
            <Navigation className="h-4 w-4 text-fleet-500" />
            {extractLanguageText("Driver Location | ตำแหน่งคนขับ | Fahrerstandort", language)}
          </CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {extractLanguageText("Live Tracking | การติดตามแบบเรียลไทม์ | Live-Tracking", language)}
            </span>
            <Switch 
              checked={trackingActive} 
              onCheckedChange={toggleTracking}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4 justify-between items-center">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className={trackingActive ? "bg-green-100 text-green-600" : "bg-gray-100"}>
              {extractLanguageText(
                trackingActive ? "Active | กำลังใช้งาน | Aktiv" : "Inactive | ไม่ได้ใช้งาน | Inaktiv", 
                language
              )}
            </Badge>
            {driverLocation && (
              <div className="text-sm font-mono">
                {driverLocation[1].toFixed(6)}°N, {driverLocation[0].toFixed(6)}°E
              </div>
            )}
            {lastUpdateTime && (
              <div className="text-xs text-muted-foreground">
                {extractLanguageText(
                  `Last updated: ${lastUpdateTime} | อัพเดทล่าสุด: ${lastUpdateTime} | Letzte Aktualisierung: ${lastUpdateTime}`, 
                  language
                )}
              </div>
            )}
          </div>
          <div>
            {!trackingActive && (
              <Button 
                onClick={() => setTrackingActive(true)} 
                size="sm" 
                variant="default" 
                className="bg-fleet-500"
              >
                {extractLanguageText("Enable Tracking | เปิดใช้การติดตาม | Tracking aktivieren", language)}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
