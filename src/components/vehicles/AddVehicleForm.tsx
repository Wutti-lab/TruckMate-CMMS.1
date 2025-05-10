
import { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage, extractLanguageText } from "@/contexts/LanguageContext";

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

type VehicleFormValues = z.infer<typeof vehicleSchema>;

interface AddVehicleFormProps {
  onSubmit: (data: VehicleFormValues) => void;
  onCancel: () => void;
}

export function AddVehicleForm({ onSubmit, onCancel }: AddVehicleFormProps) {
  const { toast } = useToast();
  const { language } = useLanguage();
  const [vehicleType, setVehicleType] = useState<"electric" | "fuel">("electric");

  const form = useForm<VehicleFormValues>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      id: "",
      driver: "",
      model: "",
      location: "Bangkok",
      status: "Active",
      batteryLevel: vehicleType === "electric" ? 100 : 0,
      fuelLevel: vehicleType === "fuel" ? 100 : 0,
      engineTemp: 80,
      lastService: new Date().toLocaleDateString(),
      nextService: new Date(new Date().setMonth(new Date().getMonth() + 6)).toLocaleDateString(),
    },
  });

  const handleVehicleTypeChange = (value: string) => {
    if (value === "electric") {
      setVehicleType("electric");
      form.setValue("batteryLevel", 100);
      form.setValue("fuelLevel", 0);
    } else {
      setVehicleType("fuel");
      form.setValue("batteryLevel", 0);
      form.setValue("fuelLevel", 100);
    }
  };

  const handleSubmit = (values: VehicleFormValues) => {
    onSubmit(values);
    toast({
      title: extractLanguageText("Vehicle added | เพิ่มยานพาหนะแล้ว | Fahrzeug hinzugefügt", language),
      description: extractLanguageText(`${values.model} (${values.id}) was successfully added | เพิ่มเรียบร้อยแล้ว | ${values.model} (${values.id}) wurde erfolgreich hinzugefügt`, language),
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{extractLanguageText("License Plate | ป้ายทะเบียน | Kennzeichen", language)}</FormLabel>
                <FormControl>
                  <Input placeholder={extractLanguageText("e.g. BKK-123 | เช่น BKK-123 | z.B. BKK-123", language)} {...field} />
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
                  <Input placeholder={extractLanguageText("e.g. Bangkok | เช่น กรุงเทพฯ | z.B. Bangkok", language)} {...field} />
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
          <FormItem>
            <FormLabel>{extractLanguageText("Vehicle Type | ประเภทยานพาหนะ | Fahrzeugtyp", language)}</FormLabel>
            <Select onValueChange={handleVehicleTypeChange} defaultValue="electric">
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder={extractLanguageText("Select type | เลือกประเภท | Typ auswählen", language)} />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-white">
                <SelectItem value="electric">{extractLanguageText("Electric | ไฟฟ้า | Elektrisch", language)}</SelectItem>
                <SelectItem value="fuel">{extractLanguageText("Fuel | น้ำมัน | Kraftstoff", language)}</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
          {vehicleType === "electric" ? (
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
          ) : (
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
          <FormField
            control={form.control}
            name="lastService"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{extractLanguageText("Last Service | บริการล่าสุด | Letzte Wartung", language)}</FormLabel>
                <FormControl>
                  <Input placeholder="MM/DD/YYYY" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nextService"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{extractLanguageText("Next Service | บริการถัดไป | Nächste Wartung", language)}</FormLabel>
                <FormControl>
                  <Input placeholder="MM/DD/YYYY" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" type="button" onClick={onCancel}>
            {extractLanguageText("Cancel | ยกเลิก | Abbrechen", language)}
          </Button>
          <Button type="submit" className="bg-fleet-500">
            {extractLanguageText("Add Vehicle | เพิ่มยานพาหนะ | Fahrzeug hinzufügen", language)}
          </Button>
        </div>
      </form>
    </Form>
  );
}
