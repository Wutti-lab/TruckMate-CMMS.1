import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { VehicleFormData } from "./VehicleFormData";

interface VehicleStatusFieldsProps {
  formData: VehicleFormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (value: string, name: string) => void;
}

export function VehicleStatusFields({ formData, onInputChange, onSelectChange }: VehicleStatusFieldsProps) {
  const { language } = useLanguage();
  
  const getText = (en: string, de: string): string => {
    return language === 'de' ? de : en;
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="status">{getText("Status", "Status")}</Label>
        <Select 
          value={formData.status} 
          onValueChange={(value) => onSelectChange(value, "status")}
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
          onChange={onInputChange}
          required
        />
      </div>
    </div>
  );
}