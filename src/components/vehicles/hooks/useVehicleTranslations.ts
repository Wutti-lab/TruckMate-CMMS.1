import { useLanguage } from "@/contexts/LanguageContext";

export function useVehicleTranslations() {
  const { language } = useLanguage();
  
  const getHeaderText = (en: string, de: string): string => {
    return language === 'de' ? de : en;
  };

  return { getHeaderText };
}