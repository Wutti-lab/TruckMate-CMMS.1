
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function Index() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    console.log('Index: Auth state check', { isAuthenticated, isLoading });
    
    if (!isLoading) {
      if (isAuthenticated) {
        console.log('Index: User is authenticated, redirecting to functions');
        navigate("/functions");
      } else {
        console.log('Index: User is not authenticated, redirecting to login');
        navigate("/login");
      }
    }
  }, [navigate, isAuthenticated, isLoading]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-fleet-50 to-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-fleet-600 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">
            {/* Multi-language loading text */}
            TruckMate CMMS wird geladen...
          </p>
        </div>
      </div>
    );
  }

  return null;
}
