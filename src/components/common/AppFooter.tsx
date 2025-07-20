import React from 'react';
import Link from 'next/link';
import { Poppins } from 'next/font/google';
import { cn } from '@/lib/utils';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['700'],
});

export const Footer = () => {
  return (
    <footer className="border-t bg-white font-medium dark:bg-black">
      <div className="mx-auto flex h-full max-w-(--breakpoint-xl) items-center gap-2 px-4 py-6 lg:px-12">
        <p>Powered by </p>
        <Link href="/">
          <span className={cn('text-2xl font-semibold', poppins.className)}>
            funroad
          </span>
        </Link>
      </div>
    </footer>
  );
};
