
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";

export function MobileNavbar() {
  const { toggleSidebar } = useSidebar();
  
  return (
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
          src="/lovable-uploads/263fb180-3e33-4bd3-a0a9-ab3a7355d13c.png" 
          alt="TruckMate CMMS Logo" 
          className="h-8 mr-2"
        />
        <div>
          <h2 className="text-lg font-bold text-sky-100">TruckMate CMMS</h2>
          <p className="text-xs text-slate-300">ระบบจัดการยานพาหนะที่ง่ายดาย</p>
        </div>
      </div>
    </div>
  );
}
