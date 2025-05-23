
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { InfrastructureSection } from "./InfrastructureSection";
import { PackagesSection } from "./PackagesSection";

interface HostingInfrastructureCostsProps {
  isYearly: boolean;
  onSelectPackage: (packageName: string) => void;
}

export function HostingInfrastructureCosts({ isYearly, onSelectPackage }: HostingInfrastructureCostsProps) {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-12">
      {/* Infrastructure Section */}
      <div>
        <h2 className="text-2xl font-bold text-center mb-6">{t("infrastructureTitle")}</h2>
        <InfrastructureSection isYearly={isYearly} />
      </div>
      
      {/* Complete Packages Section */}
      <div>
        <PackagesSection isYearly={isYearly} onSelectPackage={onSelectPackage} />
      </div>
    </div>
  );
}
