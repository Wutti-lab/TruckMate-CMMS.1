
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

export function CostBreakdown() {
  const { t } = useLanguage();
  
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>{t("costBreakdown")}</CardTitle>
        <CardDescription>
          {t("costBreakdownDescription")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">{t("starterPackage")}</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>{t("starterHostingCost")}</li>
              <li>{t("starterSupportCost")}</li>
              <li>{t("starterDevelopmentCost")}</li>
              <li className="font-semibold">{t("starterTotalCost")}</li>
              <li className="text-green-600 font-semibold">{t("starterProfit")}</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">{t("standardPackage")}</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>{t("standardHostingCost")}</li>
              <li>{t("standardSupportCost")}</li>
              <li>{t("standardDevelopmentCost")}</li>
              <li className="font-semibold">{t("standardTotalCost")}</li>
              <li className="text-green-600 font-semibold">{t("standardProfit")}</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">{t("professionalPackage")}</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>{t("professionalHostingCost")}</li>
              <li>{t("professionalSupportCost")}</li>
              <li>{t("professionalDevelopmentCost")}</li>
              <li className="font-semibold">{t("professionalTotalCost")}</li>
              <li className="text-green-600 font-semibold">{t("professionalProfit")}</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
