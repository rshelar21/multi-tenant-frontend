import { getProductsAPI } from '@/api/products';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { createServerQueryClient } from '@/lib/react-server-query';
import { ProductsListView } from './_components/ProductsListView';

const CategoryPage = async ({
  params,
}: {
  params: Promise<{ category: string }>;
}) => {
  const { category } = await params;
  const queryClient = createServerQueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['products', category],
    queryFn: async () =>
      await getProductsAPI(`products?parentSlug=${category}`),
    initialPageParam: 1,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <ProductsListView category={category} />
    </HydrationBoundary>
  );
};

export default CategoryPage;
