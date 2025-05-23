
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

interface CostBreakdownProps {
  isYearly?: boolean;
}

export function CostBreakdown({ isYearly = false }: CostBreakdownProps) {
  const { t } = useLanguage();
  
  // Multiplier for yearly calculations (12 months * 0.9 discount)
  const yearlyMultiplier = 12 * 0.9;
  
  // Define monthly costs
  const starterHostingCost = 1000;
  const starterSupportCost = 800;
  const starterDevCost = 500;
  const starterTotal = starterHostingCost + starterSupportCost + starterDevCost;
  const starterPrice = 7000;
  
  const standardHostingCost = 3000;
  const standardSupportCost = 2000;
  const standardDevCost = 1000;
  const standardTotal = standardHostingCost + standardSupportCost + standardDevCost;
  const standardPrice = 18000;
  
  const profHostingCost = 7000;
  const profSupportCost = 4000;
  const profDevCost = 2000;
  const profTotal = profHostingCost + profSupportCost + profDevCost;
  const profPrice = 35000;
  
  // Calculate actual amounts based on billing period
  const calcAmount = (amount: number) => isYearly 
    ? Math.round(amount * yearlyMultiplier) 
    : amount;
  
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
              <li>{isYearly ? `${t("starterHostingCost").split(':')[0]}: ~${calcAmount(starterHostingCost).toLocaleString()} THB/${isYearly ? 'year' : 'month'}` : t("starterHostingCost")}</li>
              <li>{isYearly ? `${t("starterSupportCost").split(':')[0]}: ~${calcAmount(starterSupportCost).toLocaleString()} THB/${isYearly ? 'year' : 'month'}` : t("starterSupportCost")}</li>
              <li>{isYearly ? `${t("starterDevelopmentCost").split(':')[0]}: ~${calcAmount(starterDevCost).toLocaleString()} THB/${isYearly ? 'year' : 'month'}` : t("starterDevelopmentCost")}</li>
              <li className="font-semibold">{isYearly ? `${t("starterTotalCost").split(':')[0]}: ~${calcAmount(starterTotal).toLocaleString()} THB/${isYearly ? 'year' : 'month'}` : t("starterTotalCost")}</li>
              <li className="text-green-600 font-semibold">
                {isYearly 
                  ? `Profit at ${calcAmount(starterPrice).toLocaleString()} THB: ~${(calcAmount(starterPrice) - calcAmount(starterTotal)).toLocaleString()} THB/year`
                  : t("starterProfit")}
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">{t("standardPackage")}</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>{isYearly ? `${t("standardHostingCost").split(':')[0]}: ~${calcAmount(standardHostingCost).toLocaleString()} THB/${isYearly ? 'year' : 'month'}` : t("standardHostingCost")}</li>
              <li>{isYearly ? `${t("standardSupportCost").split(':')[0]}: ~${calcAmount(standardSupportCost).toLocaleString()} THB/${isYearly ? 'year' : 'month'}` : t("standardSupportCost")}</li>
              <li>{isYearly ? `${t("standardDevelopmentCost").split(':')[0]}: ~${calcAmount(standardDevCost).toLocaleString()} THB/${isYearly ? 'year' : 'month'}` : t("standardDevelopmentCost")}</li>
              <li className="font-semibold">{isYearly ? `${t("standardTotalCost").split(':')[0]}: ~${calcAmount(standardTotal).toLocaleString()} THB/${isYearly ? 'year' : 'month'}` : t("standardTotalCost")}</li>
              <li className="text-green-600 font-semibold">
                {isYearly 
                  ? `Profit at ${calcAmount(standardPrice).toLocaleString()} THB: ~${(calcAmount(standardPrice) - calcAmount(standardTotal)).toLocaleString()} THB/year`
                  : t("standardProfit")}
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">{t("professionalPackage")}</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li>{isYearly ? `${t("professionalHostingCost").split(':')[0]}: ~${calcAmount(profHostingCost).toLocaleString()} THB/${isYearly ? 'year' : 'month'}` : t("professionalHostingCost")}</li>
              <li>{isYearly ? `${t("professionalSupportCost").split(':')[0]}: ~${calcAmount(profSupportCost).toLocaleString()} THB/${isYearly ? 'year' : 'month'}` : t("professionalSupportCost")}</li>
              <li>{isYearly ? `${t("professionalDevelopmentCost").split(':')[0]}: ~${calcAmount(profDevCost).toLocaleString()} THB/${isYearly ? 'year' : 'month'}` : t("professionalDevelopmentCost")}</li>
              <li className="font-semibold">{isYearly ? `${t("professionalTotalCost").split(':')[0]}: ~${calcAmount(profTotal).toLocaleString()} THB/${isYearly ? 'year' : 'month'}` : t("professionalTotalCost")}</li>
              <li className="text-green-600 font-semibold">
                {isYearly 
                  ? `Profit at ${calcAmount(profPrice).toLocaleString()} THB: ~${(calcAmount(profPrice) - calcAmount(profTotal)).toLocaleString()} THB/year`
                  : t("professionalProfit")}
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
