
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
import { useTranslation } from '@/hooks/useTranslation';

interface MenuItem {
  icon: LucideIcon;
  labelKey: string;
  path: string;
}

export function SidebarMenu() {
  const location = useLocation();
  const { tWithFallback } = useTranslation();

  const isActive = (path: string) => {
    return location.pathname === path;
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
    <nav className="flex-1 p-2">
      <ul>
        {menuItems.map((item) => (
          <li key={item.path} className="mb-1">
            <Link
              to={item.path}
              className={`flex items-center p-2 rounded-md text-gray-700 hover:bg-gray-200 transition-colors ${
                isActive(item.path) ? 'bg-gray-200 font-semibold' : ''
              }`}
            >
              <item.icon className="mr-2 h-4 w-4 flex-shrink-0" />
              <span className="truncate">
                {tWithFallback(item.labelKey)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
