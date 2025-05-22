
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface PricingTier {
  range: string;
  monthlyPrice: string;
  yearlyPrice: string;
  description: string;
  discount?: string;
}

interface PricingTableProps {
  title: string;
  tiers: PricingTier[];
  isYearly: boolean;
  type: "user" | "vehicle";
}

export function PricingTable({ title, tiers, isYearly, type }: PricingTableProps) {
  const { t } = useLanguage();
  
  return (
    <div className="rounded-lg border border-gray-200 overflow-hidden mb-8">
      <div className="bg-fleet-50 px-4 py-3 border-b">
        <h3 className="text-lg font-semibold text-fleet-800">{title}</h3>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/4">{type === "user" ? t("userCount") : t("vehicleCount")}</TableHead>
            <TableHead className="w-1/4">{isYearly ? t("yearlyPrice") : t("monthlyPrice")}</TableHead>
            <TableHead className="w-2/4">{t("description")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tiers.map((tier, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{tier.range}</TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-semibold">
                    {isYearly ? tier.yearlyPrice : tier.monthlyPrice}
                  </span>
                  {tier.discount && isYearly && (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300 mt-1 w-fit">
                      {tier.discount}
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell>{tier.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
