
import { useState } from "react";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage, extractLanguageText } from "@/contexts/LanguageContext";
import { BasicVehicleFields, vehicleSchema, VehicleFormValues } from "./form/BasicVehicleFields";
import { VehicleTypeSelector } from "./form/VehicleTypeSelector";
import { PowerFields } from "./form/PowerFields";
import { ServiceFields } from "./form/ServiceFields";

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
          <BasicVehicleFields form={form} />
          <VehicleTypeSelector defaultValue={vehicleType} onChange={handleVehicleTypeChange} />
          <PowerFields form={form} vehicleType={vehicleType} />
          <ServiceFields form={form} />
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

export type { VehicleFormValues };
