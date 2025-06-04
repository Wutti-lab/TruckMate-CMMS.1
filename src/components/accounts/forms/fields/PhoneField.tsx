
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { useLanguage } from "@/contexts/LanguageContext";

export function PhoneField() {
  const { language } = useLanguage();
  const form = useFormContext();
  
  return (
    <FormField
      control={form.control}
      name="phone_number"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {language === 'en' ? 'Phone Number' : 
             language === 'th' ? 'หมายเลขโทรศัพท์' : 
             'Telefonnummer'}
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
