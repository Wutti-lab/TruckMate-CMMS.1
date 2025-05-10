
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFormContext } from "react-hook-form";
import { useLanguage } from "@/contexts/LanguageContext";

export function RoleField() {
  const { language } = useLanguage();
  const form = useFormContext();
  
  return (
    <FormField
      control={form.control}
      name="role"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {language === 'en' ? 'Role' : 
             language === 'th' ? 'บทบาท' : 
             'Rolle'}
          </FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="dev_admin">Dev Admin</SelectItem>
              <SelectItem value="fleet_manager">Fleet Manager</SelectItem>
              <SelectItem value="driver">Driver</SelectItem>
              <SelectItem value="mechanic">Mechanic</SelectItem>
              <SelectItem value="dispatcher">Dispatcher</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
