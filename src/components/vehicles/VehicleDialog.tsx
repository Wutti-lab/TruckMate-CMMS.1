
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Vehicle {
  id: string;
  license_plate: string;
  model: string;
  status: string;
  location: string;
  fuel_level: number;
  battery_level: number;
  engine_temp: number;
  last_service: string;
  next_service: string;
}

interface VehicleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vehicle: Vehicle | null;
  onSave: (formData: any) => void;
  isEditMode: boolean;
}

export function VehicleDialog({
  open,
  onOpenChange,
  vehicle,
  onSave,
  isEditMode
}: VehicleDialogProps) {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    license_plate: "",
    model: "",
    status: "active",
    location: "",
    fuel_level: 100,
    battery_level: 100,
    engine_temp: 80,
    last_service: new Date().toISOString().split('T')[0],
    next_service: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  });

  // Initialize form data when editing a vehicle
  useEffect(() => {
    if (vehicle && isEditMode) {
      setFormData({
        license_plate: vehicle.license_plate,
        model: vehicle.model,
        status: vehicle.status,
        location: vehicle.location,
        fuel_level: vehicle.fuel_level,
        battery_level: vehicle.battery_level,
        engine_temp: vehicle.engine_temp,
        last_service: vehicle.last_service ? new Date(vehicle.last_service).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
        next_service: vehicle.next_service ? new Date(vehicle.next_service).toISOString().split('T')[0] : new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      });
    } else {
      // Reset form when adding a new vehicle
      setFormData({
        license_plate: "",
        model: "",
        status: "active",
        location: "",
        fuel_level: 100,
        battery_level: 100,
        engine_temp: 80,
        last_service: new Date().toISOString().split('T')[0],
        next_service: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      });
    }
  }, [vehicle, isEditMode, open]);

  // Function to get translated text
  const getText = (en: string, de: string): string => {
    return language === 'de' ? de : en;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name.includes("level") || name.includes("temp") ? Number(value) : value
    });
  };

  const handleSelectChange = (value: string, name: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const parsedFormData = {
      ...formData,
      last_service: new Date(formData.last_service),
      next_service: new Date(formData.next_service)
    };
    
    onSave(parsedFormData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEditMode 
              ? getText("Edit Vehicle", "Fahrzeug bearbeiten") 
              : getText("Add New Vehicle", "Neues Fahrzeug hinzufügen")}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="license_plate">{getText("License Plate", "Kennzeichen")}</Label>
              <Input
                id="license_plate"
                name="license_plate"
                value={formData.license_plate}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="model">{getText("Model", "Modell")}</Label>
              <Input
                id="model"
                name="model"
                value={formData.model}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">{getText("Status", "Status")}</Label>
              <Select 
                value={formData.status} 
                onValueChange={(value) => handleSelectChange(value, "status")}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">{getText("Active", "Aktiv")}</SelectItem>
                  <SelectItem value="maintenance">{getText("Maintenance", "Wartung")}</SelectItem>
                  <SelectItem value="inactive">{getText("Inactive", "Inaktiv")}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">{getText("Location", "Standort")}</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="fuel_level">{getText("Fuel Level (%)", "Kraftstoffstand (%)")}</Label>
            <Input
              id="fuel_level"
              name="fuel_level"
              type="number"
              min="0"
              max="100"
              value={formData.fuel_level}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="battery_level">{getText("Battery Level (%)", "Batteriestand (%)")}</Label>
            <Input
              id="battery_level"
              name="battery_level"
              type="number"
              min="0"
              max="100"
              value={formData.battery_level}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="engine_temp">{getText("Engine Temperature (°C)", "Motortemperatur (°C)")}</Label>
            <Input
              id="engine_temp"
              name="engine_temp"
              type="number"
              value={formData.engine_temp}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="last_service">{getText("Last Service", "Letzte Wartung")}</Label>
              <Input
                id="last_service"
                name="last_service"
                type="date"
                value={formData.last_service}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="next_service">{getText("Next Service", "Nächste Wartung")}</Label>
              <Input
                id="next_service"
                name="next_service"
                type="date"
                value={formData.next_service}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
              {getText("Cancel", "Abbrechen")}
            </Button>
            <Button type="submit">
              {getText("Save", "Speichern")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
