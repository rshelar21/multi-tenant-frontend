import { getSingleProductAPI } from '@/api/products';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { ProductView } from '@/containers/tenants';
import { createServerQueryClient } from '@/lib/react-server-query';

const ProductPage = async ({
  params,
}: {
  params: Promise<{ productId: string; slug: string }>;
}) => {
  const { productId, slug } = await params;
  const queryClient = createServerQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['products', productId],
    queryFn: async () => await getSingleProductAPI(productId),
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <ProductView productId={productId} tenantSlug={slug} />
    </HydrationBoundary>
  );
};

export default ProductPage;
