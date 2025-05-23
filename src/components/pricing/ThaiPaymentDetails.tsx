
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export function ThaiPaymentDetails() {
  const { t } = useLanguage();
  
  return (
    <div className="mt-2 text-center text-sm">
      <div className="flex justify-center items-center space-x-3">
        <div className="text-left flex-1">
          <p className="font-semibold text-xs">{t("promptPay")}</p>
          <p className="text-xs">{t("phoneNumber")}</p>
        </div>
        <div className="bg-gray-100 p-2 rounded-md">
          <img 
            src="/lovable-uploads/1227902a-2033-4df9-a3c7-382e79e5b997.png"
            alt="QR Code"
            className="w-16 h-16 object-contain"
          />
        </div>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        {t("afterTransferring")}
      </p>
    </div>
  );
}
