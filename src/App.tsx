
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Vehicles from "@/pages/Vehicles";
import Drivers from "@/pages/Drivers";
import Map from "@/pages/Map";
import QRScanner from "@/pages/QRScanner";
import Inspections from "@/pages/Inspections";
import Accounts from "@/pages/Accounts";
import NotFound from "@/pages/NotFound";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AppLayout } from "@/components/layout/AppLayout";
import { AuthProvider } from "@/contexts/AuthContext";
import { UserRole } from "@/lib/types/user-roles";
import Index from "@/pages/Index";
import Pricing from "@/pages/Pricing";
import { LocationProvider } from "@/contexts/LocationContext";
import { NotificationProvider } from "@/contexts/NotificationContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <LocationProvider>
          <NotificationProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/pricing" element={<Pricing />} />
              
              {/* Protected Routes that require authentication */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute allowedRoles={[UserRole.ADMIN, UserRole.FLEET_MANAGER, UserRole.DRIVER, UserRole.MECHANIC, UserRole.DISPATCHER]}>
                    <AppLayout>
                      <Dashboard />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/vehicles"
                element={
                  <ProtectedRoute allowedRoles={[UserRole.ADMIN, UserRole.FLEET_MANAGER]}>
                    <AppLayout>
                      <Vehicles />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/drivers"
                element={
                  <ProtectedRoute allowedRoles={[UserRole.ADMIN, UserRole.FLEET_MANAGER]}>
                    <AppLayout>
                      <Drivers />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/map"
                element={
                  <ProtectedRoute allowedRoles={[UserRole.ADMIN, UserRole.FLEET_MANAGER, UserRole.DISPATCHER]}>
                    <AppLayout>
                      <Map />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/inspections"
                element={
                  <ProtectedRoute allowedRoles={[UserRole.ADMIN, UserRole.FLEET_MANAGER, UserRole.MECHANIC, UserRole.DRIVER]}>
                    <AppLayout>
                      <Inspections />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/qr-scanner"
                element={
                  <ProtectedRoute allowedRoles={[UserRole.ADMIN, UserRole.DRIVER, UserRole.FLEET_MANAGER]}>
                    <AppLayout>
                      <QRScanner />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              
              <Route
                path="/accounts"
                element={
                  <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
                    <AppLayout>
                      <Accounts />
                    </AppLayout>
                  </ProtectedRoute>
                }
              />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </NotificationProvider>
        </LocationProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
