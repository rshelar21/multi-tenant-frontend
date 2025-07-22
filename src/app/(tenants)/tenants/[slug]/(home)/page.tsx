import { getProductsAPI } from '@/api/products';
import { ProductsListView } from '@/app/(home)/[category]/_components/ProductsListView';
import { getQueryClient } from '@/lib/react-query';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

const TenantPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  const queryClient = getQueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['products', slug],
    queryFn: async () => await getProductsAPI(`products?tenantSlug=${slug}`),
    initialPageParam: 1,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <ProductsListView tenantSlug={slug} narrowView />
    </HydrationBoundary>
  );
};

export default TenantPage;
