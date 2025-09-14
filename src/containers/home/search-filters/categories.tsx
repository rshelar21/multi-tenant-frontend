'use client';
import { useEffect, useRef, useState } from 'react';
import { CategoryDropdown } from './category-dropdown';
import { categoriesList } from './filters.constant';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ListFilterIcon } from 'lucide-react';
import { CategorySidebar } from './category-sidebar';
import { useParams } from 'next/navigation';

export const Categories = () => {
  const params = useParams();
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const viewAllRef = useRef<HTMLDivElement>(null);

  const [visibleCount, setVisibleCount] = useState(categoriesList.length);
  const [isAnyHovered, setIsAnyHovered] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const activeCategory = params.category || 'all';
  const activeCatIndex = categoriesList.findIndex(
    (i) => i.slug === activeCategory
  );
  const isActiveCategoryHidden =
    activeCatIndex >= visibleCount && activeCatIndex !== -1;

  // The offsetWidth property returns the viewable width of an element (in pixels) including padding, border and scrollbar, but not the margin.

  useEffect(() => {
    const calcVisible = () => {
      if (!containerRef.current || !measureRef.current || !viewAllRef.current)
        return;

      const contianerWidth = containerRef.current.offsetWidth;
      const viewAllWidth = viewAllRef.current.offsetWidth;
      const availableWidth = contianerWidth - viewAllWidth;

      const items = Array.from(measureRef.current.children);

      let totalWidth = 0;
      let visible = 0;

      for (const item of items) {
        const w = item.getBoundingClientRect().width;

        if (totalWidth + w > availableWidth) break;
        totalWidth += w;
        visible += 1;
      }

      setVisibleCount(visible);
    };

    const resizeObserver = new ResizeObserver(calcVisible);
    resizeObserver.observe(containerRef.current!);
    // eslint-disable-next-line  react-hooks/exhaustive-deps
  }, [categoriesList.length]);

  return (
    <div className="relative w-full">
      {/* sidebar */}
      <CategorySidebar
        open={isSidebarOpen}
        onOpenChange={setIsSidebarOpen}
        data={categoriesList}
      />
      <div
        className="pointer-events-none absolute flex opacity-0 gap-1.5"
        ref={measureRef}
        style={{ position: 'fixed', top: -9999, left: -9999 }}
      >
        {categoriesList?.map((category) => (
          <div key={category.name}>
            <CategoryDropdown
              category={category}
              isActive={activeCategory === category.slug}
              isNavigationHovered={false}
            />
          </div>
        ))}
      </div>
      {/* visible */}
      <div
        className="flex flex-nowrap items-center gap-1.5"
        ref={containerRef}
        onMouseEnter={() => setIsAnyHovered(true)}
        onMouseLeave={() => setIsAnyHovered(false)}
      >
        {categoriesList?.slice(0, visibleCount).map((category) => (
          <div key={category.name}>
            <CategoryDropdown
              category={category}
              isActive={activeCategory === category.slug}
              isNavigationHovered={isAnyHovered}
            />
          </div>
        ))}

        <div className="shrink-0" ref={viewAllRef}>
          <Button
            variant="elevated"
            className={cn(
              'hover:border-primary h-11 rounded-full border-transparent bg-transparent px-4 text-black hover:bg-white dark:text-white',
              isActiveCategoryHidden &&
                !isAnyHovered &&
                'border-primary bg-white'
            )}
            onClick={() => setIsSidebarOpen(true)}
          >
            View All
            <ListFilterIcon className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};
