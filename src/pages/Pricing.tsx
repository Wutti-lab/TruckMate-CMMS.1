import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Truck, User, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { PricingPlan } from "@/components/pricing/PricingPlan";
import { QRCodeDialog } from "@/components/pricing/QRCodeDialog";
import { CustomOfferSection } from "@/components/pricing/CustomOfferSection";
import { PricingTable } from "@/components/pricing/PricingTable";
import { BillingToggle } from "@/components/pricing/BillingToggle";
import { VolumeDiscounts } from "@/components/pricing/VolumeDiscounts";

export default function Pricing() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);
  const { t } = useLanguage();
  const [isYearly, setIsYearly] = useState(true);

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

  const handlePaymentComplete = (plan: string) => {
    toast({
      title: t("paymentSuccessful"),
      description: `${t("thankYouForPurchasing")} ${plan} ${t("plan")}`,
    });
    setShowQrCode(false);
    navigate("/dashboard");
  };

  // User-based pricing tiers
  const userTiers = [
    {
      range: "1-5",
      monthlyPrice: "300 THB",
      yearlyPrice: "3,300 THB",
      description: t("smallTeams"),
      discount: "10% " + t("discount")
    },
    {
      range: "6-20",
      monthlyPrice: "250 THB",
      yearlyPrice: "2,700 THB",
      description: t("mediumBusinesses")
    },
    {
      range: "21+",
      monthlyPrice: "200 THB",
      yearlyPrice: "2,200 THB",
      description: t("largeBusiness")
    }
  ];

  // Vehicle-based pricing tiers
  const vehicleTiers = [
    {
      range: "1-10",
      monthlyPrice: "1,000 THB",
      yearlyPrice: "11,000 THB",
      description: t("smallFleet"),
      discount: "8% " + t("discount")
    },
    {
      range: "11-50",
      monthlyPrice: "800 THB",
      yearlyPrice: "8,700 THB",
      description: t("mediumFleet")
    },
    {
      range: "51+",
      monthlyPrice: "600 THB",
      yearlyPrice: "6,500 THB",
      description: t("largeFleet")
    }
  ];

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
            <h1 className="text-3xl font-bold mb-2">TruckMate CMMS {t("pricing")}</h1>
            <p className="text-muted-foreground">
              {t("choosePlan")}
            </p>
          </div>

          {/* Billing toggle */}
          <BillingToggle 
            isYearly={isYearly} 
            onChange={setIsYearly} 
          />

          {/* Pricing tables */}
          <div className="space-y-8">
            <PricingTable
              title={t("userBasedPricing")}
              tiers={userTiers}
              isYearly={isYearly}
              type="user"
            />
            
            <PricingTable
              title={t("vehicleBasedPricing")}
              tiers={vehicleTiers}
              isYearly={isYearly}
              type="vehicle"
            />
            
            <VolumeDiscounts discounts={volumeDiscounts} />
          </div>

          {/* Legacy pricing cards - keeping for reference but can be removed */}
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            {/* Vehicle Plan */}
            <PricingPlan
              title={t("vehiclePlan")}
              price={isYearly ? "11,000 ฿" : "1,000 ฿"}
              priceSuffix={isYearly ? t("perVehicleYear") : t("perVehicleMonth")}
              icon={<Truck className="h-10 w-10 text-fleet-600" />}
              features={[
                t("completeVehicleManagement"),
                t("vehicleInspections"),
                t("maintenanceTracking"),
                t("qrCodeSupport"),
                t("oneUserIncluded")
              ]}
              onBuy={() => handlePayment("Vehicle")}
              isProcessing={isProcessing}
              showFreeTrial={true}
            />

            {/* User Plan */}
            <PricingPlan
              title={t("userPlan")}
              price={isYearly ? "3,300 ฿" : "300 ฿"}
              priceSuffix={isYearly ? t("perUserYear") : t("perUserMonth")}
              icon={<User className="h-10 w-10 text-fleet-600" />}
              features={[
                t("individualUserProfile"),
                t("roleBasedAccess"),
                t("userSpecificDashboards"),
                t("activityLogs"),
                t("mobileAppAccess")
              ]}
              onBuy={() => handlePayment("User")}
              isProcessing={isProcessing}
              showFreeTrial={true}
            />
          </div>

          <CustomOfferSection onClick={handleCustomOfferClick} />
          
          {/* QR Code Payment Dialog - only for custom offers now */}
          <QRCodeDialog
            open={showQrCode}
            onOpenChange={setShowQrCode}
            onConfirmPayment={() => handlePaymentComplete("Custom")}
          />
        </div>
      </main>
    </div>
  );
}
