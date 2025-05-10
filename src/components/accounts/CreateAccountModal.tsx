
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { AccountCreationForm, FormValues } from "./forms/AccountCreationForm";
import { PaymentConfirmation } from "./payment/PaymentConfirmation";

interface CreateAccountModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateAccountModal({ open, onOpenChange }: CreateAccountModalProps) {
  const { toast } = useToast();
  const { createPendingUser } = useAuth();
  const { language } = useLanguage();
  
  const [showPaymentInfo, setShowPaymentInfo] = useState(false);
  const [formData, setFormData] = useState<FormValues | null>(null);

  const handleInitialSubmit = (data: FormValues) => {
    setFormData(data);
    setShowPaymentInfo(true);
  };

  const handleFinalSubmit = () => {
    if (!formData) return;
    
    createPendingUser({
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      role: formData.role,
      password: formData.password,
      paymentStatus: "paid",
      approvalStatus: "pending",
      createdAt: new Date().toISOString()
    });
    
    toast({
      title: "Account registration submitted",
      description: "The account has been submitted for approval after payment confirmation.",
    });
    
    handleCancel();
  };

  const handleCancel = () => {
    setFormData(null);
    setShowPaymentInfo(false);
    onOpenChange(false);
  };

  const handleBack = () => {
    setShowPaymentInfo(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Account | สร้างบัญชีใหม่</DialogTitle>
          <DialogDescription>
            {!showPaymentInfo ? 
              "Fill in the details below to create a new user account." : 
              "A payment of 2000 THB is required to activate this account."
            }
          </DialogDescription>
        </DialogHeader>
        
        {showPaymentInfo ? (
          <PaymentConfirmation 
            userEmail={formData?.email || ""} 
            onBack={handleBack} 
            onSubmit={handleFinalSubmit}
          />
        ) : (
          <AccountCreationForm 
            onSubmit={handleInitialSubmit}
            onCancel={handleCancel}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
