
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { PricingTable } from "@/components/pricing/PricingTable";

interface UserVehiclePricingTiersProps {
  isYearly: boolean;
}

export function UserVehiclePricingTiers({ isYearly }: UserVehiclePricingTiersProps) {
  const { t } = useLanguage();
  
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
  
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-center mb-8">{t("detailedPricing")}</h2>
      
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
    </div>
  );
}
