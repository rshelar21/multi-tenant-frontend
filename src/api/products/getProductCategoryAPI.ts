import { request } from '@/lib/axios';
import { ErrorType } from '@/types/utils';
import { ISubCategory } from '@/types/product';

interface ServerResponse {
  data: ISubCategory[];
  count: number;
}

export const getProductCategoryAPI = async () => {
  const { data, error } = await request({
    options: {
      method: 'GET',
      url: `/category/sub-category/all?limit=100`,
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
