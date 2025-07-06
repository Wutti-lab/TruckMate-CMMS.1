import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Keyboard } from "lucide-react";
import { useLanguage, extractLanguageText } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ManualInputDialogProps {
  onVehicleFound: (vehicleData: any) => void;
}

export function ManualInputDialog({ onVehicleFound }: ManualInputDialogProps) {
  const [vehicleId, setVehicleId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { language } = useLanguage();
  const { toast } = useToast();

  const handleManualSearch = async () => {
    if (!vehicleId.trim()) {
      toast({
        title: extractLanguageText("Input Required | ต้องป้อนข้อมูล", language),
        description: extractLanguageText("Please enter a vehicle ID or license plate | โปรดป้อนรหัสยานพาหนะหรือป้ายทะเบียน", language),
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      // Search for vehicle by ID or license plate
      const { data: vehicles, error: vehiclesError } = await supabase
        .from('vehicles')
        .select(`
          *,
          drivers!inner(name, phone, status, license_number)
        `)
        .or(`id.eq.${vehicleId},license_plate.ilike.%${vehicleId}%`);

      if (vehiclesError) throw vehiclesError;

      if (!vehicles || vehicles.length === 0) {
        toast({
          title: extractLanguageText("Vehicle Not Found | ไม่พบยานพาหนะ", language),
          description: extractLanguageText("No vehicle found with that ID or license plate | ไม่พบยานพาหนะที่มีรหัสหรือป้ายทะเบียนดังกล่าว", language),
          variant: "destructive"
        });
        return;
      }

      const vehicle = vehicles[0];
      
      // Format data similar to QR code structure
      const vehicleData = {
        type: "vehicle-data",
        version: "1.0",
        vehicle: {
          id: vehicle.license_plate,
          model: `${vehicle.make || ''} ${vehicle.model || ''}`.trim(),
          driver: vehicle.drivers?.[0]?.name || 'Unassigned',
          status: vehicle.status || 'Unknown',
          location: vehicle.location || 'Unknown',
          nextService: vehicle.next_service || 'Not scheduled',
          fuelLevel: Math.floor(Math.random() * 100), // Mock data
          batteryLevel: Math.floor(Math.random() * 100), // Mock data
          lastService: vehicle.next_service ? 
            new Date(new Date(vehicle.next_service).getTime() - 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : 
            'Unknown',
          engineTemp: Math.floor(Math.random() * 40) + 70 // Mock data
        },
        driver: vehicle.drivers?.[0] ? {
          id: `D${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
          name: vehicle.drivers[0].name,
          licenseType: vehicle.drivers[0].license_number ? 'Class 1' : 'Unknown',
          phone: vehicle.drivers[0].phone || 'Not provided',
          status: vehicle.drivers[0].status || 'Unknown',
          hoursThisWeek: Math.floor(Math.random() * 40),
          shift: Math.random() > 0.5 ? 'AM' : 'PM'
        } : null
      };

      onVehicleFound(vehicleData);
      setIsOpen(false);
      setVehicleId("");
      
      toast({
        title: extractLanguageText("Vehicle Found | พบยานพาหนะ", language),
        description: extractLanguageText("Vehicle information loaded successfully | โหลดข้อมูลยานพาหนะสำเร็จ", language)
      });

    } catch (error) {
      console.error('Manual search error:', error);
      toast({
        title: extractLanguageText("Search Error | ข้อผิดพลาดในการค้นหา", language),
        description: extractLanguageText("Failed to search for vehicle | การค้นหายานพาหนะล้มเหลว", language),
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleManualSearch();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Keyboard className="w-4 h-4" />
          {extractLanguageText("Manual Input | ป้อนข้อมูลด้วยตนเอง", language)}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {extractLanguageText("Manual Vehicle Search | ค้นหายานพาหนะด้วยตนเอง", language)}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="vehicle-id">
              {extractLanguageText("Vehicle ID or License Plate | รหัสยานพาหนะหรือป้ายทะเบียน", language)}
            </Label>
            <Input
              id="vehicle-id"
              placeholder={extractLanguageText("Enter vehicle ID or license plate... | ป้อนรหัสยานพาหนะหรือป้ายทะเบียน...", language)}
              value={vehicleId}
              onChange={(e) => setVehicleId(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
            />
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setIsOpen(false)} disabled={loading}>
              {extractLanguageText("Cancel | ยกเลิก", language)}
            </Button>
            <Button onClick={handleManualSearch} disabled={loading || !vehicleId.trim()} className="gap-2">
              <Search className="w-4 h-4" />
              {loading 
                ? extractLanguageText("Searching... | กำลังค้นหา...", language)
                : extractLanguageText("Search | ค้นหา", language)
              }
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}