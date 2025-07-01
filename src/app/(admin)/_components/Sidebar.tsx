'use client';;
import React from 'react';
import { Poppins } from 'next/font/google';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import { House, Box, ChartColumnStacked, LogOut } from 'lucide-react';
import { LucideIcon } from "lucide-react";

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
];

const NavbarItem = ({ children, href, isActive, Icon }: NavbarItemsProps) => {
  return (
    <Button
      asChild
      variant="elevated"
      className={cn(
        'rounded-md border-transparent bg-transparent text-left text-lg hover:border-gray-300',
        isActive && 'bg-black text-white hover:bg-black hover:text-white'
      )}
    >
      <div className="flex items-center justify-start">
        <Icon className="size-5" />
        <Link href={`${href}`} className="text-left">
          {children}
        </Link>
      </div>
    </Button>
  );
};

export const Sidebar = () => {
  const pathname = usePathname();
  //   const user = useAppSelector(selectedUser);
  return (
    <div className="max-h-screen w-full max-w-[250px] border-r border-r-gray-200">
      <div className="flex h-full flex-col justify-between">
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
        <div className="px-3 pb-4">
          <Button className="w-full" variant="elevated" asChild>
            <div>
              <LogOut />
              <p>Logout</p>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};
