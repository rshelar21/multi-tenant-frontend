import React from 'react';
import { Footer, LogtoutButton } from '@/components/common';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Poppins } from 'next/font/google';
import { Button } from '@/components/ui/button';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['700'],
});

interface Props {
  children: React.ReactNode;
}

const Layout = async ({ children }: Props) => {
  return (
    <div className="flex min-h-screen flex-col">
      <nav className="flex h-20 justify-between border-b bg-white font-medium dark:bg-black">
        <Link href="/" className="flex items-center pl-6">
          <span className={cn('text-5xl font-semibold', poppins.className)}>
            funroad
          </span>
        </Link>

        <div className="">
          <Button
            asChild
            className="h-full rounded-none border-t-0 border-r-0 border-b-0 border-l bg-black px-12 text-lg text-white transition-colors hover:bg-pink-400 hover:text-black dark:hover:bg-pink-400"
          >
            <Link href="/admin">Dashboard</Link>
          </Button>
          <LogtoutButton />
        </div>
      </nav>
      <div className="flex-1 pb-8">
        <div className="mx-auto max-w-(--breakpoint-lg)">{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
