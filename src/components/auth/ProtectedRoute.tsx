
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/lib/types/user-roles";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: UserRole[];
}

export const ProtectedRoute = ({ 
  children, 
  requiredRoles = [] 
}: ProtectedRouteProps) => {
  const { isAuthenticated, hasRole } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Nicht authentifiziert, zur Login-Seite umleiten
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Authentifiziert, aber Prüfung, ob die Rolle ausreicht
  if (requiredRoles.length > 0 && !hasRole(requiredRoles)) {
    // Unzureichende Berechtigung, zur Dashboard-Seite umleiten
    return <Navigate to="/dashboard" replace />;
  }

  // Authentifiziert und genügend Berechtigungen
  return <>{children}</>;
};
