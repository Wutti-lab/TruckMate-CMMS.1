
import { useLanguage } from "@/contexts/LanguageContext";

export function useFormatters() {
  const { language } = useLanguage();
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(language === 'de' ? 'de-DE' : 'en-US', { 
      style: 'currency', 
      currency: 'THB',
      currencyDisplay: 'symbol'
    }).format(amount);
  };
  
  return { formatCurrency };
}
