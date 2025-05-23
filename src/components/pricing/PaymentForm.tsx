import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";
import { FileUpload } from "@/components/inspections/FileUpload";
import { useToast } from "@/hooks/use-toast";
import { Send, FileText } from "lucide-react";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ThaiPaymentDetails } from "./ThaiPaymentDetails";

interface PaymentFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  planTitle: string;
}

// Create a schema for form validation
const formSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email({ message: "Must be a valid email address" }),
  phone: z.string().min(5, { message: "Phone number is required" }),
  address: z.string().min(5, { message: "Address is required" }),
  company: z.string().min(1, { message: "Company name is required" }),
});

export function PaymentForm({
  open,
  onOpenChange,
  onSuccess,
  planTitle,
}: PaymentFormProps) {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isSending, setIsSending] = useState(false);
  
  // Initialize form with react-hook-form and zod validation
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      company: "",
    },
  });
  
  const handleFilesSelected = (files: File[]) => {
    setUploadedFiles(files);
  };
  
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (uploadedFiles.length === 0) {
      toast({
        title: t("noFilesSelected"),
        description: t("pleaseSelectProofFile"),
        variant: "destructive",
      });
      return;
    }
    
    setIsSending(true);
    
    console.log("Form data:", data);
    console.log("Files to be sent:", uploadedFiles);
    
    // In a real implementation, you would send an email with FormData including the attachments
    // Simulating email sending - in production, you would use a server endpoint or service
    setTimeout(() => {
      setIsSending(false);
      toast({
        title: t("proofSent"),
        description: t("proofSentDescription"),
      });
      
      // Clear form and uploaded files
      form.reset();
      setUploadedFiles([]);
      
      // Call success callback
      onSuccess();
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            {t("buyNow")}: {planTitle}
          </DialogTitle>
        </DialogHeader>
        
        {/* Payment Details Section */}
        <div className="mb-4">
          <ThaiPaymentDetails />
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("name")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("fullName")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("email")}</FormLabel>
                  <FormControl>
                    <Input placeholder="email@example.com" type="email" {...field} />
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
                  <FormLabel>{t("phone")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("contactNumber")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("address")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("fullAddress")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("company")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("companyName")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="space-y-2">
              <Label>{t("uploadPaymentProof")}</Label>
              <FileUpload
                onFilesSelected={handleFilesSelected}
                accept=".pdf,.jpg,.jpeg,.png"
                icon={<FileText className="h-6 w-6 text-muted-foreground" />}
              />
              
              {uploadedFiles.length > 0 && (
                <div className="text-sm text-center text-green-600">
                  {uploadedFiles.length} {t("fileSelected")}
                </div>
              )}
            </div>
            
            <div className="pt-4">
              <Button 
                type="submit"
                className="w-full"
                disabled={isSending}
              >
                {isSending ? t("sending") : t("sendPaymentProof")}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
