'use client';
import { Input } from '@/components/ui/input';
import { BookmarkCheckIcon, ListFilterIcon, SearchIcon } from 'lucide-react';
import { useState } from 'react';
import { List } from './filters.constant';
import { CategorySidebar } from './category-sidebar';
import { Button } from '@/components/ui/button';
import { selectedUser } from '@/reducers/userSlice';
import { useAppSelector } from '@/store/hooks';
import Link from 'next/link';

interface Props {
  disabled?: boolean;
  data: List[];
}

export const SearchInput = ({ disabled, data }: Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const user = useAppSelector(selectedUser);
  return (
    <div className="flex w-full items-center gap-2">
      <CategorySidebar
        open={isSidebarOpen}
        onOpenChange={setIsSidebarOpen}
        data={data}
      />
      <div className="relative w-full">
        <SearchIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-500" />
        <Input
          className="pl-8"
          placeholder="Search Products"
          disabled={disabled}
        />
      </div>

      <Button
        variant="elevated"
        className="flex size-12 shrink-0 lg:hidden"
        onClick={() => setIsSidebarOpen(true)}
      >
        <ListFilterIcon />
      </Button>
      {/* add librby btn */}
      {user?.loginStatus && (
        <Button variant="elevated" asChild>
          <Link href="/library" prefetch>
            <BookmarkCheckIcon className="mr-2" />
            Library
          </Link>
        </Button>
      )}
    </div>
  );
};
