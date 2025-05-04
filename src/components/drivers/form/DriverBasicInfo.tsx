
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { DriverFormValues } from "../AddDriverForm";

interface DriverBasicInfoProps {
  form: UseFormReturn<DriverFormValues>;
}

export function DriverBasicInfo({ form }: DriverBasicInfoProps) {
  return (
    <>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name | ชื่อ *</FormLabel>
            <FormControl>
              <Input placeholder="Enter driver name..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="licenseNumber"
        render={({ field }) => (
          <FormItem>
            <FormLabel>License Number | หมายเลขใบอนุญาต *</FormLabel>
            <FormControl>
              <Input placeholder="Enter license number..." {...field} />
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
            <FormLabel>Phone Number | หมายเลขโทรศัพท์ *</FormLabel>
            <FormControl>
              <Input placeholder="+66 XX XXX XXXX" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
