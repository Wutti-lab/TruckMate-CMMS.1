
import { Link } from "react-router-dom";
import { 
  LayoutDashboard, 
  Truck, 
  Map, 
  FileText, 
  Users, 
  QrCode, 
  LogOut,
  UserCog,
  CreditCard,
  Image
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/lib/types/user-roles";
import { useLanguage, extractLanguageText } from "@/contexts/LanguageContext";

import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar
} from "@/components/ui/sidebar";

export function Sidebar() {
  const { user, logout, hasRole } = useAuth();
  const { openMobile, setOpenMobile } = useSidebar();
  const { t, language } = useLanguage();

  const menuItems = [
    {
      title: t("dashboard"),
      icon: <LayoutDashboard size={20} />,
      href: "/dashboard",
      roles: [UserRole.ADMIN, UserRole.FLEET_MANAGER, UserRole.DRIVER, UserRole.MECHANIC, UserRole.DISPATCHER],
    },
    {
      title: t("qrScanner"),
      icon: <QrCode size={20} />,
      href: "/qr-scanner",
      roles: [UserRole.ADMIN, UserRole.DRIVER, UserRole.FLEET_MANAGER],
    },
    {
      title: t("vehicles"),
      icon: <Truck size={20} />,
      href: "/vehicles",
      roles: [UserRole.ADMIN, UserRole.FLEET_MANAGER],
    },
    {
      title: t("map"),
      icon: <Map size={20} />,
      href: "/map",
      roles: [UserRole.ADMIN, UserRole.DISPATCHER, UserRole.FLEET_MANAGER],
    },
    {
      title: t("inspections"),
      icon: <FileText size={20} />,
      href: "/inspections",
      roles: [UserRole.ADMIN, UserRole.MECHANIC, UserRole.FLEET_MANAGER, UserRole.DRIVER],
    },
    {
      title: t("drivers"),
      icon: <Users size={20} />,
      href: "/drivers",
      roles: [UserRole.ADMIN, UserRole.FLEET_MANAGER],
    },
    {
      title: t("accountManagement"),
      icon: <UserCog size={20} />,
      href: "/accounts",
      roles: [UserRole.ADMIN],
    },
    {
      title: t("advertisements"),
      icon: <Image size={20} />,
      href: "/advertisements",
      roles: [UserRole.ADMIN],
    },
    {
      title: t("pricing"),
      icon: <CreditCard size={20} />,
      href: "/pricing",
      roles: [UserRole.ADMIN, UserRole.FLEET_MANAGER, UserRole.DRIVER, UserRole.MECHANIC, UserRole.DISPATCHER],
    },
  ];

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  const handleNavigate = () => {
    // Close the mobile sidebar when navigating
    setOpenMobile(false);
  };

  return (
    <ShadcnSidebar 
      collapsible="offcanvas"
      variant="sidebar"
    >
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <div className="flex flex-col space-y-1">
          <div className="flex items-center mb-2">
            <img 
              src="/lovable-uploads/1275ea89-d888-449c-bc6c-295e38039de9.png" 
              alt="TruckMate CMMS Logo" 
              className="h-10 mr-2"
            />
            <h2 className="text-xl font-bold text-sky-100">TruckMate CMMS</h2>
          </div>
          <p className="text-sm text-sky-200">{t("easyVehicleManagement")}</p>
        </div>

        <div className="mt-4 flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-fleet-500 flex items-center justify-center">
            <span className="font-bold text-sky-100">{user?.name.charAt(0)}</span>
          </div>
          <div>
            <p className="text-sm font-medium text-sky-100">{user?.name}</p>
            <p className="text-xs text-sky-200">{user?.role}</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {menuItems
            .filter(item => hasRole(item.roles))
            .map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton 
                  asChild
                  className={cn(
                    "w-full text-sky-100 hover:bg-sidebar-accent hover:text-sky-50 rounded-md",
                    window.location.pathname === item.href && "bg-sidebar-accent text-sky-50"
                  )}
                >
                  <Link to={item.href} onClick={handleNavigate}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-sidebar-border">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-sky-100 hover:text-sky-50 hover:bg-red-900/20"
          onClick={handleLogout}
        >
          <LogOut size={20} className="mr-2" />
          {t("logout")}
        </Button>
      </SidebarFooter>
    </ShadcnSidebar>
  );
}
