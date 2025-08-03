import React from 'react';
import { CheckoutHeader } from '@/containers/tenants';
import { Footer } from '@/components/common';
import { Navbar } from '@/containers/home';

interface Props {
  children: React.ReactNode;
  params: Promise<{
    slug: string;
  }>;
}

const Layout = async ({ children, params }: Props) => {
  const { slug } = await params;
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <CheckoutHeader slug={slug} />
      <div className="flex-1">
        <div className="mx-auto max-w-(--breakpoint-xl)">{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
