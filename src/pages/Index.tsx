import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import { LoginPage } from '../components/auth/LoginPage';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { DriverDashboard } from '../components/dashboards/DriverDashboard';
import { SupervisorDashboard } from '../components/dashboards/SupervisorDashboard';
import { FuemanDashboard } from '../components/dashboards/FuemanDashboard';
import { GLPAMADashboard } from '../components/dashboards/GLPAMADashboard';
import { AdminDashboard } from '../components/dashboards/AdminDashboard';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';

const Index = () => {
  const location = useLocation();
  
  // If we're on the login path, show login page
  if (location.pathname === '/login') {
    return (
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    );
  }

  // Otherwise show the protected dashboard
  return (
    <AuthProvider>
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    </AuthProvider>
  );
};

const RoleDashboard = () => {
  // This will be replaced with actual user role from context
  const userRole = localStorage.getItem('userRole') || 'driver';
  
  switch (userRole) {
    case 'driver':
      return <DriverDashboard />;
    case 'supervisor':
      return <SupervisorDashboard />;
    case 'fuelman':
      return <FuemanDashboard />;
    case 'glpama':
      return <GLPAMADashboard />;
    case 'admin':
      return <AdminDashboard />;
    default:
      return <DriverDashboard />;
  }
};

export { RoleDashboard };
export default Index;
