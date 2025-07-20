import { request } from '@/lib/axios';
import { ErrorType, IMeta } from '@/types/utils';
import { ISubCategory } from '@/types/product';

interface ServerResponse {
  data: ISubCategory[];
 meta: IMeta;
}

export const getCategoryAPI = async (url: string) => {
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

  return data as ServerResponse
};
