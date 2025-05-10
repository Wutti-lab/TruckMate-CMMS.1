
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { useLanguage } from "@/contexts/LanguageContext";

export function PasswordField() {
  const { language } = useLanguage();
  const form = useFormContext();
  
  return (
    <FormField
      control={form.control}
      name="password"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {language === 'en' ? 'Password (leave blank to keep current)' : 
             language === 'th' ? 'รหัสผ่าน (เว้นว่างไว้เพื่อใช้รหัสปัจจุบัน)' : 
             'Passwort (leer lassen, um aktuelles beizubehalten)'}
          </FormLabel>
          <FormControl>
            <Input type="password" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
