import { getProductsAPI } from '@/api/products';
import { createServerQueryClient } from '@/lib/react-server-query';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { ProductsListView } from '../_components/ProductsListView';

const SubCategoryPage = async ({
  params,
}: {
  params: Promise<{ category: string; subcategory: string }>;
}) => {
  const { category, subcategory } = await params;

  const queryClient = createServerQueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['products', category, subcategory],
    queryFn: async () =>
      await getProductsAPI(
        `products?parentSlug=${category}&slug=${subcategory}`
      ),
    initialPageParam: 1,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <ProductsListView category={category} subCategory={subcategory} />
    </HydrationBoundary>
  );
};

export default SubCategoryPage;
