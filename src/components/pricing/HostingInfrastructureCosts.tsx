
import { useLanguage } from "@/contexts/LanguageContext";
import { InfrastructureSection } from "./InfrastructureSection";
import { PackagesSection } from "./PackagesSection";
import { CostBreakdown } from "./CostBreakdown";

interface HostingInfrastructureCostsProps {
  isYearly: boolean;
}

export function HostingInfrastructureCosts({ isYearly }: HostingInfrastructureCostsProps) {
  return (
    <div className="mt-10 mb-8">
      <InfrastructureSection />
      
      <PackagesSection isYearly={isYearly} />
      
      <CostBreakdown />
    </div>
  );
}
