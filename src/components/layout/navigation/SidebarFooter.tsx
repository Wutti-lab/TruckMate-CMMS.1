import React from "react";
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage, extractLanguageText } from "@/contexts/LanguageContext";
import { LanguageSelector } from "@/components/language/LanguageSelector";
import { SidebarFooter as SidebarFooterPrimitive } from "@/components/ui/sidebar";
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

export function SidebarFooter() {
  const { logout } = useAuth();
  const { language, t } = useLanguage();

  return (
    <SidebarFooterPrimitive className="p-4 border-t border-sidebar-border">
      <div className="space-y-3">
        {/* Language selector - always visible */}
        <div className="group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center">
          <LanguageSelector />
        </div>
        
        {/* Logout button */}
        <Button
          onClick={logout}
          variant="outline"
          size="sm"
          className="w-full touch-manipulation min-h-[44px] group-data-[collapsible=icon]:aspect-square group-data-[collapsible=icon]:w-auto group-data-[collapsible=icon]:p-2"
        >
          <LogOut className="h-4 w-4 group-data-[collapsible=icon]:mr-0 mr-2" />
          <span className="group-data-[collapsible=icon]:hidden">{t('logout')}</span>
        </Button>
        
        {/* Copyright - hidden when collapsed */}
        <div className="text-xs text-sidebar-foreground/70 text-center group-data-[collapsible=icon]:hidden">
          {extractLanguageText("© 2024 TruckMate CMMS | All rights reserved | ลิขสิทธิ์สงวน", language)}
        </div>
      </div>
    </SidebarFooterPrimitive>
  );
}