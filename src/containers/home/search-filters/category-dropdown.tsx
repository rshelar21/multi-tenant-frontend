'use client';
import { useState, useRef, JSX } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SubcategoryMenu } from './subcategory-menu';
import { List } from './filters.constant';
import Link from 'next/link';

interface Props {
  category: List;
  isActive?: boolean;
  isNavigationHovered?: boolean;
}

export const CategoryDropdown = ({
  category,
  isActive,
  isNavigationHovered,
}: Props): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (): void => {
    if (category?.subcategories) {
      setIsOpen(true);
    }
  };

  const handleMouseLeave = (): void => {
    setIsOpen(false);
  };

  const handleToggleDropdown = () => {
    if (category.subcategories?.length) {
      setIsOpen(true);
    }
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={dropdownRef}
      onClick={handleToggleDropdown}
    >
      <div className="relative">
        <Button
          variant="elevated"
          className={cn(
            'hover:border-primary h-11 rounded-full border-transparent bg-transparent px-4 text-black hover:bg-white dark:text-white',
            isActive && !isNavigationHovered && 'border-primary bg-white',
            isOpen &&
              'border-primary -translate-x-[4px] -translate-y-[4px] bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all'
          )}
        >
          <Link
            prefetch
            href={`/${category.slug === 'all' ? '' : category.slug}`}
          >
            {category?.name}
          </Link>
        </Button>

        {category.subcategories && category.subcategories.length > 0 && (
          <div
            className={cn(
              'absolute -bottom-3 left-1/2 h-0 w-0 -translate-x-1/2 border-r-[10px] border-b-[10px] border-l-[10px] border-r-transparent border-b-black border-l-transparent opacity-0',
              isOpen && 'opacity-100'
            )}
          />
        )}
      </div>

      <SubcategoryMenu category={category} isOpen={isOpen} />
    </div>
  );
};
