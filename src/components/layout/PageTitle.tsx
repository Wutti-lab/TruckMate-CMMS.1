
import { useLanguage, extractLanguageText } from "@/contexts/LanguageContext";

export function PageTitle() {
  const { language } = useLanguage();
  
  // The page titles in different languages
  const pageTitle = {
    "/dashboard": "Dashboard | แดชบอร์ด",
    "/vehicles": "Vehicles | ยานพาหนะ",
    "/map": "Map | แผนที่",
    "/inspections": "Inspections | การตรวจสอบ",
    "/drivers": "Drivers | คนขับ",
    "/qr-scanner": "QR Scanner | เครื่องสแกน QR",
    "/accounts": "Account Management | การจัดการบัญชี",
    "/pricing": "Pricing | ราคา"
  };

  // Get the current page title and extract the appropriate language text
  const currentPageTitle = pageTitle[window.location.pathname as keyof typeof pageTitle];
  const formattedPageTitle = currentPageTitle ? extractLanguageText(currentPageTitle, language) : "TruckMate CMMS";
  
  return (
    <h1 className="font-semibold">
      {formattedPageTitle}
    </h1>
  );
}
