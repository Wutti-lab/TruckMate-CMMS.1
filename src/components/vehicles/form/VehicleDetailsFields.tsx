import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";
import { VehicleFormData } from "./VehicleFormData";

interface VehicleDetailsFieldsProps {
  formData: VehicleFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function VehicleDetailsFields({ formData, onChange }: VehicleDetailsFieldsProps) {
  const { language } = useLanguage();
  
  const getText = (en: string, de: string): string => {
    return language === 'de' ? de : en;
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="mileage">{getText("Mileage", "Kilometerstand")}</Label>
          <Input
            id="mileage"
            name="mileage"
            type="number"
            min="0"
            value={formData.mileage}
            onChange={onChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="fuel_type">{getText("Fuel Type", "Kraftstoffart")}</Label>
          <Input
            id="fuel_type"
            name="fuel_type"
            value={formData.fuel_type}
            onChange={onChange}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="engine_size">{getText("Engine Size", "Motorengröße")}</Label>
        <Input
          id="engine_size"
          name="engine_size"
          value={formData.engine_size}
          onChange={onChange}
        />
      </div>
    </>
  );
}