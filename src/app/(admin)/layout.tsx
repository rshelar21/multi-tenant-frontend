import React from 'react';
import { Sidebar } from './_components/Sidebar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative md:flex h-screen w-full">
      <Sidebar />
      <div className="w-full flex-1 overflow-y-scroll px-6">{children}</div>
    </div>
  );
};
export default Layout;
