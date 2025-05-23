
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { Server, Database, Cloud, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface HostingInfrastructureCostsProps {
  isYearly: boolean;
}

export function HostingInfrastructureCosts({ isYearly }: HostingInfrastructureCostsProps) {
  const { t } = useLanguage();
  
  // Calculate yearly discount (10% off monthly price)
  const getYearlyPrice = (monthlyPrice: number) => {
    return Math.round(monthlyPrice * 0.9);
  };
  
  // Price configuration
  const prices = {
    starter: {
      monthly: 7000,
      yearly: getYearlyPrice(7000)
    },
    standard: {
      monthly: 18000,
      yearly: getYearlyPrice(18000)
    },
    professional: {
      monthly: 35000,
      yearly: getYearlyPrice(35000)
    }
  };
  
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
      
      {/* Complete Package Section */}
      <h2 className="text-2xl font-bold text-center mt-10 mb-6">{t("completePackageTitle")}</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {/* Starter Complete Package */}
        <Card className="border-2 hover:border-fleet-400 transition-colors">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-2">
              <div className="p-2 rounded-full bg-fleet-50">
                <Package className="h-6 w-6 text-fleet-600" />
              </div>
            </div>
            <Badge variant="outline" className="mx-auto mb-2 bg-blue-50 text-blue-600 border-blue-200">
              {t("starterPackage")}
            </Badge>
            <CardTitle className="text-center">{t("completePackageStarter")}</CardTitle>
            <CardDescription className="text-center text-lg font-bold mt-2">
              {isYearly ? prices.starter.yearly : prices.starter.monthly} {isYearly ? t("thbMonth") : t("thbMonth")}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm space-y-4">
            <div>
              <p className="font-medium mb-1">{t("included")}:</p>
              <ul className="space-y-1 list-disc pl-5">
                <li>
                  {t("starterSubscription")}: {isYearly ? Math.round(6000 * 0.9) : 6000} {isYearly ? t("thbMonth") : t("thbMonth")}
                </li>
                <li>
                  {t("basicHosting")}: {isYearly ? Math.round(1000 * 0.9) : 1000} {isYearly ? t("thbMonth") : t("thbMonth")}
                </li>
              </ul>
            </div>
            <div>
              <p className="font-medium mb-1">{t("packageFeatures")}:</p>
              <ul className="space-y-1 list-disc pl-5">
                <li>{t("starterUsers")}</li>
                <li>{t("starterVehicles")}</li>
                <li>{t("basicCloudHosting")}</li>
                <li>{t("basicSupport")}</li>
              </ul>
            </div>
            <Button className="w-full bg-fleet-600 mt-4">{t("buyNow")}</Button>
          </CardContent>
        </Card>
        
        {/* Standard Complete Package */}
        <Card className="border-2 border-fleet-400 ring-2 ring-fleet-200 hover:ring-fleet-300 transition-shadow">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-2">
              <div className="p-2 rounded-full bg-fleet-50">
                <Package className="h-6 w-6 text-fleet-600" />
              </div>
            </div>
            <Badge variant="outline" className="mx-auto mb-2 bg-green-50 text-green-600 border-green-200">
              {t("standardPackage")}
            </Badge>
            <CardTitle className="text-center">{t("completePackageStandard")}</CardTitle>
            <CardDescription className="text-center text-lg font-bold mt-2">
              {isYearly ? prices.standard.yearly : prices.standard.monthly} {isYearly ? t("thbMonth") : t("thbMonth")}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm space-y-4">
            <div>
              <p className="font-medium mb-1">{t("included")}:</p>
              <ul className="space-y-1 list-disc pl-5">
                <li>
                  {t("standardSubscription")}: {isYearly ? Math.round(15000 * 0.9) : 15000} {isYearly ? t("thbMonth") : t("thbMonth")}
                </li>
                <li>
                  {t("advancedHosting")}: {isYearly ? Math.round(3000 * 0.9) : 3000} {isYearly ? t("thbMonth") : t("thbMonth")}
                </li>
              </ul>
            </div>
            <div>
              <p className="font-medium mb-1">{t("packageFeatures")}:</p>
              <ul className="space-y-1 list-disc pl-5">
                <li>{t("standardUsers")}</li>
                <li>{t("standardVehicles")}</li>
                <li>{t("advancedCloudHosting")}</li>
                <li>{t("prioritySupport")}</li>
              </ul>
            </div>
            <Button className="w-full bg-fleet-600 mt-4">{t("buyNow")}</Button>
          </CardContent>
        </Card>
        
        {/* Professional Complete Package */}
        <Card className="border-2 hover:border-fleet-400 transition-colors">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-2">
              <div className="p-2 rounded-full bg-fleet-50">
                <Package className="h-6 w-6 text-fleet-600" />
              </div>
            </div>
            <Badge variant="outline" className="mx-auto mb-2 bg-purple-50 text-purple-600 border-purple-200">
              {t("professionalPackage")}
            </Badge>
            <CardTitle className="text-center">{t("completePackageProfessional")}</CardTitle>
            <CardDescription className="text-center text-lg font-bold mt-2">
              {isYearly ? prices.professional.yearly : prices.professional.monthly} {isYearly ? t("thbMonth") : t("thbMonth")}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-sm space-y-4">
            <div>
              <p className="font-medium mb-1">{t("included")}:</p>
              <ul className="space-y-1 list-disc pl-5">
                <li>
                  {t("professionalSubscription")}: {isYearly ? Math.round(30000 * 0.9) : 30000} {isYearly ? t("thbMonth") : t("thbMonth")}
                </li>
                <li>
                  {t("enterpriseHosting")}: {isYearly ? Math.round(5000 * 0.9) : 5000} {isYearly ? t("thbMonth") : t("thbMonth")}
                </li>
              </ul>
            </div>
            <div>
              <p className="font-medium mb-1">{t("packageFeatures")}:</p>
              <ul className="space-y-1 list-disc pl-5">
                <li>{t("professionalUsers")}</li>
                <li>{t("professionalVehicles")}</li>
                <li>{t("enterpriseCloudHosting")}</li>
                <li>{t("dedicatedSupport")}</li>
              </ul>
            </div>
            <Button className="w-full bg-fleet-600 mt-4">{t("buyNow")}</Button>
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
