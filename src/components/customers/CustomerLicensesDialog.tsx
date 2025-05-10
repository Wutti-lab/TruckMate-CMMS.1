
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LicensesTable } from "./LicensesTable";
import { Customer } from "@/lib/types/customer-types";
import { useLanguage } from "@/contexts/LanguageContext";

interface CustomerLicensesDialogProps {
  customer: Customer | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddLicense?: (customerId: string) => void;
}

export function CustomerLicensesDialog({
  customer,
  open,
  onOpenChange,
  onAddLicense
}: CustomerLicensesDialogProps) {
  const { language } = useLanguage();
  
  if (!customer) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>
            {language === 'de' 
              ? `Lizenzen für ${customer.name}`
              : `Licenses for ${customer.name}`
            }
          </DialogTitle>
          <DialogDescription>
            {language === 'de'
              ? `Alle Software-Lizenzen von ${customer.company}`
              : `All software licenses for ${customer.company}`
            }
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <LicensesTable licenses={customer.licenses} />
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="secondary"
            onClick={() => onOpenChange(false)}
          >
            {language === 'de' ? 'Schließen' : 'Close'}
          </Button>
          
          {onAddLicense && (
            <Button
              onClick={() => {
                onAddLicense(customer.id);
                onOpenChange(false);
              }}
              className="bg-fleet-600 hover:bg-fleet-700"
            >
              {language === 'de' ? 'Neue Lizenz hinzufügen' : 'Add New License'}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
