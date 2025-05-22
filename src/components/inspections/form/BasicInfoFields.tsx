
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "./inspectionFormTypes";

interface BasicInfoFieldsProps {
  form: UseFormReturn<FormValues>;
  vehicles: { id: string; name: string }[];
  inspectionTypes: { id: string; name: string }[];
}

export function BasicInfoFields({ form, vehicles, inspectionTypes }: BasicInfoFieldsProps) {
  return (
    <>
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Inspection Title | ชื่อการตรวจสอบ</FormLabel>
            <FormControl>
              <Input placeholder="Enter inspection title | ใส่ชื่อการตรวจสอบ" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="vehicleId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vehicle | ยานพาหนะ</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select vehicle | เลือกยานพาหนะ" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {vehicles.map((vehicle) => (
                    <SelectItem key={vehicle.id} value={vehicle.id}>
                      {vehicle.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="inspectionType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Inspection Type | ประเภทการตรวจสอบ</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select inspection type | เลือกประเภทการตรวจสอบ" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {inspectionTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
}
