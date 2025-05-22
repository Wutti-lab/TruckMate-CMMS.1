
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

interface BillingToggleProps {
  isYearly: boolean;
  onChange: (isYearly: boolean) => void;
}

export function BillingToggle({ isYearly, onChange }: BillingToggleProps) {
  const { t } = useLanguage();
  
  return (
    <div className="flex flex-col items-center justify-center mb-8">
      <div className="flex items-center space-x-4">
        <span className={`text-sm font-medium ${!isYearly ? 'text-fleet-800' : 'text-muted-foreground'}`}>
          {t("monthlyBilling")}
        </span>
        
        <Switch 
          checked={isYearly} 
          onCheckedChange={onChange}
          className="data-[state=checked]:bg-fleet-600"
        />
        
        <div className="flex items-center">
          <span className={`text-sm font-medium mr-2 ${isYearly ? 'text-fleet-800' : 'text-muted-foreground'}`}>
            {t("yearlyBilling")}
          </span>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
            {t("saveWithYearly")}
          </Badge>
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground mt-2">
        {isYearly 
          ? t("yearlyBillingDescription") 
          : t("monthlyBillingDescription")
        }
      </p>
    </div>
  );
}
