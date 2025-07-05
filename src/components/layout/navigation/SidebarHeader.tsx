import React from "react";
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage, extractLanguageText } from "@/contexts/LanguageContext";
import { SidebarHeader as SidebarHeaderPrimitive, SidebarTrigger } from "@/components/ui/sidebar";

export function SidebarHeader() {
  const { profile } = useAuth();
  const { language } = useLanguage();

  return (
    <SidebarHeaderPrimitive className="p-4 border-b border-sidebar-border">
      <div className="flex items-center justify-between">
        <div className="flex items-center min-w-0">
          <img 
            src="/lovable-uploads/1275ea89-d888-449c-bc6c-295e38039de9.png" 
            alt="TruckMate CMMS Logo" 
            className="h-8 w-auto flex-shrink-0"
          />
          <div className="ml-3 min-w-0 group-data-[collapsible=icon]:hidden">
            <h2 className="text-lg font-bold text-sidebar-foreground truncate">TruckMate CMMS</h2>
            <p className="text-xs text-sidebar-foreground/70 truncate">
              {extractLanguageText("Easy vehicle management system | ระบบจัดการยานพาหนะที่ง่ายดาย", language)}
            </p>
            {profile && (
              <p className="text-xs text-sidebar-foreground/60 mt-1 truncate">
                {profile.full_name}
              </p>
            )}
          </div>
        </div>
        <SidebarTrigger className="h-7 w-7 text-sidebar-foreground hover:bg-sidebar-accent" />
      </div>
    </SidebarHeaderPrimitive>
  );
}