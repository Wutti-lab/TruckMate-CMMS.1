import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";
import { VehicleFormData } from "./VehicleFormData";

interface VehicleServiceFieldsProps {
  formData: VehicleFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function VehicleServiceFields({ formData, onChange }: VehicleServiceFieldsProps) {
  const { language } = useLanguage();
  
  const getText = (en: string, de: string): string => {
    return language === 'de' ? de : en;
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="next_service">{getText("Next Service", "Nächste Wartung")}</Label>
      <Input
        id="next_service"
        name="next_service"
        type="date"
        value={formData.next_service}
        onChange={onChange}
        required
      />
    </div>
  );
}