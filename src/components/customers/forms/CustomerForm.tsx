
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Customer } from "@/lib/types/customer-types";
import { useLanguage } from "@/contexts/LanguageContext";
import { CustomerFormFields } from "./CustomerFormFields";

// Schema for customer form
const customerSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  company: z.string().min(1, { message: "Company name is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(6, { message: "Please enter a valid phone number" }),
  country: z.string().min(1, { message: "Country is required" })
});

export type CustomerFormValues = z.infer<typeof customerSchema>;

interface CustomerFormProps {
  customer: Customer | null;
  onSubmit: (values: CustomerFormValues) => void;
  onCancel: () => void;
}

export function CustomerForm({ customer, onSubmit, onCancel }: CustomerFormProps) {
  const { language } = useLanguage();
  const isEditing = !!customer;
  
  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: customer?.name || '',
      company: customer?.company || '',
      email: customer?.email || '',
      phone: customer?.phone || '',
      country: customer?.country || ''
    }
  });

  const translations = {
    cancel: language === 'de' ? 'Abbrechen' : 
            language === 'th' ? 'ยกเลิก' : 
            'Cancel',
    save: language === 'de' ? 'Speichern' : 
          language === 'th' ? 'บันทึก' : 
          'Save'
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <CustomerFormFields />
        
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 gap-2 sm:gap-0 pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
          >
            {translations.cancel}
          </Button>
          <Button 
            type="submit"
            className="bg-fleet-600 hover:bg-fleet-700"
          >
            {translations.save}
          </Button>
        </div>
      </form>
    </Form>
  );
}
