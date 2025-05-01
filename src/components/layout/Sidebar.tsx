
import { Link } from "react-router-dom";
import { 
  LayoutDashboard, 
  Truck, 
  Map, 
  FileText, 
  Users, 
  QrCode, 
  LogOut 
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/lib/types/user-roles";

export function Sidebar() {
  const { user, logout, hasRole } = useAuth();

  const menuItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      href: "/dashboard",
      roles: [UserRole.ADMIN, UserRole.FLEET_MANAGER, UserRole.DRIVER, UserRole.MECHANIC, UserRole.DISPATCHER],
    },
    {
      title: "QR Scanner",
      icon: <QrCode size={20} />,
      href: "/qr-scanner",
      roles: [UserRole.ADMIN, UserRole.DRIVER, UserRole.FLEET_MANAGER],
    },
    {
      title: "Vehicles",
      icon: <Truck size={20} />,
      href: "/vehicles",
      roles: [UserRole.ADMIN, UserRole.FLEET_MANAGER],
    },
    {
      title: "Map",
      icon: <Map size={20} />,
      href: "/map",
      roles: [UserRole.ADMIN, UserRole.DISPATCHER, UserRole.FLEET_MANAGER],
    },
    {
      title: "Inspections",
      icon: <FileText size={20} />,
      href: "/inspections",
      roles: [UserRole.ADMIN, UserRole.MECHANIC, UserRole.FLEET_MANAGER],
    },
    {
      title: "Drivers",
      icon: <Users size={20} />,
      href: "/drivers",
      roles: [UserRole.ADMIN, UserRole.FLEET_MANAGER],
    },
  ];

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <div className="w-64 bg-slate-900 text-slate-100 h-screen flex flex-col">
      <div className="p-4 border-b border-slate-800">
        <h2 className="text-xl font-bold text-white">TruckMate CMMS</h2>
        <p className="text-sm text-slate-400">ระบบจัดการยานพาหนะที่ง่ายดาย</p>
      </div>

      <div className="p-4 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-fleet-500 flex items-center justify-center">
            <span className="font-bold text-white">{user?.name.charAt(0)}</span>
          </div>
          <div>
            <p className="text-sm font-medium">{user?.name}</p>
            <p className="text-xs text-slate-400">{user?.role}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto py-2">
        {menuItems
          .filter(item => hasRole(item.roles))
          .map((item) => (
            <Link key={item.href} to={item.href}>
              <div
                className={cn(
                  "flex items-center space-x-2 px-4 py-2 text-slate-300 hover:bg-slate-800 hover:text-white rounded-md mx-2 my-1",
                  window.location.pathname === item.href && "bg-slate-800 text-white"
                )}
              >
                {item.icon}
                <span>{item.title}</span>
              </div>
            </Link>
          ))}
      </div>

      <div className="p-4 border-t border-slate-800">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-slate-300 hover:text-white hover:bg-red-900/20"
          onClick={handleLogout}
        >
          <LogOut size={20} className="mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
}
