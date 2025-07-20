import { request } from '@/lib/axios';
import { ErrorType } from '@/types/utils';
import { Orders } from '@/types/orders';

interface ServerResponse {
  totalUsers: number;
  totalProducts: number;
  count: number;
  orders: Orders[];
  topProducts: {
    product_name: string;
    product_price: string;
    order_count: string;
    product_id: string;
  }[];
}

export const getAnalyticsDataAPI = async () => {
  const { data, error } = await request({
    options: {
      method: 'GET',
      url: `/analytics`,
    },
  });

  if (error && !data) {
    const errorMessage =
      (error?.response?.data as ErrorType['error'])?.message ||
      'An unknown error occurred';

    throw new Error(errorMessage);
  }

  return data as ServerResponse;
};
