import React from 'react';
import { Navbar, SearchFilters } from '@/containers/home';
import { Footer } from '@/components/common';
interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <SearchFilters />
      <div className="bg-background flex-1">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
