
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export function ThaiPaymentDetails() {
  const { t } = useLanguage();
  const [showLargeQR, setShowLargeQR] = useState(false);
  
  return (
    <div className="mt-2 text-center text-xs">
      <Alert className="mb-4 bg-amber-50 text-amber-800 border-amber-200">
        <AlertTitle className="text-amber-800 font-medium">{t("paymentProofRequired")}</AlertTitle>
        <AlertDescription>
          {t("sendPhotoProof")} <strong>truckmatecmms@gmail.com</strong>
        </AlertDescription>
      </Alert>
      
      <div className="flex justify-center items-start gap-3">
        {/* PromptPay Section */}
        <div className="text-left flex-1">
          <p className="font-semibold">{t("promptPay")}</p>
          <p>{t("phoneNumber")}</p>
          <div className="mt-4">
            <p className="font-semibold">{t("bankAccount")}</p>
            <p>SCB</p>
            <p>{t("accountName")}: Wuttichai Phakchuen</p>
            <p>{t("accountNumber")}: 4320922392</p>
          </div>
        </div>
        <div 
          className="bg-gray-100 p-2 rounded-md cursor-pointer" 
          onClick={() => setShowLargeQR(true)}
        >
          <img 
            src="/lovable-uploads/1227902a-2033-4df9-a3c7-382e79e5b997.png"
            alt="QR Code"
            className="w-14 h-14 object-contain"
          />
        </div>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        {t("afterTransferring")}
      </p>

      {/* QR Code Dialog */}
      <Dialog open={showLargeQR} onOpenChange={setShowLargeQR}>
        <DialogContent className="sm:max-w-md">
          <div className="flex justify-center p-4">
            <img 
              src="/lovable-uploads/1227902a-2033-4df9-a3c7-382e79e5b997.png"
              alt="QR Code"
              className="w-64 h-64 object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
