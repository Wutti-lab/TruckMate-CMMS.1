
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { FileUpload } from "@/components/inspections/FileUpload";
import { useToast } from "@/hooks/use-toast";
import { ThaiPaymentDetails } from "@/components/pricing/ThaiPaymentDetails";

interface PaymentConfirmationProps {
  userEmail: string;
  onBack: () => void;
  onSubmit: () => void;
}

export function PaymentConfirmation({ userEmail, onBack, onSubmit }: PaymentConfirmationProps) {
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isSending, setIsSending] = useState(false);
  const { language, t } = useLanguage();
  const { toast } = useToast();
  
  const handleFilesSelected = (files: File[]) => {
    setUploadedFiles(files);
    // When files are uploaded, automatically check the confirmation checkbox
    if (files.length > 0) {
      setPaymentConfirmed(true);
    }
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
    setTimeout(() => {
      setIsSending(false);
      toast({
        title: t("proofSent"),
        description: t("proofSentDescription"),
      });
      
      // Clear uploaded files after successful send
      setUploadedFiles([]);
      
      // Proceed with submission
      onSubmit();
    }, 2000);
  };
  
  return (
    <div className="space-y-4 py-4">
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Payment Required | จำเป็นต้องชำระเงิน</AlertTitle>
        <AlertDescription>
          A payment of 2000 THB is required to activate this account. 
          <br />
          จำเป็นต้องชำระเงิน 2000 บาทเพื่อเปิดใช้งานบัญชีนี้
        </AlertDescription>
      </Alert>
      
      <div className="rounded-md border p-4 space-y-2">
        <h3 className="font-medium">Payment Information | ข้อมูลการชำระเงิน</h3>
        
        <ThaiPaymentDetails />
        
        <div className="mt-4 text-center border-t pt-3">
          <p className="font-medium mb-3">
            {language === 'de' ? 'Zahlungsnachweis hochladen:' :
             language === 'th' ? 'อัปโหลดหลักฐานการชำระเงิน:' :
             'Upload payment proof:'}
          </p>
          
          <FileUpload
            onFilesSelected={handleFilesSelected}
            accept=".pdf,.jpg,.jpeg,.png"
            icon={<Send className="h-6 w-6 text-muted-foreground" />}
          />
          
          {uploadedFiles.length > 0 && (
            <div className="text-sm mt-2 text-green-600">
              {uploadedFiles.length} {t("fileSelected")}
            </div>
          )}
          
          <div className="mt-3">
            <Button
              onClick={handleSendProof}
              disabled={uploadedFiles.length === 0 || isSending}
              className="w-full"
            >
              {isSending ? (
                language === 'de' ? 'Wird gesendet...' :
                language === 'th' ? 'กำลังส่ง...' :
                'Sending...'
              ) : (
                language === 'de' ? 'Zahlungsnachweis senden' :
                language === 'th' ? 'ส่งหลักฐานการชำระเงิน' :
                'Send Payment Proof'
              )}
            </Button>
          </div>
          
          <p className="text-xs mt-3 text-gray-600">
            {t("paymentEmail")}
          </p>
        </div>
      </div>
      
      <div className="flex items-center">
        <input
          type="checkbox"
          id="confirm-payment"
          checked={paymentConfirmed}
          onChange={(e) => setPaymentConfirmed(e.target.checked)}
          className="mr-2 h-4 w-4 rounded border-gray-300"
        />
        <label htmlFor="confirm-payment" className="text-sm">
          I confirm that the payment has been made | ฉันยืนยันว่าได้ชำระเงินแล้ว
        </label>
      </div>
      
      <div className="flex justify-end space-x-2 mt-5">
        <Button 
          variant="outline" 
          type="button" 
          onClick={onBack}
        >
          Back | ย้อนกลับ
        </Button>
        <Button 
          type="button" 
          onClick={onSubmit}
          disabled={!paymentConfirmed}
        >
          Submit | ส่ง
        </Button>
      </div>
    </div>
  );
}
