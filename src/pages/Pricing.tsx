
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

export default function Pricing() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);
  const { t } = useLanguage();

  const handlePayment = (plan: string) => {
    setIsProcessing(true);
    // Show QR code dialog instead of simulating payment
    setShowQrCode(true);
    setIsProcessing(false);
  };

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  const handlePaymentComplete = (plan: string) => {
    toast({
      title: t("paymentSuccessful"),
      description: `${t("thankYouForPurchasing")} ${plan} ${t("plan")}`,
    });
    setShowQrCode(false);
    navigate("/dashboard");
  };

  const vehicleFeatures = [
    t("completeVehicleManagement"),
    t("vehicleInspections"),
    t("maintenanceTracking"),
    t("qrCodeSupport"),
    t("oneUserIncluded")
  ];

  const userFeatures = [
    t("individualUserProfile"),
    t("roleBasedAccess"),
    t("userSpecificDashboards"),
    t("activityLogs"),
    t("mobileAppAccess")
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

          <div className="grid md:grid-cols-2 gap-8">
            {/* Vehicle Plan */}
            <PricingPlan
              title={t("vehiclePlan")}
              price="5,000 ฿"
              priceSuffix={t("perVehicle")}
              icon={<Truck className="h-10 w-10 text-fleet-600" />}
              features={vehicleFeatures}
              onBuy={() => handlePayment("Vehicle")}
              isProcessing={isProcessing}
              showFreeTrial={true}
            />

            {/* User Plan */}
            <PricingPlan
              title={t("userPlan")}
              price="2,000 ฿"
              priceSuffix={t("perUser")}
              icon={<User className="h-10 w-10 text-fleet-600" />}
              features={userFeatures}
              onBuy={() => handlePayment("User")}
              isProcessing={isProcessing}
              showFreeTrial={true}
            />
          </div>

          <CustomOfferSection onClick={() => setShowQrCode(true)} />
          
          {/* QR Code Payment Dialog */}
          <QRCodeDialog
            open={showQrCode}
            onOpenChange={setShowQrCode}
            onConfirmPayment={() => handlePaymentComplete("Vehicle")}
          />
        </div>
      </main>
    </div>
  );
}
