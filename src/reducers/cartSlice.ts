import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';

interface TenantCart {
  productIds: string[];
}

interface State {
  tenantCards: Record<string, TenantCart>;
}

const initialState: State = {
  tenantCards: {},
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (
      state,
      action: PayloadAction<{ tenantSlug: string; productId: string }>
    ) => {
      const { tenantSlug, productId } = action.payload;
      const tenantCart = state.tenantCards[tenantSlug] ?? { productIds: [] };
      if (!tenantCart.productIds.includes(productId)) {
        tenantCart.productIds = [...tenantCart.productIds, productId];
      }
      state.tenantCards = {
        ...state.tenantCards,
        [tenantSlug]: tenantCart,
      };
    },
    removeProduct: (
      state,
      action: PayloadAction<{ tenantSlug: string; productId: string }>
    ) => {
      const { tenantSlug, productId } = action.payload;
      const tenantCart = state.tenantCards[tenantSlug];
      if (tenantCart) {
        tenantCart.productIds = tenantCart.productIds.filter(
          (id) => id !== productId
        );
      }
      state.tenantCards = {
        ...state.tenantCards,
        [tenantSlug]: tenantCart,
      };
    },
    cleartCart: (state, action: PayloadAction<{ tenantSlug: string }>) => {
      const { tenantSlug } = action.payload;
      state.tenantCards = {
        ...state.tenantCards,
        [tenantSlug]: {
          productIds: [],
        },
      };
    },
    clearAllCarts: (state) => {
      state.tenantCards = {};
    },
  },
});

export const { addProduct, clearAllCarts, cleartCart, removeProduct } =
  cartSlice.actions;

export const selectedTenantCart = (state: RootState, tenantSlug: string) =>
  state.cart.tenantCards[tenantSlug]?.productIds ?? [];

export default cartSlice.reducer;
