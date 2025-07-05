'use client';
import { useEffect } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { InboxIcon, LoaderIcon } from 'lucide-react';
import { useCheckoutSession } from '@/hooks/use-checkout-session';
import { useCart } from '@/hooks/use-cart';
import { getManyProductsAPI } from '@/api/products';
import { generateTenantURL, generateUrl } from '@/utils';
import { postCreateSessionAPI } from '@/api/payments';
import { CheckoutSidebar } from './CheckoutSidebar';
import { CheckoutItem } from './CheckoutItem';
import { toast } from 'sonner';

interface CheckoutViewProps {
  tenantSlug: string;
}

export const CheckoutView = ({ tenantSlug }: CheckoutViewProps) => {
  const { productIds, toggleProducts, clearTenantCart } = useCart(tenantSlug);
  const [state, setStates] = useCheckoutSession();

  const { data, isLoading } = useQuery({
    queryKey: ['many-products', productIds],
    queryFn: async () => {
      const url = generateUrl({
        path: '/products/many-products',
        params: {
          ids: productIds,
          limit: 100,
        },
      });
      return await getManyProductsAPI(url);
    },
  });

  const { mutate, isPending } = useMutation({
    mutationKey: ['payments', tenantSlug],
    mutationFn: async () => {
      setStates({
        cancel: false,
        success: false,
      });
      return await postCreateSessionAPI({
        productIds,
        tenantSlug,
      });
    },

    onSuccess: (data) => {
      window.location.href = data?.url;
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  useEffect(() => {
    if (state?.success) {
      setStates({
        cancel: false,
        success: false,
      });
      clearTenantCart();
    }
  }, [clearTenantCart, state]);

  if (isLoading) {
    return (
      <div className="px-6 pt-4 lg:px-12 lg:pt-16">
        <div className="flex flex-col items-center justify-center gap-y-4 rounded-lg border border-dashed border-black bg-white p-8">
          <LoaderIcon className="text-muted-foreground animate-spin" />
        </div>
      </div>
    );
  }

  if (!isLoading && data?.length === 0) {
    return (
      <div className="px-6 pt-4 lg:px-12 lg:pt-16">
        <div className="flex flex-col items-center justify-center gap-y-4 rounded-lg border border-dashed border-black bg-white p-8">
          <InboxIcon />
          <p className="text-base font-medium">No products found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 pt-4 lg:px-12 lg:pt-16">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-7 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="overflow-hidden rounded-md border bg-white">
            {data?.map((product, index) => (
              <CheckoutItem
                key={product?.id}
                isLast={index === data?.length - 1}
                imageUrl={product?.productImg || ''}
                name={product?.name}
                tenantUrl={generateTenantURL(product?.user?.tenant?.slug)}
                tenantName={product?.user?.tenant?.name}
                price={product?.price}
                productUrl={`${generateTenantURL(tenantSlug)}/products/${product?.id}`}
                onRemove={() => toggleProducts(product?.id)}
              />
            ))}
          </div>
        </div>
        <div className="lg:col-span-3">
          <CheckoutSidebar
            totalPrice={
              data?.reduce((acc, p) => acc + Number(p?.price), 0) || 0
            }
            onCheckout={() => mutate()}
            isCanceled={state.cancel}
            disabled={isPending}
          />
        </div>
      </div>
    </div>
  );
};
