import { request } from '@/lib/axios';
import { ErrorType, IMeta } from '@/types/utils';
import { IProductTag } from '@/types/product';

interface ServerResponse {
  data: IProductTag[];
  meta: IMeta;
}

export const getProductTagsAPI = async ({
  pageParam,
}: {
  pageParam: number;
}) => {

  const { data, error } = await request({
    options: {
      method: 'GET',
      url: `/tags?limit=5&page=${pageParam}`,
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
