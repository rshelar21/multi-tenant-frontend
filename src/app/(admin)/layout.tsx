import React from 'react';
import { Sidebar } from './_components/Sidebar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen w-full">
      <Sidebar />
      <div className="w-full flex-1 px-6">{children}</div>
    </div>
  );
};
export default Layout;
