
import { useLanguage } from "@/contexts/LanguageContext";
import { InfrastructureSection } from "./InfrastructureSection";
import { PackagesSection } from "./PackagesSection";

interface HostingInfrastructureCostsProps {
  isYearly: boolean;
}

export function HostingInfrastructureCosts({ isYearly }: HostingInfrastructureCostsProps) {
  const { t } = useLanguage();
  
  return (
    <div className="mt-10 mb-8 space-y-12">
      {/* Infrastructure Information */}
      <InfrastructureSection />
      
      {/* Package Pricing Plans */}
      <PackagesSection isYearly={isYearly} />
    </div>
  );
}
