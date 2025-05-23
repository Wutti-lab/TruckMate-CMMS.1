
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";

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
  isHighlighted = false
}: PackageCardProps) {
  const getBadgeStyles = () => {
    switch (badgeVariant) {
      case "blue":
        return "bg-blue-50 text-blue-600 border-blue-200";
      case "green":
        return "bg-green-50 text-green-600 border-green-200";
      case "purple":
        return "bg-purple-50 text-purple-600 border-purple-200";
      default:
        return "bg-blue-50 text-blue-600 border-blue-200";
    }
  };

  return (
    <Card className={`border-2 ${isHighlighted 
      ? "border-fleet-400 ring-2 ring-fleet-200 hover:ring-fleet-300 transition-shadow" 
      : "hover:border-fleet-400 transition-colors"}`}
    >
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-center mb-2">
          <div className="p-2 rounded-full bg-fleet-50">
            <Package className="h-6 w-6 text-fleet-600" />
          </div>
        </div>
        <Badge variant="outline" className={`mx-auto mb-2 ${getBadgeStyles()}`}>
          {badgeText}
        </Badge>
        <CardTitle className="text-center">{title}</CardTitle>
        <CardDescription className="text-center text-lg font-bold mt-2">
          {price} {thbMonth}
        </CardDescription>
      </CardHeader>
      <CardContent className="text-sm space-y-4">
        <div>
          <p className="font-medium mb-1">{includedText}:</p>
          <ul className="space-y-1 list-disc pl-5">
            <li>
              {subscriptionText}: {isYearly ? Math.round(subscriptionPrice * 0.9) : subscriptionPrice} {thbMonth}
            </li>
            <li>
              {hostingText}: {isYearly ? Math.round(hostingPrice * 0.9) : hostingPrice} {thbMonth}
            </li>
          </ul>
        </div>
        <div>
          <p className="font-medium mb-1">{featuresText}:</p>
          <ul className="space-y-1 list-disc pl-5">
            {features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
        <Button className="w-full bg-fleet-600 mt-4">{buyText}</Button>
      </CardContent>
    </Card>
  );
}
