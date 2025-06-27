
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { MobileNav } from './MobileNav';

export const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="pb-20 md:pb-4">
        <Outlet />
      </main>
      <MobileNav />
    </div>
  );
};
