
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { QRCodeDialog } from "@/components/pricing/QRCodeDialog";
import { CustomOfferSection } from "@/components/pricing/CustomOfferSection";
import { BillingToggle } from "@/components/pricing/BillingToggle";
import { VolumeDiscounts } from "@/components/pricing/VolumeDiscounts";
import { SubscriptionPackages } from "@/components/pricing/SubscriptionPackages";
import { EnterpriseSubscriptionModel } from "@/components/pricing/EnterpriseSubscriptionModel";
import { UserVehiclePricingTiers } from "@/components/pricing/UserVehiclePricingTiers";

export default function Pricing() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);
  const { t } = useLanguage();
  const [isYearly, setIsYearly] = useState(true);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);

  const handlePayment = (plan: string) => {
    toast({
      title: t("paymentSuccessful"),
      description: `${t("thankYouForPurchasing")} ${plan} ${t("plan")}`,
    });
    navigate("/dashboard");
  };

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  const handleCustomOfferClick = () => {
    setShowQrCode(true);
  };

  const handleSelectPackage = (packageName: string) => {
    if (packageName === t("enterprisePackage")) {
      handleCustomOfferClick();
    } else {
      setSelectedPackage(packageName);
      setShowQrCode(true);
    }
  };

  const handlePaymentComplete = (plan: string) => {
    toast({
      title: t("paymentSuccessful"),
      description: `${t("thankYouForPurchasing")} ${plan} ${t("plan")}`,
    });
    setShowQrCode(false);
    navigate("/dashboard");
  };

  // Volume discounts
  const volumeDiscounts = [
    {
      threshold: t("vehicles50Plus"),
      discount: "15% " + t("discount"),
    },
    {
      threshold: t("vehicles100Plus"),
      discount: "20% " + t("discount"),
    },
    {
      threshold: t("yearlyPayment"),
      discount: "10% " + t("discount"),
    },
    {
      threshold: t("vehicles200Plus"),
      discount: t("customPricing"),
    }
  ];

  return (
    <div className="flex flex-col h-full">
      <Header />
      <main className="flex-1 p-6 overflow-auto">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-6">
            <Button 
              variant="outline" 
              onClick={handleBackToDashboard} 
              className="mb-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("backToDashboard")}
            </Button>
          </div>

          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2">TruckMate CMMS {t("subscriptionModel")}</h1>
            <p className="text-muted-foreground">
              {t("choosePlan")}
            </p>
          </div>

          {/* Billing toggle */}
          <BillingToggle 
            isYearly={isYearly} 
            onChange={setIsYearly} 
          />

          {/* Subscription Packages */}
          <SubscriptionPackages 
            isYearly={isYearly}
            onSelectPackage={handleSelectPackage}
          />
          
          {/* Detailed Pricing Tiers */}
          <UserVehiclePricingTiers isYearly={isYearly} />

          {/* Enterprise Subscription Model Information */}
          <EnterpriseSubscriptionModel />
          
          {/* Volume Discounts */}
          <VolumeDiscounts discounts={volumeDiscounts} />
          
          {/* QR Code Payment Dialog */}
          <QRCodeDialog
            open={showQrCode}
            onOpenChange={setShowQrCode}
            onConfirmPayment={() => handlePaymentComplete(selectedPackage || "Custom")}
          />
        </div>
      </main>
    </div>
  );
}
