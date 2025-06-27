
import React from 'react';
import { LogOut, User, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '../../contexts/AuthContext';

export const Header = () => {
  const { user, logout } = useAuth();

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'driver': return 'Driver';
      case 'supervisor': return 'Transport Supervisor';
      case 'fuelman': return 'Fuelman';
      case 'glpama': return 'GL PAMA';
      case 'admin': return 'Administrator';
      default: return role;
    }
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
              <Truck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-slate-800">FuelTracker</h1>
              <p className="text-xs text-slate-500 hidden sm:block">Transport Management System</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2">
              <User className="w-4 h-4 text-slate-400" />
              <div className="text-right">
                <p className="text-sm font-medium text-slate-700">{user?.fullname}</p>
                <p className="text-xs text-slate-500">{getRoleDisplayName(user?.role || '')}</p>
              </div>
            </div>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={logout}
              className="text-slate-600 hover:text-slate-800"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:ml-2 sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
