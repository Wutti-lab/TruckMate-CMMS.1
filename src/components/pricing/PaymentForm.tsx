
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
import { sendEmailWithAttachment } from "./utils/emailService";
import { Loader2 } from "lucide-react";

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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
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
    setErrorMessage(null); // Clear any error when files are selected
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
    
    setErrorMessage(null);
    setIsSending(true);
    
    console.log("Form data:", data);
    console.log("Files to be sent:", uploadedFiles);
    
    try {
      // Send email with attachment
      const emailSent = await sendEmailWithAttachment({
        formData: data,
        files: uploadedFiles,
        planName: planTitle
      });
      
      setIsSending(false);
      
      if (emailSent) {
        toast({
          title: t("proofSent"),
          description: t("proofSentDescription"),
        });
        
        // Clear form and uploaded files
        form.reset();
        setUploadedFiles([]);
        
        // Call success callback
        onSuccess();
      } else {
        throw new Error("Email sending failed");
      }
    } catch (error) {
      setIsSending(false);
      console.error("Error sending payment proof:", error);
      
      setErrorMessage(t("emailSendingFailed"));
      
      toast({
        title: t("emailSendingFailed"),
        description: t("emailSendingFailedDescription"),
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center">
            {t("buyNow")}: {planTitle}
          </DialogTitle>
        </DialogHeader>
        
        <Alert variant="warning" className="mb-2 py-2">
          <AlertTitle className="text-sm">{t("photoProofRequired")}</AlertTitle>
          <AlertDescription className="text-xs">
            {t("photoProofInstructions")}
          </AlertDescription>
        </Alert>
        
        {errorMessage && (
          <Alert variant="destructive" className="mb-2">
            <AlertTitle>{t("emailSendingFailed")}</AlertTitle>
            <AlertDescription className="text-xs">
              {t("emailSendingFailedDescription")}
            </AlertDescription>
          </Alert>
        )}
        
        {/* Payment Details Section */}
        <div className="mb-3">
          <ThaiPaymentDetails />
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <PaymentFormFields form={form} />
            
            <PaymentProofUpload 
              onFilesSelected={handleFilesSelected}
              uploadedFiles={uploadedFiles}
            />
            
            <div className="pt-2">
              <Button 
                type="submit"
                className="w-full"
                disabled={isSending}
              >
                {isSending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t("sending")}
                  </>
                ) : (
                  t("sendPaymentProof")
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
