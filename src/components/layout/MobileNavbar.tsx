
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { AdBanner } from "@/components/ads/AdBanner";
import { useLanguage, extractLanguageText } from "@/contexts/LanguageContext";

export function MobileNavbar() {
  const { toggleSidebar } = useSidebar();
  const { language } = useLanguage();
  
  return (
    <>
      <div className="md:hidden flex items-center p-4 border-b border-slate-800">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar} 
          className="text-sky-100"
        >
          <Menu size={24} />
          <span className="sr-only">Toggle menu</span>
        </Button>
        <div className="ml-4 flex items-center">
          <img 
            src="/lovable-uploads/1275ea89-d888-449c-bc6c-295e38039de9.png" 
            alt="TruckMate CMMS Logo" 
            className="h-8 mr-2"
          />
          <div>
            <h2 className="text-lg font-bold text-sky-100">TruckMate CMMS</h2>
            <p className="text-xs text-slate-300">
              {extractLanguageText("Easy vehicle management system | ระบบจัดการยานพาหนะที่ง่ายดาย", language)}
            </p>
          </div>
        </div>
      </div>
      <div className="md:hidden">
        <AdBanner />
      </div>
    </>
  );
}
