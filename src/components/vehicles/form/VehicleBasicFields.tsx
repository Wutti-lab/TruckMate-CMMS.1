import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";
import { VehicleFormData } from "./VehicleFormData";

interface VehicleBasicFieldsProps {
  formData: VehicleFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function VehicleBasicFields({ formData, onChange }: VehicleBasicFieldsProps) {
  const { language } = useLanguage();
  
  const getText = (en: string, de: string): string => {
    return language === 'de' ? de : en;
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="license_plate">{getText("License Plate", "Kennzeichen")}</Label>
        <Input
          id="license_plate"
          name="license_plate"
          value={formData.license_plate}
          onChange={onChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="model">{getText("Model", "Modell")}</Label>
        <Input
          id="model"
          name="model"
          value={formData.model}
          onChange={onChange}
          required
        />
      </div>
    </div>
  );
}