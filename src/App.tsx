import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { LocationProvider } from './contexts/LocationContext';
import { NotificationProvider } from './contexts/NotificationContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Vehicles from './pages/Vehicles';
import Drivers from './pages/Drivers';
import Inspections from './pages/Inspections';
import ProtectedRoute from './components/ProtectedRoute';
import ResetPassword from './pages/ResetPassword';
import SetNewPassword from './pages/SetNewPassword';
import NotFound from './pages/NotFound';
import Reports from "./pages/Reports";

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
                  <Route path="/reset-password" element={<ResetPassword />} />
                  <Route path="/set-new-password" element={<SetNewPassword />} />
                  <Route
                    path="/"
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
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
                  <Route path="*" element={<NotFound />} />
                  <Route
                    path="/reports"
                    element={
                      <ProtectedRoute>
                        <Reports />
                      </ProtectedRoute>
                    }
                  />
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
