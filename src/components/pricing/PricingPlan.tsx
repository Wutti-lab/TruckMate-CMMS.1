
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { ReactNode } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

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
}

export function PricingPlan({
  title,
  price,
  priceSuffix,
  icon,
  features,
  onBuy,
  isProcessing,
}: PricingPlanProps) {
  const { t } = useLanguage();
  
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
          onClick={onBuy}
          disabled={isProcessing}
        >
          {isProcessing ? t("processing") : t("buyNow")}
        </Button>
      </CardFooter>
    </Card>
  );
}
