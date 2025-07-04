
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { LocationProvider } from './contexts/LocationContext';
import { NotificationProvider } from './contexts/NotificationContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Vehicles from './pages/Vehicles';
import Drivers from './pages/Drivers';
import Inspections from './pages/Inspections';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import ResetPassword from './pages/ResetPassword';
import SetNewPassword from './pages/SetNewPassword';
import NotFound from './pages/NotFound';
import Reports from "./pages/Reports";
import FunctionList from "./pages/FunctionList";
import Map from "./pages/Map";
import QRScanner from "./pages/QRScanner";
import Accounts from "./pages/Accounts";
import Customers from "./pages/Customers";
import Pricing from "./pages/Pricing";
import AdvertisementManager from "./pages/AdvertisementManager";
import AdminSetup from "./pages/AdminSetup";
import Register from "./pages/Register";
import Index from "./pages/Index";

const queryClient = new QueryClient();

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <LocationProvider>
          <NotificationProvider>
            <QueryClientProvider client={queryClient}>
              <Toaster />
              <Router>
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  <Route path="/set-new-password" element={<SetNewPassword />} />
                  <Route path="/admin-setup" element={<AdminSetup />} />
                  <Route path="/" element={<Index />} />
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/vehicles"
                    element={
                      <ProtectedRoute>
                        <Vehicles />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/drivers"
                    element={
                      <ProtectedRoute>
                        <Drivers />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/inspections"
                    element={
                      <ProtectedRoute>
                        <Inspections />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/reports"
                    element={
                      <ProtectedRoute>
                        <Reports />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/functions"
                    element={
                      <ProtectedRoute>
                        <FunctionList />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/map"
                    element={
                      <ProtectedRoute>
                        <Map />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/qr-scanner"
                    element={
                      <ProtectedRoute>
                        <QRScanner />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/accounts"
                    element={
                      <ProtectedRoute>
                        <Accounts />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/customers"
                    element={
                      <ProtectedRoute>
                        <Customers />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/pricing"
                    element={
                      <ProtectedRoute>
                        <Pricing />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/advertisements"
                    element={
                      <ProtectedRoute>
                        <AdvertisementManager />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Router>
            </QueryClientProvider>
          </NotificationProvider>
        </LocationProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
