import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/react-query';
import { getSingleProductAPI } from '@/api/products';
import { getReviewsAPI } from '@/api/reviews';
import { LibraryDetails } from '../_components/LibraryDetails';

const LibraryDetailsPage = async ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  const { productId } = await params;
  const queryClient = getQueryClient();
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
