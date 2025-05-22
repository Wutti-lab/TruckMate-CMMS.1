
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
} from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { BasicInfoFields } from "./form/BasicInfoFields";
import { NotesField } from "./form/NotesField";
import { DocumentsUpload } from "./form/DocumentsUpload";
import { FormActions } from "./form/FormActions";
import { formSchema, FormValues, vehicles, inspectionTypes } from "./form/inspectionFormTypes";

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

  const handleFilesChange = (updatedFiles: File[]) => {
    setFiles(updatedFiles);
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <BasicInfoFields 
              form={form} 
              vehicles={vehicles} 
              inspectionTypes={inspectionTypes} 
            />
            
            <NotesField form={form} />

            <DocumentsUpload onFilesChanged={handleFilesChange} />

            <FormActions isSubmitting={isSubmitting} />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
