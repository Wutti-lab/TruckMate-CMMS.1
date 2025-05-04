
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";

import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import { AppLayout } from "./components/layout/AppLayout";
import { UserRole } from "./lib/types/user-roles";

// Pages
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Vehicles from "@/pages/Vehicles";
import QRScanner from "@/pages/QRScanner";
import Map from "@/pages/Map";
import Inspections from "@/pages/Inspections";
import Drivers from "@/pages/Drivers";
import Accounts from "@/pages/Accounts";
import NotFound from "@/pages/NotFound";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          
          {/* Protected Routes in AppLayout */}
          <Route path="/" element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }>
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* Fleet Manager and Admin Routes */}
            <Route path="/vehicles" element={
              <ProtectedRoute requiredRoles={[UserRole.ADMIN, UserRole.FLEET_MANAGER]}>
                <Vehicles />
              </ProtectedRoute>
            } />
            
            {/* Driver Routes */}
            <Route path="/qr-scanner" element={
              <ProtectedRoute requiredRoles={[UserRole.ADMIN, UserRole.DRIVER, UserRole.FLEET_MANAGER]}>
                <QRScanner />
              </ProtectedRoute>
            } />
            
            {/* Dispatcher Routes */}
            <Route path="/map" element={
              <ProtectedRoute requiredRoles={[UserRole.ADMIN, UserRole.DISPATCHER, UserRole.FLEET_MANAGER]}>
                <Map />
              </ProtectedRoute>
            } />
            
            {/* Mechanic and Driver Routes */}
            <Route path="/inspections" element={
              <ProtectedRoute requiredRoles={[UserRole.ADMIN, UserRole.MECHANIC, UserRole.FLEET_MANAGER, UserRole.DRIVER]}>
                <Inspections />
              </ProtectedRoute>
            } />
            
            {/* Admin Routes */}
            <Route path="/drivers" element={
              <ProtectedRoute requiredRoles={[UserRole.ADMIN, UserRole.FLEET_MANAGER]}>
                <Drivers />
              </ProtectedRoute>
            } />

            {/* Account Management - Only for Admin */}
            <Route path="/accounts" element={
              <ProtectedRoute requiredRoles={[UserRole.ADMIN]}>
                <Accounts />
              </ProtectedRoute>
            } />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

export default App;
