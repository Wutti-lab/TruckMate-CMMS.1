
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Car, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage, extractLanguageText } from "@/contexts/LanguageContext";

interface VehicleInfoCardProps {
  selectedVehicle: string | null;
  setSelectedVehicle: (vehicleId: string | null) => void;
  trackingActive: boolean;
  setTrackingActive: (active: boolean) => void;
  startTrackingVehicle: (vehicleId: string) => void;
}

export function VehicleInfoCard({
  selectedVehicle,
  setSelectedVehicle,
  trackingActive,
  setTrackingActive,
  startTrackingVehicle
}: VehicleInfoCardProps) {
  const { toast } = useToast();
  const { language } = useLanguage();

  if (!selectedVehicle) {
    return null;
  }

  const getDriverName = (vehicleId: string) => {
    switch (vehicleId) {
      case "B-FR-123": return "Max Müller";
      case "B-FR-234": return "Lisa Schmidt";
      case "B-FR-345": return "Jan Weber";
      case "B-FR-456": return "Anna Becker";
      default: return "Unknown";
    }
  };

  return (
    <Card className="absolute left-6 top-28 w-[300px] shadow-lg z-10">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Car className="h-5 w-5 text-fleet-500" />
            <h3 className="font-medium">{selectedVehicle}</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedVehicle(null)}
          >
            ✕
          </Button>
        </div>
        
        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-fleet-500" />
            <span>{extractLanguageText("Bangkok, Central | กรุงเทพ, เขตกลาง | Bangkok, Zentrum", language)}</span>
          </div>
          <div className="text-sm">
            <span className="font-medium">{extractLanguageText("Driver | คนขับ | Fahrer:", language)}</span> {getDriverName(selectedVehicle)}
          </div>
          <div className="text-sm">
            <span className="font-medium">{extractLanguageText("Status | สถานะ | Status:", language)}</span>{" "}
            <span className="text-green-600">{extractLanguageText("Driving | กำลังขับ | Fährt", language)}</span>
          </div>
          <div className="text-sm">
            <span className="font-medium">{extractLanguageText("Speed | ความเร็ว | Geschwindigkeit:", language)}</span> 42 km/h
          </div>
          <div className="text-sm">
            <span className="font-medium">{extractLanguageText("Fuel | เชื้อเพลิง | Kraftstoff:", language)}</span> 68%
          </div>
        </div>
        
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline" size="sm">{extractLanguageText("Details | รายละเอียด | Details", language)}</Button>
          <Button 
            size="sm" 
            className="bg-fleet-500"
            onClick={() => {
              if (trackingActive) {
                toast({
                  title: extractLanguageText("Already Tracking | กำลังติดตามอยู่แล้ว | Bereits in Verfolgung", language),
                  description: extractLanguageText("This vehicle is already being tracked | ยานพาหนะนี้กำลังถูกติดตามอยู่ | Dieses Fahrzeug wird bereits verfolgt", language)
                });
              } else {
                setTrackingActive(true);
                startTrackingVehicle(selectedVehicle);
                toast({
                  title: extractLanguageText("Navigation Started | เริ่มการนำทาง | Navigation gestartet", language),
                  description: extractLanguageText("Tracking vehicle location | กำลังติดตามตำแหน่งยานพาหนะ | Fahrzeugstandort wird verfolgt", language)
                });
              }
            }}
          >
            {extractLanguageText("Navigation | นำทาง | Navigation", language)}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
