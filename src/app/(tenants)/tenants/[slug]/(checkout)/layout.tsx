import React from 'react';
import { Navbar } from './_components/Navbar';
import { Footer } from '../_components/Footer';

interface Props {
  children: React.ReactNode;
  params: Promise<{
    slug: string;
  }>;
}

const Layout = async ({ children, params }: Props) => {
  const { slug } = await params;
  return (
    <div className="flex min-h-screen flex-col bg-[#f4f4f0]">
      <Navbar slug={slug} />
      <div className="flex-1">
        <div className="mx-auto max-w-(--breakpoint-xl)">{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
