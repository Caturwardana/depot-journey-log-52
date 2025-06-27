
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import { LoginPage } from '../components/auth/LoginPage';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { DriverDashboard } from '../components/dashboards/DriverDashboard';
import { SupervisorDashboard } from '../components/dashboards/SupervisorDashboard';
import { FuemanDashboard } from '../components/dashboards/FuemanDashboard';
import { GLPAMADashboard } from '../components/dashboards/GLPAMADashboard';
import { AdminDashboard } from '../components/dashboards/AdminDashboard';
import { TransportDetails } from '../components/transport/TransportDetails';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';

const Index = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          
          <Route path="/" element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<RoleDashboard />} />
            <Route path="transport/:id" element={<TransportDetails />} />
          </Route>
        </Routes>
      </AuthProvider>
    </div>
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

export default Index;
