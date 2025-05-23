
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface SubscriptionProps {
  isYearly: boolean;
  onSelectPackage: (packageName: string) => void;
}

export function SubscriptionPackages({ isYearly, onSelectPackage }: SubscriptionProps) {
  const { t } = useLanguage();
  
  const packages = [
    {
      name: t("starterPackage"),
      priceMonthly: "6,000",
      priceYearly: "72,000",
      description: t("starterDescription"),
      features: [
        t("starterUsers"), 
        t("starterVehicles"),
        t("starterModules"),
        t("starterStorage")
      ]
    },
    {
      name: t("standardPackage"),
      priceMonthly: "15,000",
      priceYearly: "180,000",
      description: t("standardDescription"),
      features: [
        t("standardUsers"), 
        t("standardVehicles"),
        t("standardModules"),
        t("standardStorage")
      ]
    },
    {
      name: t("professionalPackage"),
      priceMonthly: "30,000",
      priceYearly: "360,000",
      description: t("professionalDescription"),
      features: [
        t("professionalUsers"), 
        t("professionalVehicles"),
        t("professionalModules"),
        t("professionalStorage")
      ]
    },
    {
      name: t("enterprisePackage"),
      priceMonthly: t("contact"),
      priceYearly: t("contact"),
      description: t("enterpriseDescription"),
      features: [
        t("enterpriseUsers"), 
        t("enterpriseVehicles"),
        t("enterpriseModules"),
        t("enterpriseStorage")
      ]
    }
  ];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
      {packages.map((pkg, index) => (
        <Card key={index} className="flex flex-col border-2 border-fleet-200 hover:border-fleet-400 transition-colors">
          <CardHeader>
            <CardTitle className="text-center text-xl">{pkg.name}</CardTitle>
            <CardDescription className="text-center text-lg mt-2">
              {pkg.name === t("enterprisePackage") ? (
                <span>{pkg.priceYearly}</span>
              ) : (
                <>
                  <span className="text-2xl font-bold">
                    {isYearly ? pkg.priceYearly : pkg.priceMonthly}
                  </span>
                  <span className="text-sm"> {isYearly ? t("thbYear") : t("thbMonth")}</span>
                </>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm text-muted-foreground mb-4">{pkg.description}</p>
            <ul className="space-y-2">
              {pkg.features.map((feature, i) => (
                <li key={i} className="flex items-start">
                  <Check className="h-4 w-4 text-fleet-500 mr-2 mt-0.5" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full bg-fleet-600" 
              onClick={() => onSelectPackage(pkg.name)}
            >
              {pkg.name === t("enterprisePackage") ? t("contact") : t("buyNow")}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
