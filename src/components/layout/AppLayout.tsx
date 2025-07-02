
import React from "react";
import { MobileNavbar } from "./MobileNavbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import Sidebar from "./Sidebar";
import { AdBanner } from "@/components/ads/AdBanner";
import { useLanguage } from "@/contexts/LanguageContext";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  // We're adding the useLanguage hook here for future translations in the layout
  const { t } = useLanguage();
  
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <MobileNavbar />
          <div className="hidden md:block">
            <AdBanner />
          </div>
          <main className="flex-1 overflow-auto p-4">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
