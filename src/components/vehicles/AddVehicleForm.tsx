
import { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";

const vehicleSchema = z.object({
  id: z.string().min(1, "Kennzeichen ist erforderlich | License plate is required"),
  driver: z.string().min(1, "Fahrer ist erforderlich | Driver is required"),
  model: z.string().min(1, "Modell ist erforderlich | Model is required"),
  location: z.string().min(1, "Standort ist erforderlich | Location is required"),
  status: z.string().min(1, "Status ist erforderlich | Status is required"),
  batteryLevel: z.coerce.number().min(0).max(100).optional(),
  fuelLevel: z.coerce.number().min(0).max(100).optional(),
  engineTemp: z.coerce.number().min(0).max(150).default(80),
  lastService: z.string().min(1, "Letzter Service ist erforderlich | Last service is required"),
  nextService: z.string().min(1, "Nächster Service ist erforderlich | Next service is required"),
});

type VehicleFormValues = z.infer<typeof vehicleSchema>;

interface AddVehicleFormProps {
  onSubmit: (data: VehicleFormValues) => void;
  onCancel: () => void;
}

export function AddVehicleForm({ onSubmit, onCancel }: AddVehicleFormProps) {
  const { toast } = useToast();
  const [vehicleType, setVehicleType] = useState<"electric" | "fuel">("electric");

  const form = useForm<VehicleFormValues>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: {
      id: "",
      driver: "",
      model: "",
      location: "Berlin, Mitte",
      status: "Aktiv",
      batteryLevel: vehicleType === "electric" ? 100 : 0,
      fuelLevel: vehicleType === "fuel" ? 100 : 0,
      engineTemp: 80,
      lastService: new Date().toLocaleDateString("de-DE"),
      nextService: new Date(new Date().setMonth(new Date().getMonth() + 6)).toLocaleDateString("de-DE"),
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
      title: "Fahrzeug hinzugefügt | Vehicle added",
      description: `${values.model} (${values.id}) wurde erfolgreich hinzugefügt | was successfully added`,
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
                <FormLabel>Kennzeichen | License Plate</FormLabel>
                <FormControl>
                  <Input placeholder="z.B. B-FR-123" {...field} />
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
                <FormLabel>Fahrer | Driver</FormLabel>
                <FormControl>
                  <Input placeholder="Name des Fahrers" {...field} />
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
                <FormLabel>Modell | Model</FormLabel>
                <FormControl>
                  <Input placeholder="z.B. Tesla Model Y" {...field} />
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
                <FormLabel>Standort | Location</FormLabel>
                <FormControl>
                  <Input placeholder="z.B. Berlin, Mitte" {...field} />
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
                <FormLabel>Status | สถานะ</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Status auswählen" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white">
                    <SelectItem value="Aktiv">Aktiv | Active</SelectItem>
                    <SelectItem value="Inaktiv">Inaktiv | Inactive</SelectItem>
                    <SelectItem value="Wartung">Wartung | Maintenance</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormItem>
            <FormLabel>Fahrzeugtyp | Vehicle Type</FormLabel>
            <Select onValueChange={handleVehicleTypeChange} defaultValue="electric">
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Typ auswählen" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-white">
                <SelectItem value="electric">Elektrisch | Electric</SelectItem>
                <SelectItem value="fuel">Kraftstoff | Fuel</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
          {vehicleType === "electric" ? (
            <FormField
              control={form.control}
              name="batteryLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Batteriestand | Battery Level (%)</FormLabel>
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
                  <FormLabel>Kraftstoffstand | Fuel Level (%)</FormLabel>
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
                <FormLabel>Motortemperatur | Engine Temperature (°C)</FormLabel>
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
                <FormLabel>Letzter Service | Last Service</FormLabel>
                <FormControl>
                  <Input placeholder="DD.MM.YYYY" {...field} />
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
                <FormLabel>Nächster Service | Next Service</FormLabel>
                <FormControl>
                  <Input placeholder="DD.MM.YYYY" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" type="button" onClick={onCancel}>
            Abbrechen | Cancel
          </Button>
          <Button type="submit" className="bg-fleet-500">
            Fahrzeug hinzufügen | Add Vehicle
          </Button>
        </div>
      </form>
    </Form>
  );
}
