
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFormContext } from "react-hook-form";
import { useLanguage } from "@/contexts/LanguageContext";

export function CustomerRoleField() {
  const { t } = useLanguage();
  const form = useFormContext();
  
  return (
    <FormField
      control={form.control}
      name="role"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t("role")}</FormLabel>
          <Select 
            onValueChange={field.onChange} 
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={t("selectRole")} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="admin">{t("adminRole")}</SelectItem>
              <SelectItem value="manager">{t("managerRole")}</SelectItem>
              <SelectItem value="user">{t("userRole")}</SelectItem>
              <SelectItem value="viewer">{t("viewerRole")}</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
