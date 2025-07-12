import { getOrdersAPI } from '@/api/orders';
import { getQueryClient } from '@/lib/react-query';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { LibraryView } from './_components/LibraryView';

const LibraryPage = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['orders'],
    queryFn: async () => await getOrdersAPI(`orders`),
    initialPageParam: 1,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <LibraryView />
    </HydrationBoundary>
  );
};

export default LibraryPage;
