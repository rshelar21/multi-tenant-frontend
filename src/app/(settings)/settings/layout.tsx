import React from 'react';
import { Navbar } from '@/containers/home';
import { Footer } from '@/components/common';

interface Props {
  children: React.ReactNode;
}

const Layout = async ({ children }: Props) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-1 pb-8">
        <div className="mx-auto max-w-(--breakpoint-lg)">{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
