
import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Truck, User, Check, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Pricing() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const { t, language } = useLanguage();

  const handlePayment = (plan: string) => {
    setIsProcessing(true);
    // Simulate a payment process
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: t("paymentSuccessful"),
        description: `${t("thankYouForPurchasing")} ${plan} ${t("plan")}`,
      });
      navigate("/dashboard");
    }, 2000);
  };

  const handleBackToDashboard = () => {
    navigate("/dashboard");
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
            <h1 className="text-3xl font-bold mb-2">TruckMate CMMS {t("pricing")}</h1>
            <p className="text-muted-foreground">
              {t("choosePlan")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Vehicle Plan */}
            <Card className="flex flex-col border-2 border-fleet-200 hover:border-fleet-400 transition-colors">
              <CardHeader>
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 rounded-full bg-fleet-100">
                    <Truck className="h-10 w-10 text-fleet-600" />
                  </div>
                </div>
                <CardTitle className="text-center text-2xl">{t("vehiclePlan")}</CardTitle>
                <CardDescription className="text-center text-lg mt-2">
                  5,000 ฿ <span className="text-sm">{t("perVehicle")}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-fleet-500 mr-2 mt-0.5" />
                    <span>{t("completeVehicleManagement")}</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-fleet-500 mr-2 mt-0.5" />
                    <span>{t("vehicleInspections")}</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-fleet-500 mr-2 mt-0.5" />
                    <span>{t("maintenanceTracking")}</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-fleet-500 mr-2 mt-0.5" />
                    <span>{t("qrCodeSupport")}</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-fleet-500 mr-2 mt-0.5" />
                    <span>{t("oneUserIncluded")}</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-fleet-600" 
                  onClick={() => handlePayment("Vehicle")}
                  disabled={isProcessing}
                >
                  {isProcessing ? t("processing") : t("buyNow")}
                </Button>
              </CardFooter>
            </Card>

            {/* User Plan */}
            <Card className="flex flex-col border-2 border-fleet-200 hover:border-fleet-400 transition-colors">
              <CardHeader>
                <div className="flex items-center justify-center mb-4">
                  <div className="p-3 rounded-full bg-fleet-100">
                    <User className="h-10 w-10 text-fleet-600" />
                  </div>
                </div>
                <CardTitle className="text-center text-2xl">{t("userPlan")}</CardTitle>
                <CardDescription className="text-center text-lg mt-2">
                  2,000 ฿ <span className="text-sm">{t("perUser")}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-fleet-500 mr-2 mt-0.5" />
                    <span>{t("individualUserProfile")}</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-fleet-500 mr-2 mt-0.5" />
                    <span>{t("roleBasedAccess")}</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-fleet-500 mr-2 mt-0.5" />
                    <span>{t("userSpecificDashboards")}</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-fleet-500 mr-2 mt-0.5" />
                    <span>{t("activityLogs")}</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-fleet-500 mr-2 mt-0.5" />
                    <span>{t("mobileAppAccess")}</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-fleet-600" 
                  onClick={() => handlePayment("User")}
                  disabled={isProcessing}
                >
                  {isProcessing ? t("processing") : t("buyNow")}
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <h2 className="text-xl font-semibold mb-4">{t("needCustomOffer")}?</h2>
            <p className="mb-4 max-w-2xl mx-auto">
              {t("contactUsForTailoredSolutions")}
            </p>
            <Button variant="outline">{t("contact")}</Button>
          </div>
        </div>
      </main>
    </div>
  );
}
