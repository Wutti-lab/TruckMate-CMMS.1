
import { Button } from "@/components/ui/button";
import { QrCode } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface CustomOfferSectionProps {
  onClick: () => void;
}

export function CustomOfferSection({ onClick }: CustomOfferSectionProps) {
  const { t } = useLanguage();
  
  return (
    <div className="mt-12 text-center">
      <h2 className="text-xl font-semibold mb-4">{t("needCustomOffer")}?</h2>
      <p className="mb-4 max-w-2xl mx-auto">
        {t("contactUsForTailoredSolutions")}
      </p>
      <Button variant="outline" onClick={onClick}>
        <QrCode className="mr-2 h-4 w-4" />
        {t("contact")}
      </Button>
    </div>
  );
}
