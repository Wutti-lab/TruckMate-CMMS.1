
import { useLanguage } from "@/contexts/LanguageContext";

export function useLicenseFormatters() {
  const { language } = useLanguage();
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(language === 'de' ? 'de-DE' : 'en-US').format(date);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(language === 'de' ? 'de-DE' : 'en-US', { 
      style: 'currency', 
      currency: 'THB',
      currencyDisplay: 'symbol'
    }).format(amount);
  };

  const getLicenseStatusVariant = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'expired': return 'secondary';
      case 'revoked': return 'destructive';
      default: return 'outline';
    }
  };
  
  return { formatDate, formatCurrency, getLicenseStatusVariant };
}
