
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { DriverBasicInfo } from "./form/DriverBasicInfo";
import { LicenseSection } from "./form/LicenseSection";
import { MedicalExamSection } from "./form/MedicalExamSection";
import { driverFormSchema, DriverFormValues, UploadFile } from "./AddDriverForm";
import { Badge } from "@/components/ui/badge";

interface Driver {
  id: string;
  name: string;
  licenseType: string;
  phone: string;
  status: string;
  location: string;
  vehicle: string;
  lastTrip: string;
  hoursThisWeek: number;
  shift?: "AM" | "PM";
}

interface EditDriverFormProps {
  driver: Driver;
  onSuccess: () => void;
}

export function EditDriverForm({ driver, onSuccess }: EditDriverFormProps) {
  const { toast } = useToast();
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, UploadFile[]>>({
    license3File: [],
    license4File: [],
    medicalExamFile: [],
    visionTestFile: [],
    colorBlindTestFile: [],
    hearingTestFile: [],
    drugTestFile: []
  });

  const form = useForm<DriverFormValues>({
    resolver: zodResolver(driverFormSchema),
    defaultValues: {
      name: driver.name,
      licenseNumber: "", // This would be populated from API in a real app
      phone: driver.phone,
      medicalExam: true,
      visionTest: true,
      colorBlindTest: true,
      hearingTest: true,
      drugTest: true,
      license3: driver.licenseType.includes("3"),
      license4: driver.licenseType.includes("4")
    }
  });

  const handleFileChange = (fieldName: keyof typeof uploadedFiles) => (files: File[]) => {
    if (files.length > 0) {
      const file = files[0];
      const fileUrl = URL.createObjectURL(file);
      
      setUploadedFiles(prev => ({
        ...prev,
        [fieldName]: [{ 
          name: file.name, 
          url: fileUrl,
          type: file.type
        }]
      }));

      form.setValue(fieldName as any, files);
      form.trigger(fieldName as any);
    }
  };

  function onSubmit(data: DriverFormValues) {
    console.log("Form submitted with data:", data);
    
    toast({
      title: "Driver information updated",
      description: "The driver has been updated successfully"
    });
    
    onSuccess();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-6">
          <DriverBasicInfo form={form} />

          <div className="space-y-4">
            <h3 className="font-semibold">License & Qualification | ใบอนุญาตและคุณสมบัติ</h3>
            <LicenseSection 
              form={form} 
              uploadedFiles={uploadedFiles} 
              handleFileChange={handleFileChange} 
            />
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Medical Examinations | การตรวจสุขภาพ</h3>
            <MedicalExamSection 
              form={form} 
              uploadedFiles={uploadedFiles} 
              handleFileChange={handleFileChange} 
            />
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Status | สถานะ</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium mb-2">Current Status | สถานะปัจจุบัน:</p>
                <Badge
                  variant="outline"
                  className={
                    driver.status === "Active"
                      ? "border-green-200 bg-green-50 text-green-600"
                      : driver.status === "Off-duty"
                      ? "border-orange-200 bg-orange-50 text-orange-600"
                      : "border-red-200 bg-red-50 text-red-600"
                  }
                >
                  {driver.status}
                </Badge>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Current Shift | กะปัจจุบัน:</p>
                <Badge variant="outline">{driver.shift || "Not assigned"}</Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onSuccess}>
            Cancel | ยกเลิก
          </Button>
          <Button type="submit" className="bg-fleet-500">
            Update Driver | อัปเดตคนขับ
          </Button>
        </div>
      </form>
    </Form>
  );
}
