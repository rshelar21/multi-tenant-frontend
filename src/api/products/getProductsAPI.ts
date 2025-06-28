import { request } from '@/lib/axios';
import { ErrorType, IMeta } from '@/types/utils';
import { IProduct } from '@/types/product';

interface ServerResponse {
  data: IProduct[];
  // count: number;
  meta: IMeta;
}

export const getProductsAPI = async (url: string) => {
  const { data, error } = await request({
    options: {
      method: 'GET',
      url,
    },
  });

  if (error && !data) {
    const errorMessage =
      (error?.response?.data as ErrorType['error'])?.message ||
      'An unknown error occurred';

    throw new Error(errorMessage);
  }
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return data as ServerResponse;
};
