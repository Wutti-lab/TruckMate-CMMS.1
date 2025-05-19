
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { ReactNode, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Badge } from "@/components/ui/badge";
import { PaymentForm } from "./PaymentForm";

interface PricingFeature {
  text: string;
}

interface PricingPlanProps {
  title: string;
  price: string;
  priceSuffix: string;
  icon: ReactNode;
  features: string[];
  onBuy: () => void;
  isProcessing: boolean;
  showFreeTrial?: boolean;
}

export function PricingPlan({
  title,
  price,
  priceSuffix,
  icon,
  features,
  onBuy,
  isProcessing,
  showFreeTrial = false,
}: PricingPlanProps) {
  const { t } = useLanguage();
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  
  const handleBuyClick = () => {
    setShowPaymentForm(true);
  };
  
  const handlePaymentSuccess = () => {
    setShowPaymentForm(false);
    onBuy(); // Call the original onBuy function from parent
  };
  
  return (
    <Card className="flex flex-col border-2 border-fleet-200 hover:border-fleet-400 transition-colors">
      <CardHeader>
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 rounded-full bg-fleet-100">
            {icon}
          </div>
        </div>
        <CardTitle className="text-center text-2xl">{title}</CardTitle>
        <CardDescription className="text-center text-lg mt-2">
          {price} <span className="text-sm">{priceSuffix}</span>
        </CardDescription>
        
        {showFreeTrial && (
          <div className="mt-2 text-center">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300 hover:bg-green-100">
              {t("freeTrialBadge")}
            </Badge>
            <p className="text-xs mt-2 text-green-600">
              {t("freeTrialDescription")}
            </p>
          </div>
        )}
      </CardHeader>
      <CardContent className="flex-grow">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-fleet-500 mr-2 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full bg-fleet-600" 
          onClick={handleBuyClick}
          disabled={isProcessing}
        >
          {isProcessing ? t("processing") : t("buyNow")}
        </Button>
        
        {/* Payment Form Dialog */}
        <PaymentForm 
          open={showPaymentForm} 
          onOpenChange={setShowPaymentForm} 
          onSuccess={handlePaymentSuccess}
          planTitle={title}
        />
      </CardFooter>
    </Card>
  );
}
