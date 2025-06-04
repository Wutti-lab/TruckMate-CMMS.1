
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { useLanguage } from "@/contexts/LanguageContext";

export function JobTitleField() {
  const { language } = useLanguage();
  const form = useFormContext();
  
  return (
    <FormField
      control={form.control}
      name="job_title"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {language === 'en' ? 'Job Title' : 
             language === 'th' ? 'ตำแหน่งงาน' : 
             'Berufsbezeichnung'}
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
