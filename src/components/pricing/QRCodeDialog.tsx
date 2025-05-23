
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { ThaiPaymentDetails } from "./ThaiPaymentDetails";

interface QRCodeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirmPayment: () => void;
}

export function QRCodeDialog({ open, onOpenChange, onConfirmPayment }: QRCodeDialogProps) {
  const { t } = useLanguage();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">{t("paymentDetails")}</DialogTitle>
        </DialogHeader>
        
        <ThaiPaymentDetails />
        
        <DialogFooter>
          <Button onClick={onConfirmPayment} className="w-full">
            {t("confirmPayment")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
