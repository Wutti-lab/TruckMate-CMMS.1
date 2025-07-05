import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { VehicleFormData } from "./VehicleFormData";

interface VehicleSpecsFieldsProps {
  formData: VehicleFormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (value: string, name: string) => void;
}

export function VehicleSpecsFields({ formData, onInputChange, onSelectChange }: VehicleSpecsFieldsProps) {
  const { language } = useLanguage();
  
  const getText = (en: string, de: string): string => {
    return language === 'de' ? de : en;
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="make">{getText("Make", "Marke")}</Label>
          <Input
            id="make"
            name="make"
            value={formData.make}
            onChange={onInputChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="year">{getText("Year", "Jahr")}</Label>
          <Input
            id="year"
            name="year"
            type="number"
            min="1900"
            max="2030"
            value={formData.year}
            onChange={onInputChange}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="vin">{getText("VIN", "Fahrgestellnummer")}</Label>
          <Input
            id="vin"
            name="vin"
            value={formData.vin}
            onChange={onInputChange}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="vehicle_type">{getText("Vehicle Type", "Fahrzeugtyp")}</Label>
          <Select 
            value={formData.vehicle_type} 
            onValueChange={(value) => onSelectChange(value, "vehicle_type")}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="truck">{getText("Truck", "LKW")}</SelectItem>
              <SelectItem value="van">{getText("Van", "Lieferwagen")}</SelectItem>
              <SelectItem value="car">{getText("Car", "PKW")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
}