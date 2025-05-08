
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/lib/types/user-roles";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export const ProtectedRoute = ({ 
  children, 
  allowedRoles = [] 
}: ProtectedRouteProps) => {
  const { isAuthenticated, hasRole } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Nicht authentifiziert, zur Login-Seite umleiten
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Authentifiziert, aber Prüfung, ob die Rolle ausreicht
  if (allowedRoles.length > 0 && !hasRole(allowedRoles)) {
    // Unzureichende Berechtigung, zur Dashboard-Seite umleiten
    return <Navigate to="/dashboard" replace />;
  }

  // Authentifiziert und genügend Berechtigungen
  return <>{children}</>;
};
