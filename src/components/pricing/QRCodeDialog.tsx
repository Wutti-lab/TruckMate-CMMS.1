
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";
import { FileUpload } from "@/components/inspections/FileUpload";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";

interface QRCodeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirmPayment: () => void;
}

export function QRCodeDialog({
  open,
  onOpenChange,
  onConfirmPayment,
}: QRCodeDialogProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isSending, setIsSending] = useState(false);
  
  const handleFilesSelected = (files: File[]) => {
    setUploadedFiles(files);
  };
  
  const handleSendProof = async () => {
    if (uploadedFiles.length === 0) {
      toast({
        title: t("noFilesSelected"),
        description: t("pleaseSelectProofFile"),
        variant: "destructive",
      });
      return;
    }
    
    setIsSending(true);
    
    // Simulate sending email with attachment
    // In a real implementation, this would connect to a backend API
    setTimeout(() => {
      setIsSending(false);
      toast({
        title: t("proofSent"),
        description: t("proofSentDescription"),
      });
      
      // Clear uploaded files after successful send
      setUploadedFiles([]);
      
      // Proceed with payment confirmation
      onConfirmPayment();
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            {t("scanQrToTransfer")}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="max-w-[250px] mx-auto">
            <img 
              src="/lovable-uploads/1227902a-2033-4df9-a3c7-382e79e5b997.png"
              alt="PromptPay QR Code" 
              className="w-full h-auto"
            />
          </div>
          
          <div className="text-center space-y-2">
            <p className="font-bold">
              {t("promptPay")}
            </p>
            <p>
              {t("phoneNumber")}
            </p>
          </div>
          
          <div className="border-t w-full pt-4 mt-2">
            <p className="text-sm text-center text-gray-500 mb-2">
              {t("afterTransferring")}
            </p>
            
            <div className="mt-3 space-y-3">
              <p className="text-sm font-medium text-center">
                {t("uploadPaymentProof")}
              </p>
              
              <FileUpload
                onFilesSelected={handleFilesSelected}
                accept=".pdf,.jpg,.jpeg,.png"
                icon={<Send className="h-6 w-6 text-muted-foreground" />}
              />
              
              {uploadedFiles.length > 0 && (
                <div className="text-sm text-center text-green-600">
                  {uploadedFiles.length} {t("fileSelected")}
                </div>
              )}
            </div>
          </div>
          
          <div className="flex flex-col w-full gap-2 mt-2">
            <Button 
              onClick={handleSendProof}
              className="w-full"
              disabled={uploadedFiles.length === 0 || isSending}
            >
              {isSending ? t("sending") : t("sendPaymentProof")}
            </Button>
            
            <Button 
              onClick={onConfirmPayment}
              className="w-full"
              variant="outline"
            >
              {t("confirmPayment")}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
