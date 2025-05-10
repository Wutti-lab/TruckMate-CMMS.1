
import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
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

// Schema for customer form
const customerSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  company: z.string().min(1, { message: "Company name is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(6, { message: "Please enter a valid phone number" }),
  country: z.string().min(1, { message: "Country is required" })
});

type FormValues = z.infer<typeof customerSchema>;

interface CustomerDialogProps {
  customer: Customer | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (values: FormValues) => void;
}

export function CustomerDialog({
  customer,
  open,
  onOpenChange,
  onSave
}: CustomerDialogProps) {
  const { language } = useLanguage();
  const isEditing = !!customer;

  const form = useForm<FormValues>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      id: customer?.id || '',
      name: customer?.name || '',
      company: customer?.company || '',
      email: customer?.email || '',
      phone: customer?.phone || '',
      country: customer?.country || ''
    }
  });

  // Update form when customer changes
  useState(() => {
    if (customer) {
      form.reset({
        id: customer.id,
        name: customer.name,
        company: customer.company,
        email: customer.email,
        phone: customer.phone,
        country: customer.country
      });
    } else {
      form.reset({
        id: '',
        name: '',
        company: '',
        email: '',
        phone: '',
        country: ''
      });
    }
  });

  function onSubmit(data: FormValues) {
    onSave(data);
    onOpenChange(false);
  }

  const translations = {
    title: isEditing 
      ? language === 'de' ? 'Kunde bearbeiten' : 'Edit Customer'
      : language === 'de' ? 'Neuen Kunden hinzufügen' : 'Add New Customer',
    description: isEditing
      ? language === 'de' 
        ? 'Bearbeiten Sie die Kundeninformationen unten'
        : 'Edit customer information below'
      : language === 'de'
        ? 'Fügen Sie die Kundeninformationen hinzu'
        : 'Add customer information below',
    name: language === 'de' ? 'Name' : 'Name',
    company: language === 'de' ? 'Firma' : 'Company',
    email: language === 'de' ? 'E-Mail' : 'Email',
    phone: language === 'de' ? 'Telefon' : 'Phone',
    country: language === 'de' ? 'Land' : 'Country',
    cancel: language === 'de' ? 'Abbrechen' : 'Cancel',
    save: language === 'de' ? 'Speichern' : 'Save'
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{translations.title}</DialogTitle>
          <DialogDescription>{translations.description}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

            <DialogFooter className="gap-2 sm:gap-0 pt-4">
              <Button
                type="button"
                variant="secondary"
                onClick={() => onOpenChange(false)}
              >
                {translations.cancel}
              </Button>
              <Button 
                type="submit"
                className="bg-fleet-600 hover:bg-fleet-700"
              >
                {translations.save}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
