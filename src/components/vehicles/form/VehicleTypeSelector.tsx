
import { FormItem, FormLabel } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage, extractLanguageText } from "@/contexts/LanguageContext";
import { FormControl } from "@/components/ui/form";

interface VehicleTypeSelectorProps {
  defaultValue: string;
  onChange: (value: string) => void;
}

export function VehicleTypeSelector({ defaultValue, onChange }: VehicleTypeSelectorProps) {
  const { language } = useLanguage();
  
  return (
    <FormItem>
      <FormLabel>
        {extractLanguageText("Vehicle Type | ประเภทยานพาหนะ | Fahrzeugtyp", language)}
      </FormLabel>
      <Select onValueChange={onChange} defaultValue={defaultValue}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder={extractLanguageText("Select type | เลือกประเภท | Typ auswählen", language)} />
          </SelectTrigger>
        </FormControl>
        <SelectContent className="bg-white">
          <SelectItem value="electric">
            {extractLanguageText("Electric | ไฟฟ้า | Elektrisch", language)}
          </SelectItem>
          <SelectItem value="fuel">
            {extractLanguageText("Fuel | น้ำมัน | Kraftstoff", language)}
          </SelectItem>
        </SelectContent>
      </Select>
    </FormItem>
  );
}
