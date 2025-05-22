
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

export function EnterpriseSubscriptionModel() {
  const { t } = useLanguage();
  
  const includedFeatures = [
    t("webAndMobileApp"),
    t("cloudStorage"),
    t("technicalSupport"),
    t("regularBackups")
  ];
  
  const customerSetupFeatures = [
    t("ownCompanySettings"),
    t("ownUserAccounts"),
    t("ownMachineData"),
    t("ownReports")
  ];
  
  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">{t("includedInSubscription")}</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t("subscriptionModel")}</CardTitle>
            <CardDescription>{t("multiTenantSystem")}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {includedFeatures.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-fleet-500 mr-2 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>{t("newCustomerSetup")}</CardTitle>
            <CardDescription>{t("dataManagement")}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {customerSetupFeatures.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-fleet-500 mr-2 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
