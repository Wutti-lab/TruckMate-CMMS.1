import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { FileUpload } from "@/components/inspections/FileUpload";
import { useToast } from "@/hooks/use-toast";
import { FileImage, FileText, Camera, Eye, HearingTest, TestTube } from "lucide-react";

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
  license4: z.boolean(),
  license3File: createFileSchema(),
  license4File: z.any().optional(),
  medicalExamFile: createFileSchema(),
  visionTestFile: createFileSchema(),
  colorBlindTestFile: createFileSchema(),
  hearingTestFile: createFileSchema(),
  drugTestFile: createFileSchema()
});

type DriverFormValues = z.infer<typeof driverFormSchema>;

interface UploadFile {
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

  const renderFilePreview = (file: UploadFile) => {
    if (file.type.includes('image')) {
      return (
        <div className="p-2 bg-gray-50 rounded-md border">
          <img 
            src={file.url} 
            alt={file.name} 
            className="max-h-24 max-w-full rounded-sm object-contain" 
          />
        </div>
      );
    } else if (file.type.includes('pdf')) {
      return (
        <div className="p-2 bg-gray-50 rounded-md border flex items-center gap-2">
          <FileText className="text-red-500" />
          <span className="text-sm truncate max-w-[200px]">{file.name}</span>
        </div>
      );
    } else {
      return (
        <div className="p-2 bg-gray-50 rounded-md border flex items-center gap-2">
          <FileText />
          <span className="text-sm truncate max-w-[200px]">{file.name}</span>
        </div>
      );
    }
  };

  const renderUploadSection = (
    fieldName: keyof typeof uploadedFiles, 
    icon: React.ReactNode, 
    isRequired: boolean = true
  ) => {
    const files = uploadedFiles[fieldName];
    
    return (
      <div className="mt-2 space-y-2">
        <div className="pl-6">
          {files.length > 0 ? (
            <div className="space-y-2">
              {files.map((file, i) => (
                <div key={i} className="flex items-center gap-2">
                  {renderFilePreview(file)}
                  <Button 
                    type="button" 
                    variant="destructive" 
                    size="sm" 
                    onClick={() => {
                      setUploadedFiles(prev => ({
                        ...prev,
                        [fieldName]: []
                      }));
                      form.setValue(fieldName as any, undefined);
                      form.trigger(fieldName as any);
                    }}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <FileUpload 
              onFilesSelected={handleFileChange(fieldName)} 
              accept=".pdf,.jpg,.jpeg,.png"
              icon={icon}
              required={isRequired}
            />
          )}
        </div>
        {isRequired && (
          <FormMessage>
            {form.formState.errors[fieldName]?.message as string}
          </FormMessage>
        )}
      </div>
    );
  };

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
                  <FormItem className="flex flex-col">
                    <div className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel className="!mt-0">Class 3 License | ใบขับขี่ประเภท 3</FormLabel>
                    </div>
                    <FormField
                      control={form.control}
                      name="license3File"
                      render={() => (
                        <FormItem>
                          {renderUploadSection("license3File", <FileImage size={16} />)}
                        </FormItem>
                      )}
                    />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="license4"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <div className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={(checked) => {
                          field.onChange(checked);
                          if (!checked) {
                            setUploadedFiles(prev => ({...prev, license4File: []}));
                            form.setValue("license4File", undefined);
                          }
                        }} />
                      </FormControl>
                      <FormLabel className="!mt-0">Class 4 License | ใบขับขี่ประเภท 4</FormLabel>
                    </div>
                    {field.value && (
                      <FormField
                        control={form.control}
                        name="license4File"
                        render={() => (
                          <FormItem>
                            {renderUploadSection("license4File", <FileImage size={16} />, false)}
                          </FormItem>
                        )}
                      />
                    )}
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
                    <FormField
                      control={form.control}
                      name="medicalExamFile"
                      render={() => (
                        <FormItem>
                          {renderUploadSection("medicalExamFile", <Camera size={16} />)}
                        </FormItem>
                      )}
                    />
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
                    <FormField
                      control={form.control}
                      name="visionTestFile"
                      render={() => (
                        <FormItem>
                          {renderUploadSection("visionTestFile", <Eye size={16} />)}
                        </FormItem>
                      )}
                    />
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
                    <FormField
                      control={form.control}
                      name="colorBlindTestFile"
                      render={() => (
                        <FormItem>
                          {renderUploadSection("colorBlindTestFile", <Eye size={16} />)}
                        </FormItem>
                      )}
                    />
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
                    <FormField
                      control={form.control}
                      name="hearingTestFile"
                      render={() => (
                        <FormItem>
                          {renderUploadSection("hearingTestFile", <HearingTest size={16} />)}
                        </FormItem>
                      )}
                    />
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
                    <FormField
                      control={form.control}
                      name="drugTestFile"
                      render={() => (
                        <FormItem>
                          {renderUploadSection("drugTestFile", <TestTube size={16} />)}
                        </FormItem>
                      )}
                    />
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
