
import { useState } from 'react';
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

interface MenuItem {
  icon: LucideIcon;
  label: string;
  path: string;
}

export function SidebarMenu() {
  const location = useLocation();
  const { language } = useLanguage();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const menuItems: MenuItem[] = [
    {
      icon: Home,
      label: language === 'de' ? 'Startseite' : language === 'th' ? 'หน้าหลัก' : 'Home',
      path: '/'
    },
    {
      icon: LayoutDashboard,
      label: language === 'de' ? 'Dashboard' : language === 'th' ? 'แดชบอร์ด' : 'Dashboard',
      path: '/dashboard'
    },
    {
      icon: Truck,
      label: language === 'de' ? 'Fahrzeuge' : language === 'th' ? 'ยานพาหนะ' : 'Vehicles',
      path: '/vehicles'
    },
    {
      icon: AlertCircle,
      label: language === 'de' ? 'Inspektionen' : language === 'th' ? 'การตรวจสอบ' : 'Inspections',
      path: '/inspections'
    },
    {
      icon: Calendar,
      label: language === 'de' ? 'Wartung' : language === 'th' ? 'การบำรุงรักษา' : 'Maintenance',
      path: '/maintenance'
    },
    {
      icon: FileText,
      label: language === 'de' ? 'Berichte' : language === 'th' ? 'รายงาน' : 'Reports',
      path: '/reports'
    },
    {
      icon: Settings,
      label: language === 'de' ? 'Einstellungen' : language === 'th' ? 'การตั้งค่า' : 'Settings',
      path: '/settings'
    }
  ];

  return (
    <nav className="flex-1 p-2">
      <ul>
        {menuItems.map((item) => (
          <li key={item.path} className="mb-1">
            <Link
              to={item.path}
              className={`flex items-center p-2 rounded-md text-gray-700 hover:bg-gray-200 ${
                isActive(item.path) ? 'bg-gray-200 font-semibold' : ''
              }`}
            >
              <item.icon className="mr-2 h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
