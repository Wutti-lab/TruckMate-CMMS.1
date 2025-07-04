import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  LayoutDashboard,
  Truck,
  Users,
  Map,
  AlertCircle,
  FileText,
  QrCode,
  Settings,
  UserCheck,
  DollarSign,
  Megaphone,
  AppWindow
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSidebar, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { LucideIcon } from 'lucide-react';

interface MenuItem {
  icon: LucideIcon;
  labelKey: string;
  path: string;
  section?: 'main' | 'admin' | 'tools';
}

export function NavigationMenu() {
  const location = useLocation();
  const { t } = useLanguage();
  const { setOpenMobile } = useSidebar();

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === '/' || location.pathname === '/dashboard';
    }
    return location.pathname === path;
  };

  const handleLinkClick = () => {
    setOpenMobile(false);
  };

  const mainMenuItems: MenuItem[] = [
    {
      icon: Home,
      labelKey: 'home',
      path: '/dashboard',
      section: 'main'
    },
    {
      icon: Truck,
      labelKey: 'vehicles',
      path: '/vehicles',
      section: 'main'
    },
    {
      icon: Users,
      labelKey: 'drivers',
      path: '/drivers',
      section: 'main'
    },
    {
      icon: Map,
      labelKey: 'map',
      path: '/map',
      section: 'main'
    },
    {
      icon: AlertCircle,
      labelKey: 'inspections',
      path: '/inspections',
      section: 'main'
    },
    {
      icon: FileText,
      labelKey: 'reports',
      path: '/reports',
      section: 'main'
    }
  ];

  const toolMenuItems: MenuItem[] = [
    {
      icon: QrCode,
      labelKey: 'qrScanner',
      path: '/qr-scanner',
      section: 'tools'
    },
    {
      icon: AppWindow,
      labelKey: 'functions',
      path: '/functions',
      section: 'tools'
    }
  ];

  const adminMenuItems: MenuItem[] = [
    {
      icon: Settings,
      labelKey: 'accountManagement',
      path: '/accounts',
      section: 'admin'
    },
    {
      icon: UserCheck,
      labelKey: 'customers',
      path: '/customers',
      section: 'admin'
    },
    {
      icon: DollarSign,
      labelKey: 'pricing',
      path: '/pricing',
      section: 'admin'
    },
    {
      icon: Megaphone,
      labelKey: 'advertisements',
      path: '/advertisements',
      section: 'admin'
    }
  ];

  const renderMenuSection = (items: MenuItem[], title?: string) => (
    <div className="space-y-1">
      {title && (
        <div className="px-3 py-2 text-xs font-semibold text-sidebar-foreground/70 uppercase tracking-wider group-data-[collapsible=icon]:hidden">
          {title}
        </div>
      )}
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.path}>
            <SidebarMenuButton 
              asChild 
              isActive={isActive(item.path)}
              size="lg"
              className="touch-manipulation min-h-[48px] w-full justify-start gap-3 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground data-[active=true]:font-medium"
            >
              <Link to={item.path} onClick={handleLinkClick}>
                <item.icon className="h-5 w-5 flex-shrink-0" />
                <span className="truncate group-data-[collapsible=icon]:hidden">
                  {t(item.labelKey)}
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </div>
  );

  return (
    <div className="space-y-6">
      {renderMenuSection(mainMenuItems)}
      {renderMenuSection(toolMenuItems, t('tools'))}
      {renderMenuSection(adminMenuItems, t('admin'))}
    </div>
  );
}