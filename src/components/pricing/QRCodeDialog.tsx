
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";

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
          
          <div className="border-t w-full pt-4 mt-4">
            <p className="text-sm text-center text-gray-500">
              {t("afterTransferring")}
            </p>
          </div>
          
          <Button 
            onClick={onConfirmPayment}
            className="w-full mt-4"
          >
            {t("confirmPayment")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
