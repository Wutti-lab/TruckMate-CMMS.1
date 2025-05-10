
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { UseFormReturn } from "react-hook-form";
import { VehicleFormValues } from "./BasicVehicleFields";

interface ServiceFieldsProps {
  form: UseFormReturn<VehicleFormValues>;
}

export function ServiceFields({ form }: ServiceFieldsProps) {
  const { language, t } = useLanguage();
  
  return (
    <>
      <FormField
        control={form.control}
        name="lastService"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{language === 'de' ? 'Letzte Wartung' : 'Last Service'}</FormLabel>
            <FormControl>
              <Input placeholder={language === 'de' ? "TT.MM.JJJJ" : "MM/DD/YYYY"} {...field} />
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
            <FormLabel>{language === 'de' ? 'Nächste Wartung' : 'Next Service'}</FormLabel>
            <FormControl>
              <Input placeholder={language === 'de' ? "TT.MM.JJJJ" : "MM/DD/YYYY"} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
