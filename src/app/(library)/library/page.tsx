import { getOrdersAPI } from '@/api/orders';
import { createServerQueryClient } from '@/lib/react-server-query';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { LibraryView } from './_components/LibraryView';

const LibraryPage = async () => {
  const queryClient = createServerQueryClient();
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
