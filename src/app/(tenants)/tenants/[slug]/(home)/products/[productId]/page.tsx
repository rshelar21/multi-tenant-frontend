export const runtime = 'edge';
import React from 'react';
import { getSingleProductAPI } from '@/api/products';
import { getQueryClient } from '@/lib/react-query';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { ProductView } from './_components/ProductView';

const ProductPage = async ({
  params,
}: {
  params: Promise<{ productId: string; slug: string }>;
}) => {
  const { productId, slug } = await params;
  const queryClient = getQueryClient();
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
