import React from 'react';
import { Navbar } from './navbar';
import { Footer } from './footer';
import { SearchFilters } from './search-filters';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <SearchFilters />
      <div className="flex-1 bg-[#f4f4f0]">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
