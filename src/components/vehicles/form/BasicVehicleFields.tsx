
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage, extractLanguageText } from "@/contexts/LanguageContext";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

const vehicleSchema = z.object({
  id: z.string().min(1, "License plate is required | ต้องระบุป้ายทะเบียน | Kennzeichen ist erforderlich"),
  driver: z.string().min(1, "Driver is required | ต้องระบุชื่อคนขับ | Fahrer ist erforderlich"),
  model: z.string().min(1, "Model is required | ต้องระบุรุ่น | Modell ist erforderlich"),
  location: z.string().min(1, "Location is required | ต้องระบุสถานที่ | Standort ist erforderlich"),
  status: z.string().min(1, "Status is required | ต้องระบุสถานะ | Status ist erforderlich"),
  batteryLevel: z.coerce.number().min(0).max(100).optional(),
  fuelLevel: z.coerce.number().min(0).max(100).optional(),
  engineTemp: z.coerce.number().min(0).max(150).default(80),
  lastService: z.string().min(1, "Last service is required | ต้องระบุวันที่บริการล่าสุด | Letzte Wartung ist erforderlich"),
  nextService: z.string().min(1, "Next service is required | ต้องระบุวันที่บริการถัดไป | Nächste Wartung ist erforderlich"),
});

export type VehicleFormValues = z.infer<typeof vehicleSchema>;

interface BasicVehicleFieldsProps {
  form: UseFormReturn<VehicleFormValues>;
}

export function BasicVehicleFields({ form }: BasicVehicleFieldsProps) {
  const { language } = useLanguage();
  
  return (
    <>
      <FormField
        control={form.control}
        name="id"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{extractLanguageText("License Plate | ป้ายทะเบียน | Kennzeichen", language)}</FormLabel>
            <FormControl>
              <Input placeholder={extractLanguageText("e.g. BKK-123 | เช่น BKK-123 | z.B. B-FR-123", language)} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="driver"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{extractLanguageText("Driver | คนขับ | Fahrer", language)}</FormLabel>
            <FormControl>
              <Input placeholder={extractLanguageText("Driver name | ชื่อคนขับ | Fahrername", language)} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="model"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{extractLanguageText("Model | รุ่น | Modell", language)}</FormLabel>
            <FormControl>
              <Input placeholder={extractLanguageText("e.g. Tesla Model Y | เช่น Tesla Model Y | z.B. Tesla Model Y", language)} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="location"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{extractLanguageText("Location | สถานที่ | Standort", language)}</FormLabel>
            <FormControl>
              <Input placeholder={extractLanguageText("e.g. Bangkok | เช่น กรุงเทพฯ | z.B. Berlin", language)} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="status"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{extractLanguageText("Status | สถานะ | Status", language)}</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={extractLanguageText("Select status | เลือกสถานะ | Status auswählen", language)} />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-white">
                <SelectItem value="Active">{extractLanguageText("Active | ใช้งาน | Aktiv", language)}</SelectItem>
                <SelectItem value="Inactive">{extractLanguageText("Inactive | ไม่ใช้งาน | Inaktiv", language)}</SelectItem>
                <SelectItem value="Maintenance">{extractLanguageText("Maintenance | ซ่อมบำรุง | Wartung", language)}</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}

export { vehicleSchema };
