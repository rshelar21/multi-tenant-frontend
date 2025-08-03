import React from 'react';
import { Sidebar } from '@/containers/admin/Sidebar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative h-screen w-full md:flex">
      <Sidebar />
      <div className="w-full flex-1 overflow-y-scroll px-6">{children}</div>
    </div>
  );
};
export default Layout;
