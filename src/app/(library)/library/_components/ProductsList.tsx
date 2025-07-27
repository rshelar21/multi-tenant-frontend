'use client';
import { useInfiniteQuery } from '@tanstack/react-query';
import { generateUrl } from '@/utils/generateUrl';
import { ProductCard, ProductSkeletonLoading } from './ProductCard';
import { InboxIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DEFAULT_API_LIMIT } from '@/constants';
import { useAppSelector } from '@/store/hooks';
import { selectedUser } from '@/reducers/userSlice';
import { cn } from '@/lib/utils';
import { getOrdersAPI } from '@/api/orders';

export const ProductsList = () => {
  const { roles } = useAppSelector(selectedUser);
  const isSuperAdmin = roles?.some((i) => i.roleType === 1);

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ['orders', isSuperAdmin],
    queryFn: async (pageParam) => {
      const url = generateUrl({
        path: '/orders',
        params: {
          limit: DEFAULT_API_LIMIT,
          page: pageParam?.pageParam,
          access: isSuperAdmin ? 'admin' : 'user',
        },
      });
      return await getOrdersAPI(url);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasNextPage ? lastPage.meta?.nextPage : undefined,
  });
  if (isFetching) {
    return (
      <div
        className={cn(
          `grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4`
        )}
      >
        {Array.from({ length: 4 })?.map((_, index) => (
          <ProductSkeletonLoading key={index} />
        ))}
      </div>
    );
  }

  if (data?.pages[0].data?.length === 0 && !isLoading) {
    return (
      <div className="dark:bg-input/30 flex w-full flex-col items-center justify-center gap-y-4 rounded-lg border border-dashed border-black bg-white p-8">
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
          .map((i) =>
            i.product?.map((p) => (
              <ProductCard
                key={p?.id}
                {...p}
                tenantImgUrl={p?.user?.tenant?.storeImg}
                tenantSlug={p?.user?.tenant?.slug}
              />
            ))
          )}
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
