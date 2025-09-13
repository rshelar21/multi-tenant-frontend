import { request } from '@/lib/axios';
import { ErrorType } from '@/types/utils';
import { IProduct } from '@/types/product';

export const getManyProductsAPI = async (url: string) => {
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

  return data as IProduct[];
};
