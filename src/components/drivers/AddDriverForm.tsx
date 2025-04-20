
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Camera } from "lucide-react";

const driverFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  licenseNumber: z.string().min(2, "License number is required"),
  phone: z.string().min(9, "Valid phone number is required"),
  medicalExam: z.boolean(),
  visionTest: z.boolean(),
  colorBlindTest: z.boolean(),
  hearingTest: z.boolean(),
  drugTest: z.boolean(),
  license3: z.boolean(),
  license4: z.boolean()
});

type DriverFormValues = z.infer<typeof driverFormSchema>;

export function AddDriverForm() {
  const form = useForm<DriverFormValues>({
    resolver: zodResolver(driverFormSchema),
    defaultValues: {
      medicalExam: false,
      visionTest: false,
      colorBlindTest: false,
      hearingTest: false,
      drugTest: false,
      license3: false,
      license4: false
    }
  });

  function onSubmit(data: DriverFormValues) {
    console.log(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-6">
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

          <div className="space-y-4">
            <h3 className="font-semibold">License & Qualification | ใบอนุญาตและคุณสมบัติ</h3>
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="license3"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel className="!mt-0">Class 3 License | ใบขับขี่ประเภท 3</FormLabel>
                  </FormItem>
                )}
              />
              <div className="pl-6">
                <Button type="button" variant="outline" size="sm" className="gap-2">
                  <Camera size={16} />
                  Upload License Photo | อัปโหลดรูปใบอนุญาต
                </Button>
              </div>

              <FormField
                control={form.control}
                name="license4"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel className="!mt-0">Class 4 License | ใบขับขี่ประเภท 4</FormLabel>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Medical Examinations | การตรวจสุขภาพ</h3>
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="medicalExam"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <div className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel className="!mt-0">Medical Examination | การตรวจร่างกาย</FormLabel>
                    </div>
                    <div className="pl-6 mt-2">
                      <Button type="button" variant="outline" size="sm" className="gap-2">
                        <Camera size={16} />
                        Upload Medical Certificate | อัปโหลดใบรับรองแพทย์
                      </Button>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="visionTest"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <div className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel className="!mt-0">Vision Test | การทดสอบสายตา</FormLabel>
                    </div>
                    <div className="pl-6 mt-2">
                      <Button type="button" variant="outline" size="sm" className="gap-2">
                        <Camera size={16} />
                        Upload Vision Test Results | อัปโหลดผลการทดสอบสายตา
                      </Button>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="colorBlindTest"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <div className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel className="!mt-0">Color Blindness Test | การทดสอบตาบอดสี</FormLabel>
                    </div>
                    <div className="pl-6 mt-2">
                      <Button type="button" variant="outline" size="sm" className="gap-2">
                        <Camera size={16} />
                        Upload Color Test Results | อัปโหลดผลการทดสอบตาบอดสี
                      </Button>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hearingTest"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <div className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel className="!mt-0">Hearing Test | การทดสอบการได้ยิน</FormLabel>
                    </div>
                    <div className="pl-6 mt-2">
                      <Button type="button" variant="outline" size="sm" className="gap-2">
                        <Camera size={16} />
                        Upload Hearing Test Results | อัปโหลดผลการทดสอบการได้ยิน
                      </Button>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="drugTest"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <div className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel className="!mt-0">Drug Test | การทดสอบยา</FormLabel>
                    </div>
                    <div className="pl-6 mt-2">
                      <Button type="button" variant="outline" size="sm" className="gap-2">
                        <Camera size={16} />
                        Upload Drug Test Results | อัปโหลดผลการทดสอบยา
                      </Button>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full bg-fleet-500">
          Add Driver | เพิ่มคนขับ
        </Button>
      </form>
    </Form>
  );
}
