
import { useAuth } from "@/contexts/AuthContext";

export function Header() {
  const { user } = useAuth();
  
  return (
    <header className="border-b bg-white p-4">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold">
          {window.location.pathname === "/dashboard" && "Dashboard | แดชบอร์ด"}
          {window.location.pathname === "/vehicles" && "Vehicles | ยานพาหนะ"}
          {window.location.pathname === "/map" && "Map | แผนที่"}
          {window.location.pathname === "/inspections" && "Inspections | การตรวจสอบ"}
          {window.location.pathname === "/drivers" && "Drivers | คนขับ"}
          {window.location.pathname === "/qr-scanner" && "QR Scanner | เครื่องสแกน QR"}
          {window.location.pathname === "/accounts" && "Account Management | การจัดการบัญชี"}
        </h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">
            Logged in as: <strong>{user?.name}</strong> ({user?.role})
          </span>
        </div>
      </div>
    </header>
  );
}
