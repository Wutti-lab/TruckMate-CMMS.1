
import { useLanguage } from "@/contexts/LanguageContext";
import { Database, Cloud, Layers, Server } from "lucide-react";
import { InfrastructureCard } from "./InfrastructureCard";

export function InfrastructureSection() {
  const { t } = useLanguage();
  
  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-6">{t("hostingAndInfrastructure")}</h2>
      
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
          recommendations={[
            t("cloudProviderRecommendation"),
            t("cloudPricingRecommendation"),
            t("cloudSetupRecommendation")
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
          recommendations={[
            t("serverHostingRecommendation"),
            t("serverScalingRecommendation"),
            t("serverAutomationRecommendation")
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
          recommendations={[
            t("databaseProviderRecommendation"),
            t("userManagementRecommendation"),
            t("dataStorageRecommendation")
          ]}
        />
      </div>
    </>
  );
}
