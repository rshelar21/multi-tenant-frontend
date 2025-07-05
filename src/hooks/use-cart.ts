import { useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import {
  selectedTenantCart,
  addProduct,
  cleartCart,
  removeProduct,
} from '@/reducers/cartSlice';

export const useCart = (tenantSlug: string) => {
  const dispatch = useAppDispatch();
  const productIds = useAppSelector((s) => selectedTenantCart(s, tenantSlug));

  const toggleProducts = useCallback((productId: string) => {
    if (productIds?.includes(productId)) {
      dispatch(
        removeProduct({
          productId,
          tenantSlug,
        })
      );
    } else {
      dispatch(
        addProduct({
          tenantSlug,
          productId,
        })
      );
    }
  }, []);

  const isProductInCart = useCallback((productId: string) => {
    return productIds?.includes(productId);
  }, []);

  const clearTenantCart = useCallback(() => {
    dispatch(
      cleartCart({
        tenantSlug,
      })
    );
  }, []);

  return {
    toggleProducts,
    isProductInCart,
    clearTenantCart,
    productIds,
    totalItems: productIds?.length,
    // removeProduct: () => removeProduct()
  };
};
