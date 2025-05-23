
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
import { HostingInfrastructureCosts } from "@/components/pricing/HostingInfrastructureCosts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PaymentForm } from "@/components/pricing/PaymentForm";
import { ThaiPaymentDetails } from "@/components/pricing/ThaiPaymentDetails";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Pricing() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showQrCode, setShowQrCode] = useState(false);
  const { t } = useLanguage();
  const [isYearly, setIsYearly] = useState(true);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

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
    setSelectedPackage("Custom");
    setShowQrCode(true);
  };

  const handleSelectPackage = (packageName: string) => {
    console.log("Selected package:", packageName);
    setSelectedPackage(packageName);
    setShowQrCode(true);
  };
  
  const handleDirectPaymentUpload = () => {
    setShowPaymentForm(true);
  };

  const handlePaymentComplete = (plan: string) => {
    toast({
      title: t("paymentSuccessful"),
      description: `${t("thankYouForPurchasing")} ${plan} ${t("plan")}`,
    });
    setShowQrCode(false);
    navigate("/dashboard");
  };
  
  const handlePaymentSuccess = () => {
    setShowPaymentForm(false);
    toast({
      title: t("proofSent"),
      description: t("proofSentDescription"),
    });
  };

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
            <h1 className="text-3xl font-bold mb-2">TruckMate CMMS</h1>
            <p className="text-muted-foreground">
              {t("choosePlan")}
            </p>
          </div>

          {/* Direct Payment Upload Card */}
          <Card className="mb-8 border-2 border-green-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-center text-green-700">{t("sendPaymentProofDirectly")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Alert variant="warning">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    {t("photoProofInstructions")}
                  </AlertDescription>
                </Alert>
              </div>
              
              <div className="mb-4">
                <ThaiPaymentDetails />
              </div>
              
              <div className="flex justify-center">
                <Button 
                  onClick={handleDirectPaymentUpload}
                  className="bg-white text-green-700 hover:bg-gray-50 border-green-600 border"
                >
                  {t("uploadPaymentProof")}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Billing toggle */}
          <BillingToggle 
            isYearly={isYearly} 
            onChange={setIsYearly} 
          />

          {/* Hosting and Infrastructure Costs - Complete Packages */}
          <HostingInfrastructureCosts 
            isYearly={isYearly} 
            onSelectPackage={handleSelectPackage}
          />
          
          {/* Custom Offer Section */}
          <CustomOfferSection onCustomOfferClick={handleCustomOfferClick} />
          
          {/* QR Code Payment Dialog */}
          <QRCodeDialog
            open={showQrCode}
            onOpenChange={setShowQrCode}
            onConfirmPayment={() => handlePaymentComplete(selectedPackage || "Custom")}
          />
          
          {/* Direct Payment Form Dialog */}
          <PaymentForm
            open={showPaymentForm}
            onOpenChange={setShowPaymentForm}
            onSuccess={handlePaymentSuccess}
            planTitle={selectedPackage || t("directPayment")}
          />
        </div>
      </main>
    </div>
  );
}
