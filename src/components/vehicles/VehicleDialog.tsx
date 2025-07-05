
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Vehicle } from "./types/VehicleTable";
import { useVehicleForm } from "./hooks/useVehicleForm";
import { VehicleBasicFields } from "./form/VehicleBasicFields";
import { VehicleStatusFields } from "./form/VehicleStatusFields";
import { VehicleSpecsFields } from "./form/VehicleSpecsFields";
import { VehicleDetailsFields } from "./form/VehicleDetailsFields";
import { VehicleServiceFields } from "./form/VehicleServiceFields";

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
  const { formData, handleInputChange, handleSelectChange, handleSubmit } = useVehicleForm({
    vehicle,
    isEditMode,
    open
  });

  const getText = (en: string, de: string): string => {
    return language === 'de' ? de : en;
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
        
        <form onSubmit={(e) => handleSubmit(e, onSave)} className="space-y-4">
          <VehicleBasicFields 
            formData={formData} 
            onChange={handleInputChange} 
          />
          
          <VehicleStatusFields 
            formData={formData} 
            onInputChange={handleInputChange}
            onSelectChange={handleSelectChange}
          />
          
          <VehicleSpecsFields 
            formData={formData} 
            onInputChange={handleInputChange}
            onSelectChange={handleSelectChange}
          />
          
          <VehicleDetailsFields 
            formData={formData} 
            onChange={handleInputChange} 
          />
          
          <VehicleServiceFields 
            formData={formData} 
            onChange={handleInputChange} 
          />
          
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
