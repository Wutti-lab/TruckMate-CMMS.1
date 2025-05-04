
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { DriverBasicInfo } from "./form/DriverBasicInfo";
import { LicenseSection } from "./form/LicenseSection";
import { MedicalExamSection } from "./form/MedicalExamSection";

// File validation schemas
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/jpg", 
  "image/png",
  "application/pdf"
];

// Helper function to create file schema
const createFileSchema = () => 
  z.any()
    .refine((files) => files?.length >= 1, "File is required")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB`
    )
    .refine(
      (files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png, and .pdf files are accepted"
    );

// Form schema
export const driverFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  licenseNumber: z.string().min(2, "License number is required"),
  phone: z.string().min(9, "Valid phone number is required"),
  medicalExam: z.boolean(),
  visionTest: z.boolean(),
  colorBlindTest: z.boolean(),
  hearingTest: z.boolean(),
  drugTest: z.boolean(),
  license3: z.boolean(),
  license4: z.boolean(),
  license3File: createFileSchema(),
  license4File: z.any().optional(),
  medicalExamFile: createFileSchema(),
  visionTestFile: createFileSchema(),
  colorBlindTestFile: createFileSchema(),
  hearingTestFile: createFileSchema(),
  drugTestFile: createFileSchema()
});

export type DriverFormValues = z.infer<typeof driverFormSchema>;

export interface UploadFile {
  name: string;
  url: string;
  type: string;
}

export function AddDriverForm() {
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
      medicalExam: true,
      visionTest: true,
      colorBlindTest: true,
      hearingTest: true,
      drugTest: true,
      license3: true,
      license4: false
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
      title: "Driver information saved",
      description: "The driver has been added successfully"
    });
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
        </div>

        <Button type="submit" className="w-full bg-fleet-500">
          Add Driver | เพิ่มคนขับ
        </Button>
      </form>
    </Form>
  );
}
