
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  LayoutDashboard,
  Settings,
  Truck,
  FileText,
  AlertCircle,
  Calendar,
  LucideIcon
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSidebar, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';

interface MenuItem {
  icon: LucideIcon;
  labelKey: string;
  path: string;
}

export function AppSidebarMenu() {
  const location = useLocation();
  const { t } = useLanguage();
  const { setOpenMobile } = useSidebar();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLinkClick = () => {
    // Close sidebar on mobile when link is clicked
    setOpenMobile(false);
  };

  const menuItems: MenuItem[] = [
    {
      icon: Home,
      labelKey: 'Home | หน้าหลัก | Startseite',
      path: '/'
    },
    {
      icon: LayoutDashboard,
      labelKey: 'Dashboard | แดชบอร์ด | Dashboard',
      path: '/dashboard'
    },
    {
      icon: Truck,
      labelKey: 'Vehicles | ยานพาหนะ | Fahrzeuge',
      path: '/vehicles'
    },
    {
      icon: AlertCircle,
      labelKey: 'Inspections | การตรวจสอบ | Inspektionen',
      path: '/inspections'
    },
    {
      icon: Calendar,
      labelKey: 'Maintenance | การบำรุงรักษา | Wartung',
      path: '/maintenance'
    },
    {
      icon: FileText,
      labelKey: 'Reports | รายงาน | Berichte',
      path: '/reports'
    },
    {
      icon: Settings,
      labelKey: 'Settings | การตั้งค่า | Einstellungen',
      path: '/settings'
    }
  ];

  return (
    <SidebarMenu>
      {menuItems.map((item) => (
        <SidebarMenuItem key={item.path}>
          <SidebarMenuButton 
            asChild 
            isActive={isActive(item.path)}
            size="lg"
            className="touch-manipulation min-h-[48px] w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          >
            <Link to={item.path} onClick={handleLinkClick}>
              <item.icon className="h-5 w-5 flex-shrink-0" />
              <span className="truncate font-medium">
                {t(item.labelKey)}
              </span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
