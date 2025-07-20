import { request } from '@/lib/axios';
import { ErrorType } from '@/types/utils';
import { IProductTag } from '@/types/product';

interface ServerResponse {
  data: IProductTag[];
  count: number;
}

export const getTagsAPI = async (url: string) => {
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
