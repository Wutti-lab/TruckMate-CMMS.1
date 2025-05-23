
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";
import { PackageHeader } from "./components/PackageHeader";
import { PackagePriceDetails } from "./components/PackagePriceDetails";
import { PackageFeatureList } from "./components/PackageFeatureList";

interface PackageCardProps {
  title: string;
  price: number;
  badgeText: string;
  badgeVariant: "blue" | "green" | "purple";
  subscriptionPrice: number;
  hostingPrice: number;
  subscriptionText: string;
  hostingText: string;
  features: string[];
  buyText: string;
  isYearly: boolean;
  thbMonth: string;
  includedText: string;
  featuresText: string;
  isHighlighted?: boolean;
  onBuy: () => void;
}

export function PackageCard({
  title,
  price,
  badgeText,
  badgeVariant,
  subscriptionPrice,
  hostingPrice,
  subscriptionText,
  hostingText,
  features,
  buyText,
  isYearly,
  thbMonth,
  includedText,
  featuresText,
  isHighlighted = false,
  onBuy
}: PackageCardProps) {
  return (
    <Card className={`border-2 ${isHighlighted 
      ? "border-fleet-400 ring-2 ring-fleet-200 hover:ring-fleet-300 transition-shadow" 
      : "hover:border-fleet-400 transition-colors"}`}
    >
      <CardHeader>
        <PackageHeader 
          icon={Package}
          title={title}
          price={price}
          badgeText={badgeText}
          badgeVariant={badgeVariant}
          thbMonth={thbMonth}
        />
      </CardHeader>
      <CardContent className="text-sm space-y-4">
        <PackagePriceDetails
          subscriptionPrice={subscriptionPrice}
          hostingPrice={hostingPrice}
          subscriptionText={subscriptionText}
          hostingText={hostingText}
          isYearly={isYearly}
          thbMonth={thbMonth}
          includedText={includedText}
        />
        
        <PackageFeatureList 
          features={features}
          featuresText={featuresText}
        />
        
        <Button 
          className="w-full bg-fleet-600 mt-4"
          onClick={onBuy}
        >
          {buyText}
        </Button>
      </CardContent>
    </Card>
  );
}
