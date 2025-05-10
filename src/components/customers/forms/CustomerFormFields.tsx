
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { useFormContext } from "react-hook-form";

export function CustomerFormFields() {
  const { language } = useLanguage();
  const form = useFormContext();

  const translations = {
    name: language === 'de' ? 'Name' : 
          language === 'th' ? 'ชื่อ' : 
          'Name',
    company: language === 'de' ? 'Firma' : 
             language === 'th' ? 'บริษัท' : 
             'Company',
    email: language === 'de' ? 'E-Mail' : 
           language === 'th' ? 'อีเมล' : 
           'Email',
    phone: language === 'de' ? 'Telefon' : 
           language === 'th' ? 'โทรศัพท์' : 
           'Phone',
    country: language === 'de' ? 'Land' : 
             language === 'th' ? 'ประเทศ' : 
             'Country',
  };

  return (
    <>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{translations.name}</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="company"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{translations.company}</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{translations.email}</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{translations.phone}</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="country"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{translations.country}</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
