
import React from "react";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
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
      <div className="flex min-h-screen w-full">
        <Sidebar />
        <SidebarInset className="flex flex-col">
          {/* Mobile header with trigger */}
          <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border bg-background px-4 md:hidden">
            <SidebarTrigger className="h-7 w-7" />
            <div className="flex items-center min-w-0">
              <img 
                src="/lovable-uploads/1275ea89-d888-449c-bc6c-295e38039de9.png" 
                alt="TruckMate CMMS Logo" 
                className="h-6 w-auto flex-shrink-0 mr-2"
              />
              <h1 className="text-lg font-bold text-foreground truncate">TruckMate CMMS</h1>
            </div>
          </header>
          
          {/* Ad Banner */}
          <AdBanner />
          
          {/* Main content with touch-optimized padding */}
          <main className="flex-1 overflow-auto p-4 md:p-6 touch-manipulation">
            <div className="mx-auto max-w-screen-2xl">
              {children}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
