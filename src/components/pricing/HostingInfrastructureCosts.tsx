
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { Server, Database, Cloud } from "lucide-react";

export function HostingInfrastructureCosts() {
  const { t } = useLanguage();
  
  return (
    <div className="mt-10 mb-8">
      <h2 className="text-2xl font-bold text-center mb-6">{t("hostingAndInfrastructure")}</h2>
      
      <div className="grid md:grid-cols-3 gap-6">
        {/* Cloud Hosting */}
        <Card>
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-2">
              <div className="p-2 rounded-full bg-fleet-50">
                <Cloud className="h-6 w-6 text-fleet-600" />
              </div>
            </div>
            <CardTitle className="text-center">{t("cloudHosting")}</CardTitle>
            <CardDescription className="text-center">
              {t("cloudHostingPrice")}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm">
            <ul className="space-y-2">
              <li>{t("cloudHostingDetail1")}</li>
              <li>{t("cloudHostingDetail2")}</li>
              <li>{t("cloudHostingDetail3")}</li>
            </ul>
          </CardContent>
        </Card>
        
        {/* Server Infrastructure */}
        <Card>
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-2">
              <div className="p-2 rounded-full bg-fleet-50">
                <Server className="h-6 w-6 text-fleet-600" />
              </div>
            </div>
            <CardTitle className="text-center">{t("serverInfrastructure")}</CardTitle>
            <CardDescription className="text-center">
              {t("serverInfrastructurePrice")}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm">
            <ul className="space-y-2">
              <li>{t("serverInfrastructureDetail1")}</li>
              <li>{t("serverInfrastructureDetail2")}</li>
              <li>{t("serverInfrastructureDetail3")}</li>
            </ul>
          </CardContent>
        </Card>
        
        {/* Database */}
        <Card>
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-2">
              <div className="p-2 rounded-full bg-fleet-50">
                <Database className="h-6 w-6 text-fleet-600" />
              </div>
            </div>
            <CardTitle className="text-center">{t("databaseCosts")}</CardTitle>
            <CardDescription className="text-center">
              {t("databasePrice")}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm">
            <ul className="space-y-2">
              <li>{t("databaseDetail1")}</li>
              <li>{t("databaseDetail2")}</li>
              <li>{t("databaseDetail3")}</li>
            </ul>
          </CardContent>
        </Card>
      </div>
      
      {/* Cost Breakdown */}
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
    </div>
  );
}
