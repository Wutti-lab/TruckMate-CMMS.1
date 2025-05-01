
import { useAuth } from "@/contexts/AuthContext";

export function Header() {
  const { user } = useAuth();
  
  return (
    <header className="border-b bg-white p-4">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold">
          {window.location.pathname === "/dashboard" && "Dashboard"}
          {window.location.pathname === "/vehicles" && "Fahrzeuge"}
          {window.location.pathname === "/map" && "Karte"}
          {window.location.pathname === "/inspections" && "Inspektionen"}
          {window.location.pathname === "/drivers" && "Fahrer"}
          {window.location.pathname === "/qr-scanner" && "QR Scanner"}
        </h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">
            Angemeldet als: <strong>{user?.name}</strong> ({user?.role})
          </span>
        </div>
      </div>
    </header>
  );
}
