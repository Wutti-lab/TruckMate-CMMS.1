
import React from "react";
import { Input } from "@/components/ui/input";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useLanguage } from "@/contexts/LanguageContext";
import { UseFormReturn } from "react-hook-form";
import { PaymentFormData } from "./PaymentFormSchema";

interface PaymentFormFieldsProps {
  form: UseFormReturn<PaymentFormData>;
}

export function PaymentFormFields({ form }: PaymentFormFieldsProps) {
  const { t } = useLanguage();

  return (
    <>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem className="mb-2">
            <FormLabel className="text-sm mb-1">{t("name")}</FormLabel>
            <FormControl>
              <Input placeholder={t("fullName")} {...field} className="h-8 text-sm" />
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem className="mb-2">
            <FormLabel className="text-sm mb-1">{t("email")}</FormLabel>
            <FormControl>
              <Input placeholder="email@example.com" type="email" {...field} className="h-8 text-sm" />
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem className="mb-2">
            <FormLabel className="text-sm mb-1">{t("phone")}</FormLabel>
            <FormControl>
              <Input placeholder={t("contactNumber")} {...field} className="h-8 text-sm" />
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="address"
        render={({ field }) => (
          <FormItem className="mb-2">
            <FormLabel className="text-sm mb-1">{t("address")}</FormLabel>
            <FormControl>
              <Input placeholder={t("fullAddress")} {...field} className="h-8 text-sm" />
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="company"
        render={({ field }) => (
          <FormItem className="mb-2">
            <FormLabel className="text-sm mb-1">{t("company")}</FormLabel>
            <FormControl>
              <Input placeholder={t("companyName")} {...field} className="h-8 text-sm" />
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
    </>
  );
}
