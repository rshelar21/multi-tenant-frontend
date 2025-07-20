import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

import { ScrollArea } from '@/components/ui/scroll-area';
import Link from 'next/link';
import { LogOut, LucideProps, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LogtoutButton } from '@/components/common';

interface NavbarItem {
  href: string;
  children: React.ReactNode;
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
}

interface Props {
  items: NavbarItem[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  // isLogined: boolean;
}

export const NavSidebar = ({ items, onOpenChange, open }: Props) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="transform-none p-0" side="left">
        <SheetHeader className="border-b p-4">
          <div className="flex items-center">
            <SheetTitle>Menu</SheetTitle>
          </div>
        </SheetHeader>
        <ScrollArea className="h-full ">
          <div className="flex flex-col justify-between pb-2">
            <div>
              {items.map(({ Icon, children, href }) => (
                <Link
                  href={`${href}`}
                  key={href}
                  className="flex w-full items-center gap-2 p-4 text-left text-base font-medium hover:bg-black hover:text-white"
                  onClick={() => onOpenChange(false)}
                >
                  {<Icon />}
                  {children}
                </Link>
              ))}
            </div>
            <div className="mt-0 flex flex-col gap-2 px-3 pb-4">
              <Button className="w-full" variant="elevated" asChild size="sm">
                <Link prefetch href="/settings">
                  <Settings />
                  Settings
                </Link>
              </Button>
              <LogtoutButton
                className="h-fit rounded-sm border text-base hover:bg-transparent dark:hover:bg-transparent"
                Icon={LogOut}
                variant="elevated"
              />
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
