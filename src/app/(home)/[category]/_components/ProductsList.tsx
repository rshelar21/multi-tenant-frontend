'use client';
import { getProductsAPI } from '@/api/products';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useProductFilters } from '@/hooks/use-product-filters';
import { generateUrl } from '@/utils/generateUrl';
import { ProductCard, ProductSkeletonLoading } from './ProductCard';
import { InboxIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DEFAULT_API_LIMIT } from '@/constants';
interface IProductsListProps {
  category?: string;
  subCategory?: string;
}

export const ProductsList = ({ category, subCategory }: IProductsListProps) => {
  const [{ maxPrice, minPrice, tags }] = useProductFilters();

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ['products', category, maxPrice, minPrice, tags],
    queryFn: async (pageParam) => {
      const url = generateUrl({
        path: '/products',
        params: {
          parentSlug: category || undefined,
          slug: subCategory || undefined,
          maxPrice,
          minPrice,
          tags,
          limit: DEFAULT_API_LIMIT,
          page: pageParam?.pageParam,
        },
      });
      return await getProductsAPI(url);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasNextPage ? lastPage.meta?.nextPage : undefined,
  });

  if (isFetching) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {Array.from({ length: 4 })?.map((_, index) => (
          <ProductSkeletonLoading key={index} />
        ))}
      </div>
    );
  }

  if (data?.pages[0].data?.length === 0 && !isLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-y-4 rounded-lg border border-dashed border-black bg-white p-8">
        <InboxIcon />
        <p className="text-base font-medium">No products found</p>
      </div>
    );
  }
  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {data?.pages
          ?.flatMap((pages) => pages?.data)
          .map((p) => (
            <ProductCard
              key={p?.id}
              // id={p?.id}
              // name={p?.name}
              // price={p?.price}
              // productImg={''}
              {...p}
              authorImgUrl={undefined}
              authorUsername="rohan"
              reviewCount={5}
              reviewRating={3}
            />
          ))}
      </div>

      <div className="flex justify-center pt-8">
        {hasNextPage && (
          <Button
            disabled={isFetchingNextPage}
            onClick={() => fetchNextPage()}
            className="bg-white text-base font-medium disabled:opacity-50"
            variant="elevated"
          >
            Load more
          </Button>
        )}
      </div>
    </>
  );
};
