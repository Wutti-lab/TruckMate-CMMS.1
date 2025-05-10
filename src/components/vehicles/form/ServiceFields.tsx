
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLanguage, extractLanguageText } from "@/contexts/LanguageContext";
import { UseFormReturn } from "react-hook-form";
import { VehicleFormValues } from "./BasicVehicleFields";

interface ServiceFieldsProps {
  form: UseFormReturn<VehicleFormValues>;
}

export function ServiceFields({ form }: ServiceFieldsProps) {
  const { language } = useLanguage();
  
  return (
    <>
      <FormField
        control={form.control}
        name="lastService"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{extractLanguageText("Last Service | บริการล่าสุด | Letzte Wartung", language)}</FormLabel>
            <FormControl>
              <Input placeholder="MM/DD/YYYY" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="nextService"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{extractLanguageText("Next Service | บริการถัดไป | Nächste Wartung", language)}</FormLabel>
            <FormControl>
              <Input placeholder="MM/DD/YYYY" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
