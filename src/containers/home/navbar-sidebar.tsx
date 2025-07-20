import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

import { ScrollArea } from '@/components/ui/scroll-area';
import Link from 'next/link';
import { LogtoutButton } from '@/components/common';

interface NavbarItem {
  href: string;
  children: React.ReactNode;
}

interface Props {
  items: NavbarItem[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isLogined: boolean;
}

export const NavbarSidebar = ({
  items,
  onOpenChange,
  open,
  isLogined,
}: Props) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="transform-none p-0" side="left">
        <SheetHeader className="border-b p-4">
          <div className="flex items-center">
            <SheetTitle>Menu</SheetTitle>
          </div>
        </SheetHeader>
        <ScrollArea className="flex h-full flex-col overflow-y-auto pb-2">
          {items.map((item) => (
            <Link
              href={`/${item?.href}`}
              key={item.href}
              className="flex w-full items-center p-4 text-left text-base font-medium hover:bg-black hover:text-white"
              onClick={() => onOpenChange(false)}
            >
              {item.children}
            </Link>
          ))}
          <div className="border-t">
            {isLogined ? (
              <>
                <Link
                  href="/admin"
                  className="flex w-full items-center p-4 text-left text-base font-medium hover:bg-black hover:text-white"
                >
                  Dashboard
                </Link>
                <LogtoutButton
                  // variant="link"
                  className="m-0 border-0 bg-transparent p-4 text-left text-base font-medium outline-0 hover:bg-black hover:text-white dark:bg-transparent"
                />
              </>
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="flex w-full items-center p-4 text-left text-base font-medium hover:bg-black hover:text-white"
                >
                  Log In
                </Link>
                <Link
                  href="/sign-up"
                  className="flex w-full items-center p-4 text-left text-base font-medium hover:bg-black hover:text-white"
                >
                  Start Selling
                </Link>
              </>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
