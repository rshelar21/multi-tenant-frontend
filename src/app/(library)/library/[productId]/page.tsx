import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { createServerQueryClient } from '@/lib/react-server-query';
import { getSingleProductAPI } from '@/api/products';
import { getReviewsAPI } from '@/api/reviews';
import { LibraryDetails } from '@/containers/library';

const LibraryDetailsPage = async ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  const { productId } = await params;
  const queryClient = createServerQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['products', productId],
    queryFn: async () => await getSingleProductAPI(productId),
  });
  await queryClient.prefetchQuery({
    queryKey: ['reviews', productId],
    queryFn: async () => await getReviewsAPI(`/reviews?productId=${productId}`),
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <LibraryDetails productId={productId} />
    </HydrationBoundary>
  );
};

export default LibraryDetailsPage;
