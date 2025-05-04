
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
  id: z.string().min(1, "License plate is required | ต้องระบุป้ายทะเบียน"),
  driver: z.string().min(1, "Driver is required | ต้องระบุชื่อคนขับ"),
  model: z.string().min(1, "Model is required | ต้องระบุรุ่น"),
  location: z.string().min(1, "Location is required | ต้องระบุสถานที่"),
  status: z.string().min(1, "Status is required | ต้องระบุสถานะ"),
  batteryLevel: z.coerce.number().min(0).max(100).optional(),
  fuelLevel: z.coerce.number().min(0).max(100).optional(),
  engineTemp: z.coerce.number().min(0).max(150).default(80),
  lastService: z.string().min(1, "Last service is required | ต้องระบุวันที่บริการล่าสุด"),
  nextService: z.string().min(1, "Next service is required | ต้องระบุวันที่บริการถัดไป"),
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
      title: "Vehicle added | เพิ่มยานพาหนะแล้ว",
      description: `${values.model} (${values.id}) was successfully added | เพิ่มเรียบร้อยแล้ว`,
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
                <FormLabel>License Plate | ป้ายทะเบียน</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. BKK-123" {...field} />
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
                <FormLabel>Driver | คนขับ</FormLabel>
                <FormControl>
                  <Input placeholder="Driver name" {...field} />
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
                <FormLabel>Model | รุ่น</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Tesla Model Y" {...field} />
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
                <FormLabel>Location | สถานที่</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Bangkok" {...field} />
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
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-white">
                    <SelectItem value="Active">Active | ใช้งาน</SelectItem>
                    <SelectItem value="Inactive">Inactive | ไม่ใช้งาน</SelectItem>
                    <SelectItem value="Maintenance">Maintenance | ซ่อมบำรุง</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormItem>
            <FormLabel>Vehicle Type | ประเภทยานพาหนะ</FormLabel>
            <Select onValueChange={handleVehicleTypeChange} defaultValue="electric">
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent className="bg-white">
                <SelectItem value="electric">Electric | ไฟฟ้า</SelectItem>
                <SelectItem value="fuel">Fuel | น้ำมัน</SelectItem>
              </SelectContent>
            </Select>
          </FormItem>
          {vehicleType === "electric" ? (
            <FormField
              control={form.control}
              name="batteryLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Battery Level | ระดับแบตเตอรี่ (%)</FormLabel>
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
                  <FormLabel>Fuel Level | ระดับน้ำมัน (%)</FormLabel>
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
                <FormLabel>Engine Temperature | อุณหภูมิเครื่องยนต์ (°C)</FormLabel>
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
                <FormLabel>Last Service | บริการล่าสุด</FormLabel>
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
                <FormLabel>Next Service | บริการถัดไป</FormLabel>
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
            Cancel | ยกเลิก
          </Button>
          <Button type="submit" className="bg-fleet-500">
            Add Vehicle | เพิ่มยานพาหนะ
          </Button>
        </div>
      </form>
    </Form>
  );
}
