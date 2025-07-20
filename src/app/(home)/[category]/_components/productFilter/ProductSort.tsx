'use client';;
import { cn } from '@/lib/utils';
import { useProductFilters } from '@/hooks/use-product-filters';
import { Button } from '@/components/ui/button';

export const ProductSort = () => {
  const [filters, setFilters] = useProductFilters();

  return (
    <div className="flex items-center gap-2">
      <Button
        size="sm"
        className={cn(
          'rounded-full bg-card hover:bg-white',

          filters.sort !== 'curated' &&
            'hover:border-border border-transparent bg-transparent hover:bg-transparent'
        )}
        variant="secondary"
        onClick={() =>
          setFilters({
            sort: 'curated',
          })
        }
      >
        Curated
      </Button>
      <Button
        size="sm"
        className={cn(
          'rounded-full bg-white hover:bg-white',

          filters.sort !== 'trending' &&
            'hover:border-border border-transparent bg-transparent hover:bg-transparent'
        )}
        variant="secondary"
        onClick={() =>
          setFilters({
            sort: 'trending',
          })
        }
      >
        Trending
      </Button>
      <Button
        size="sm"
        className={cn(
          'rounded-full bg-white hover:bg-white',

          filters.sort !== 'hot_and_new' &&
            'hover:border-border border-transparent bg-transparent hover:bg-transparent'
        )}
        variant="secondary"
        onClick={() =>
          setFilters({
            sort: 'hot_and_new',
          })
        }
      >
        Hot & New
      </Button>
    </div>
  );
};
