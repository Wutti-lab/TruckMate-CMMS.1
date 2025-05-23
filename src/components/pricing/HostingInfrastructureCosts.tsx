
import { useLanguage } from "@/contexts/LanguageContext";
import { InfrastructureSection } from "./InfrastructureSection";
import { PackagesSection } from "./PackagesSection";
import { SaasMetrics } from "./SaasMetrics";

interface HostingInfrastructureCostsProps {
  isYearly: boolean;
}

export function HostingInfrastructureCosts({ isYearly }: HostingInfrastructureCostsProps) {
  const { t } = useLanguage();
  
  return (
    <div className="mt-10 mb-8 space-y-12">
      {/* Infrastructure Information */}
      <InfrastructureSection />
      
      {/* SaaS Metrics Section */}
      <div>
        <h2 className="text-2xl font-bold text-center mb-6">{t("keyMetrics")}</h2>
        <SaasMetrics />
      </div>
      
      {/* Package Pricing Plans */}
      <PackagesSection isYearly={isYearly} />
    </div>
  );
}
