
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Percent } from "lucide-react";

interface DiscountItem {
  threshold: string;
  discount: string;
  description?: string;
}

interface VolumeDiscountsProps {
  discounts: DiscountItem[];
}

export function VolumeDiscounts({ discounts }: VolumeDiscountsProps) {
  const { t } = useLanguage();
  
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Percent className="h-5 w-5 mr-2 text-fleet-600" />
          {t("volumeDiscounts")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {discounts.map((item, index) => (
            <li key={index} className="flex justify-between border-b pb-2 last:border-0">
              <div className="font-medium">{item.threshold}</div>
              <div className="text-fleet-600 font-semibold">{item.discount}</div>
              {item.description && <div className="text-sm text-muted-foreground">{item.description}</div>}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
