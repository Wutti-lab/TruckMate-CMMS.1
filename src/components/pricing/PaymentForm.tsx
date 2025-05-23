
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ThaiPaymentDetails } from "./ThaiPaymentDetails";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { PaymentFormFields } from "./form/PaymentFormFields";
import { PaymentProofUpload } from "./form/PaymentProofUpload";
import { paymentFormSchema, PaymentFormData } from "./form/PaymentFormSchema";

interface PaymentFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  planTitle: string;
}

export function PaymentForm({
  open,
  onOpenChange,
  onSuccess,
  planTitle,
}: PaymentFormProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isSending, setIsSending] = useState(false);
  
  // Initialize form with react-hook-form and zod validation
  const form = useForm<PaymentFormData>({
    resolver: zodResolver(paymentFormSchema),
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
  
  const onSubmit = async (data: PaymentFormData) => {
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
        
        <Alert variant="warning" className="mb-4">
          <AlertTitle>{t("photoProofRequired")}</AlertTitle>
          <AlertDescription>
            {t("photoProofInstructions")}
          </AlertDescription>
        </Alert>
        
        {/* Payment Details Section */}
        <div className="mb-4">
          <ThaiPaymentDetails />
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <PaymentFormFields form={form} />
            
            <PaymentProofUpload 
              onFilesSelected={handleFilesSelected}
              uploadedFiles={uploadedFiles}
            />
            
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
