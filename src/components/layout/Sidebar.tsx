
import { useState } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Car,
  LayoutDashboard,
  Map,
  Settings,
  LogOut,
  Menu,
  Users,
  ChevronLeft,
  ClipboardList,
  ScanQrCode
} from "lucide-react";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-white border-r transition-all duration-300",
        collapsed ? "w-[70px]" : "w-[250px]",
        className
      )}
    >
      <div className="flex items-center justify-between p-4 border-b">
        {!collapsed && (
          <div className="font-bold text-fleet-500 text-xl">TruckMate CMMS</div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <Menu size={20} /> : <ChevronLeft size={20} />}
        </Button>
      </div>

      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2">
          <NavItem
            to="/"
            icon={<LayoutDashboard size={20} />}
            label="Dashboard"
            collapsed={collapsed}
          />
          <NavItem
            to="/qr-scanner"
            icon={<ScanQrCode size={20} />}
            label="QR Scanner"
            collapsed={collapsed}
          />
          <NavItem
            to="/vehicles"
            icon={<Car size={20} />}
            label="Vehicles"
            collapsed={collapsed}
          />
          <NavItem
            to="/map"
            icon={<Map size={20} />}
            label="Map"
            collapsed={collapsed}
          />
          <NavItem
            to="/inspections"
            icon={<ClipboardList size={20} />}
            label="Inspections"
            collapsed={collapsed}
          />
          <NavItem
            to="/drivers"
            icon={<Users size={20} />}
            label="Drivers"
            collapsed={collapsed}
          />
          <NavItem
            to="/settings"
            icon={<Settings size={20} />}
            label="Settings"
            collapsed={collapsed}
          />
        </nav>
      </div>

      <div className="mt-auto border-t p-2">
        <NavItem
          to="/logout"
          icon={<LogOut size={20} />}
          label="Logout"
          collapsed={collapsed}
        />
      </div>
    </div>
  );
}

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
}

function NavItem({ to, icon, label, collapsed }: NavItemProps) {
  return (
    <Link to={to}>
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start font-normal hover:bg-fleet-50 hover:text-fleet-500",
          collapsed ? "px-2" : "px-3"
        )}
      >
        {icon}
        {!collapsed && <span className="ml-2">{label}</span>}
      </Button>
    </Link>
  );
}
