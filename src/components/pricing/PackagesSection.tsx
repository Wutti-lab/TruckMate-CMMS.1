
import { useLanguage } from "@/contexts/LanguageContext";
import { PackageCard } from "./PackageCard";
import { prices } from "./utils/pricing-utils";

interface PackagesSectionProps {
  isYearly: boolean;
}

export function PackagesSection({ isYearly }: PackagesSectionProps) {
  const { t } = useLanguage();
  
  return (
    <>
      <h2 className="text-2xl font-bold text-center mt-10 mb-6">{t("completePackageTitle")}</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {/* Starter Complete Package */}
        <PackageCard
          title={t("completePackageStarter")}
          price={isYearly ? prices.starter.yearly : prices.starter.monthly}
          badgeText={t("starterPackage")}
          badgeVariant="blue"
          subscriptionPrice={6000}
          hostingPrice={1000}
          subscriptionText={t("starterSubscription")}
          hostingText={t("basicHosting")}
          features={[
            t("starterUsers"),
            t("starterVehicles"),
            t("basicCloudHosting"),
            t("basicSupport")
          ]}
          buyText={t("buyNow")}
          isYearly={isYearly}
          thbMonth={isYearly ? t("thbYear") : t("thbMonth")}
          includedText={t("included")}
          featuresText={t("packageFeatures")}
        />
        
        {/* Standard Complete Package */}
        <PackageCard
          title={t("completePackageStandard")}
          price={isYearly ? prices.standard.yearly : prices.standard.monthly}
          badgeText={t("standardPackage")}
          badgeVariant="green"
          subscriptionPrice={15000}
          hostingPrice={3000}
          subscriptionText={t("standardSubscription")}
          hostingText={t("advancedHosting")}
          features={[
            t("standardUsers"),
            t("standardVehicles"),
            t("advancedCloudHosting"),
            t("prioritySupport")
          ]}
          buyText={t("buyNow")}
          isYearly={isYearly}
          thbMonth={isYearly ? t("thbYear") : t("thbMonth")}
          includedText={t("included")}
          featuresText={t("packageFeatures")}
          isHighlighted={true}
        />
        
        {/* Professional Complete Package */}
        <PackageCard
          title={t("completePackageProfessional")}
          price={isYearly ? prices.professional.yearly : prices.professional.monthly}
          badgeText={t("professionalPackage")}
          badgeVariant="purple"
          subscriptionPrice={30000}
          hostingPrice={5000}
          subscriptionText={t("professionalSubscription")}
          hostingText={t("enterpriseHosting")}
          features={[
            t("professionalUsers"),
            t("professionalVehicles"),
            t("enterpriseCloudHosting"),
            t("dedicatedSupport")
          ]}
          buyText={t("buyNow")}
          isYearly={isYearly}
          thbMonth={isYearly ? t("thbYear") : t("thbMonth")}
          includedText={t("included")}
          featuresText={t("packageFeatures")}
        />
      </div>
    </>
  );
}
