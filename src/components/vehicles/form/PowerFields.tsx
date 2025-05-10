
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useLanguage, extractLanguageText } from "@/contexts/LanguageContext";
import { UseFormReturn } from "react-hook-form";
import { VehicleFormValues } from "./BasicVehicleFields";

interface PowerFieldsProps {
  form: UseFormReturn<VehicleFormValues>;
  vehicleType: "electric" | "fuel" | "hybrid";
}

export function PowerFields({ form, vehicleType }: PowerFieldsProps) {
  const { language } = useLanguage();
  
  return (
    <>
      {(vehicleType === "electric" || vehicleType === "hybrid") && (
        <FormField
          control={form.control}
          name="batteryLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{extractLanguageText("Battery Level | ระดับแบตเตอรี่ (%) | Batteriestand (%)", language)}</FormLabel>
              <FormControl>
                <Input type="number" min="0" max="100" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      {(vehicleType === "fuel" || vehicleType === "hybrid") && (
        <FormField
          control={form.control}
          name="fuelLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{extractLanguageText("Fuel Level | ระดับน้ำมัน (%) | Kraftstoffstand (%)", language)}</FormLabel>
              <FormControl>
                <Input type="number" min="0" max="100" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      <FormField
        control={form.control}
        name="engineTemp"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{extractLanguageText("Engine Temperature | อุณหภูมิเครื่องยนต์ (°C) | Motortemperatur (°C)", language)}</FormLabel>
            <FormControl>
              <Input type="number" min="0" max="150" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
