'use client';;
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import {
  Sheet,
  SheetHeader,
  SheetTitle,
  SheetContent,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { List } from './filters.constant';
interface Props {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  data?: List[];
}

export const CategorySidebar = ({ open, onOpenChange, data }: Props) => {
  const router = useRouter();
  const [parentCategories, setParentCategories] = useState<List[] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<List | null>(null);

  const currentCatgories = parentCategories ?? data ?? [];

  // const selectedBgColor = selectedCategory?.color || 'white';

  const handleOpenChange = (open: boolean) => {
    setParentCategories(null);
    setSelectedCategory(null);
    onOpenChange(open);
  };

  const handleBack = () => {
    setParentCategories(null);
    setSelectedCategory(null);
  };

  const handleCategoryClick = (cat: List) => {
    if (cat.subcategories && cat.subcategories.length > 0) {
      setParentCategories(cat.subcategories);
      setSelectedCategory(cat);
    } else {
      if (parentCategories && selectedCategory) {
        router.push(`${selectedCategory.slug}/${cat.slug}`);
      } else {
        if (cat.slug === 'all') {
          router.push('/');
        } else {
          router.push(`${cat.slug}`);
        }
      }
      handleOpenChange(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="p-0 transition-none">
        <SheetHeader className="border-b p-4">
          <SheetTitle>Categories</SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex h-full flex-col overflow-y-auto pb-2">
          {parentCategories && (
            <button
              className="flex w-full cursor-pointer items-center p-4 text-left text-base font-medium hover:bg-black hover:text-white"
              onClick={handleBack}
            >
              <ChevronLeftIcon className="mr-2 size-4" />
              Back
            </button>
          )}
          {currentCatgories?.map((item) => (
            <button
              key={item.slug}
              className="flex w-full cursor-pointer items-center justify-between p-4 text-left text-base font-medium hover:bg-black hover:text-white"
              onClick={() => handleCategoryClick(item)}
            >
              {item?.name}
              {item.subcategories && item.subcategories.length > 0 && (
                <ChevronRightIcon className="size-4" />
              )}
            </button>
          ))}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
