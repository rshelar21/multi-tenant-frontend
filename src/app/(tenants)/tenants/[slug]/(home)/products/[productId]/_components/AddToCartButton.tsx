import React from 'react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import { cn } from '@/lib/utils';

interface Props {
  productId: string;
  tenantSlug: string;
}

export const AddToCartButton = ({ productId, tenantSlug }: Props) => {
  const { isProductInCart, toggleProducts } = useCart(tenantSlug);
  return (
    <Button
      variant="elevated"
      className={cn(
        `flex-1 bg-pink-400`,
        isProductInCart(productId) && 'bg-white'
      )}
      onClick={() => toggleProducts(productId)}
    >
      {isProductInCart(productId) ? 'Remove from cart' : 'Add to cart'}
    </Button>
  );
};
