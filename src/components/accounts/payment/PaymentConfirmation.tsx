
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface PaymentConfirmationProps {
  userEmail: string;
  onBack: () => void;
  onSubmit: () => void;
}

export function PaymentConfirmation({ userEmail, onBack, onSubmit }: PaymentConfirmationProps) {
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const { language, t } = useLanguage();
  
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
        
        <div className="flex flex-col items-center justify-center mt-4 mb-2">
          <div className="max-w-[200px] mb-4">
            <img 
              src="/lovable-uploads/1227902a-2033-4df9-a3c7-382e79e5b997.png" 
              alt="PromptPay QR Code"
              className="w-full h-auto"
            />
          </div>
          
          <div className="text-center">
            <p className="font-medium">
              {t("promptPay")}
            </p>
            <p className="text-sm">
              {t("phoneNumber")}
            </p>
            <p className="text-sm mt-2">
              {language === 'th' ? 'อ้างอิง: ' : 
               language === 'de' ? 'Referenz: ' : 
               'Reference: '}{userEmail}
            </p>
          </div>
        </div>
        
        <div className="mt-4 text-center border-t pt-3">
          <p className="font-medium mb-1">
            {t("sendPaymentVerification")}
          </p>
          <p className="text-sm font-medium text-blue-600">
            {t("paymentEmail")}
          </p>
          <p className="text-xs mt-1 text-gray-600">
            {t("pleaseVerifyPayment")}
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
