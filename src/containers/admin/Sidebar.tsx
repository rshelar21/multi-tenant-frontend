'use client';
import React, { useState } from 'react';
import { Poppins } from 'next/font/google';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import {
  House,
  Box,
  ChartColumnStacked,
  LogOut,
  Tags,
  Settings,
  MenuIcon,
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { NavSidebar } from './NavSidebar';
import { LogtoutButton } from '@/components/common';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['700'],
});

interface NavbarItemsProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
  Icon: LucideIcon;
}

const navbarItems = [
  { href: '/admin', children: 'Home', Icon: House },
  { href: '/admin/products', children: 'Products', Icon: Box },
  { href: '/admin/category', children: 'Category', Icon: ChartColumnStacked },
  { href: '/admin/tags', children: 'Tags', Icon: Tags },
];

const NavbarItem = ({ children, href, isActive, Icon }: NavbarItemsProps) => {
  return (
    <div
      className={cn(
        'hover:bg-surface rounded-md border border-transparent text-base transition-all duration-200 ease-in-out dark:text-white',
        isActive &&
          'bg-surface border-gray-300 dark:border-gray-500 dark:text-white'
      )}
    >
      <Link href={`${href}`} prefetch>
        <div className={cn('flex cursor-pointer items-center gap-4 px-4 py-2')}>
          <Icon className="size-5" />
          {children}
        </div>
      </Link>
    </div>
  );
};

export const Sidebar = () => {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="dark:border-r-border dark:bg-background bg-background max-h-screen w-full md:max-w-[250px] md:border-r md:border-r-gray-200">
      <div className="hidden h-full flex-col justify-between md:flex">
        <div className="pt-3">
          <Link href="/" className="px-4">
            <span className={cn('text-4xl font-semibold', poppins.className)}>
              funroad
            </span>
          </Link>

          <div className="flex flex-col gap-3 px-3 pt-4">
            {navbarItems?.map((item) => (
              <NavbarItem
                key={item.href}
                href={item.href}
                isActive={item.href === pathname}
                Icon={item?.Icon}
              >
                {item.children}
              </NavbarItem>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2 px-3 pb-4">
          <NavbarItem
            Icon={Settings}
            isActive={'/settings' === pathname}
            href="/settings"
          >
            Settings
          </NavbarItem>
          <LogtoutButton
            className="h-fit rounded-sm border text-base hover:bg-transparent dark:hover:bg-transparent"
            Icon={LogOut}
            variant="elevated"
          />
        </div>
      </div>

      <div className="flex h-20 justify-between px-2 lg:hidden">
        <Link href="/" className="flex items-center pl-4">
          <span className={cn('text-4xl font-semibold', poppins.className)}>
            funroad
          </span>
        </Link>

        <div className="flex items-center justify-center lg:hidden">
          <Button
            asChild
            className="size-12 border-transparent bg-white"
            variant="ghost"
            onClick={() => setIsSidebarOpen(true)}
          >
            <MenuIcon />
          </Button>
        </div>
      </div>

      <NavSidebar
        open={isSidebarOpen}
        items={navbarItems}
        onOpenChange={setIsSidebarOpen}
      />
    </div>
  );
};
