
import React from 'react';
import { Home, Truck, FileText, BarChart3, Settings } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export const MobileNav = () => {
  const { user } = useAuth();

  const getNavItems = () => {
    switch (user?.role) {
      case 'driver':
        return [
          { icon: Home, label: 'Dashboard', active: true },
          { icon: Truck, label: 'Transport', active: false },
          { icon: FileText, label: 'Documents', active: false },
        ];
      case 'supervisor':
        return [
          { icon: Home, label: 'Dashboard', active: true },
          { icon: Truck, label: 'Verify', active: false },
          { icon: FileText, label: 'Reports', active: false },
        ];
      case 'fuelman':
        return [
          { icon: Home, label: 'Dashboard', active: true },
          { icon: Truck, label: 'Quality', active: false },
          { icon: BarChart3, label: 'Readings', active: false },
        ];
      case 'glpama':
        return [
          { icon: Home, label: 'Dashboard', active: true },
          { icon: BarChart3, label: 'Reports', active: false },
          { icon: FileText, label: 'Export', active: false },
        ];
      case 'admin':
        return [
          { icon: Home, label: 'Dashboard', active: true },
          { icon: Settings, label: 'Users', active: false },
          { icon: BarChart3, label: 'Analytics', active: false },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 md:hidden">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item, index) => (
          <button
            key={index}
            className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-lg transition-colors ${
              item.active 
                ? 'text-orange-500 bg-orange-50' 
                : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};
