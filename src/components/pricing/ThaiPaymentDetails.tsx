
import { useLanguage } from "@/contexts/LanguageContext";

export function ThaiPaymentDetails() {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-6 py-4">
      {/* PromptPay Section */}
      <div className="flex flex-col items-center justify-center mb-2">
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
        </div>
      </div>
      
      {/* Bank Account Section */}
      <div className="border-t pt-4">
        <h3 className="text-center font-medium mb-2">Bank Transfer</h3>
        <div className="bg-gray-50 p-4 rounded-md">
          <p className="font-medium">SBC Bank</p>
          <p>Account Name: Wuttichai Phakchen</p>
          <p>Account Number: 4320922392</p>
        </div>
      </div>
      
      <div className="text-sm text-center mt-4 text-muted-foreground">
        {t("afterTransferring")}
      </div>
    </div>
  );
}
