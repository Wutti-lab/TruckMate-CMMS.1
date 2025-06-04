
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { useLanguage } from "@/contexts/LanguageContext";

export function CompanyField() {
  const { language } = useLanguage();
  const form = useFormContext();
  
  return (
    <FormField
      control={form.control}
      name="company"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {language === 'en' ? 'Company' : 
             language === 'th' ? 'บริษัท' : 
             'Unternehmen'}
          </FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
