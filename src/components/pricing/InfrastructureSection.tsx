
import { useLanguage } from "@/contexts/LanguageContext";
import { Database, Cloud, Layers, Server } from "lucide-react";
import { InfrastructureCard } from "./InfrastructureCard";

interface InfrastructureSectionProps {
  isYearly: boolean;
}

export function InfrastructureSection({ isYearly }: InfrastructureSectionProps) {
  const { t } = useLanguage();
  
  return (
    <>
      <div className="grid md:grid-cols-3 gap-6">
        {/* Cloud Hosting */}
        <InfrastructureCard
          icon={Cloud}
          title={t("cloudHosting")}
          description={t("cloudHostingPrice")}
          details={[
            t("cloudHostingDetail1"),
            t("cloudHostingDetail2"),
            t("cloudHostingDetail3")
          ]}
        />
        
        {/* Server Infrastructure */}
        <InfrastructureCard
          icon={Server}
          title={t("serverInfrastructure")}
          description={t("serverInfrastructurePrice")}
          details={[
            t("serverInfrastructureDetail1"),
            t("serverInfrastructureDetail2"),
            t("serverInfrastructureDetail3")
          ]}
        />
        
        {/* Database */}
        <InfrastructureCard
          icon={Database}
          title={t("databaseCosts")}
          description={t("databasePrice")}
          details={[
            t("databaseDetail1"),
            t("databaseDetail2"),
            t("databaseDetail3")
          ]}
        />
      </div>
    </>
  );
}
