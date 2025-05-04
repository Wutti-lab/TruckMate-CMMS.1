
import { Outlet } from "react-router-dom";
import { MobileNavbar } from "./MobileNavbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Sidebar } from "./Sidebar";

export function AppLayout() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <MobileNavbar />
          <Outlet />
        </div>
      </div>
    </SidebarProvider>
  );
}
