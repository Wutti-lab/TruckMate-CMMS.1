import React, { useState } from 'react';
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
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

interface MenuItem {
  icon: LucideIcon;
  label: string;
  path: string;
}

const Sidebar = () => {
  const location = useLocation();
  const { profile, logout } = useAuth();
  const { language } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

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
    <div
      className={`flex flex-col h-full bg-gray-50 border-r border-gray-200 ${
        isExpanded ? 'w-64' : 'w-20'
      } transition-width duration-300`}
    >
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-800">
          {isExpanded ? 'TruckMate CMMS' : 'TM'}
        </h1>
        {profile && isExpanded && (
          <p className="text-sm text-gray-500 mt-1">
            {language === 'de' ? 'Angemeldet als' : language === 'th' ? 'ลงชื่อเข้าใช้ในชื่อ' : 'Logged in as'}: {profile.name}
          </p>
        )}
      </div>
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
                {isExpanded && <span>{item.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="p-4">
        {isExpanded && (
          <button
            onClick={logout}
            className="w-full py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
          >
            {language === 'de' ? 'Abmelden' : language === 'th' ? 'ออกจากระบบ' : 'Logout'}
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
