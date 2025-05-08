import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { FileUpload } from "@/components/inspections/FileUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { FileText } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required | ต้องระบุชื่อเรื่อง",
  }),
  vehicleId: z.string().min(1, {
    message: "Vehicle is required | ต้องระบุยานพาหนะ",
  }),
  inspectionType: z.string().min(1, {
    message: "Inspection type is required | ต้องระบุประเภทการตรวจสอบ",
  }),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const vehicles = [
  { id: "v1", name: "Truck 001 - Toyota Hilux" },
  { id: "v2", name: "Truck 002 - Isuzu D-Max" },
  { id: "v3", name: "Van 001 - Toyota HiAce" },
  { id: "v4", name: "Van 002 - Hyundai H1" },
];

const inspectionTypes = [
  { id: "daily", name: "Daily Inspection | การตรวจสอบประจำวัน" },
  { id: "maintenance", name: "Maintenance Check | การตรวจสอบการบำรุงรักษา" },
  { id: "safety", name: "Safety Inspection | การตรวจสอบความปลอดภัย" },
  { id: "damage", name: "Damage Report | รายงานความเสียหาย" },
];

interface NewInspectionFormProps {
  onSubmitSuccess?: () => void;
}

export function NewInspectionForm({ onSubmitSuccess }: NewInspectionFormProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      vehicleId: "",
      inspectionType: "",
      notes: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // In a real application, you would upload the files to a server here
      console.log("Form data:", data);
      console.log("Files:", files);
      
      toast({
        title: "Inspection created | สร้างการตรวจสอบแล้ว",
        description: "Your inspection has been created successfully | การตรวจสอบของคุณถูกสร้างเรียบร้อยแล้ว",
      });
      
      // Reset form
      form.reset();
      setFiles([]);
      
      // Call onSubmitSuccess callback if provided
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    } catch (error) {
      console.error("Error creating inspection:", error);
      toast({
        title: "Error | ข้อผิดพลาด",
        description: "Failed to create inspection | ไม่สามารถสร้างการตรวจสอบได้",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (newFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const removeFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Inspection Title | ชื่อการตรวจสอบ</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter inspection title | ใส่ชื่อการตรวจสอบ" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="vehicleId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vehicle | ยานพาหนะ</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select vehicle | เลือกยานพาหนะ" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {vehicles.map((vehicle) => (
                          <SelectItem key={vehicle.id} value={vehicle.id}>
                            {vehicle.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="inspectionType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Inspection Type | ประเภทการตรวจสอบ</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select inspection type | เลือกประเภทการตรวจสอบ" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {inspectionTypes.map((type) => (
                          <SelectItem key={type.id} value={type.id}>
                            {type.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes | หมายเหตุ</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Add any additional notes here | เพิ่มหมายเหตุเพิ่มเติมที่นี่" 
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4">
              <div>
                <FormLabel className="block mb-2">
                  Documents | เอกสาร
                </FormLabel>
                <FileUpload onFilesSelected={handleFileChange} />
                <p className="text-sm text-muted-foreground mt-1">
                  Upload documents (PDF, Excel, Word) | อัปโหลดเอกสาร (PDF, Excel, Word)
                </p>
              </div>

              {files.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Attached Files | ไฟล์แนบ:</h4>
                  <div className="space-y-2">
                    {files.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-muted/50 p-2 rounded-md"
                      >
                        <div className="flex items-center gap-2">
                          <FileText size={16} className="text-muted-foreground" />
                          <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                          <span className="text-xs text-muted-foreground">
                            ({(file.size / 1024).toFixed(0)} KB)
                          </span>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(index)}
                        >
                          &times;
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting... | กำลังส่ง..." : "Create Inspection | สร้างการตรวจสอบ"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
