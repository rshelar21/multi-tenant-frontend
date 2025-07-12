import { request } from '@/lib/axios';
import { ErrorType, IMeta } from '@/types/utils';
import { Orders } from '@/types/orders';


interface ServerResponse {
  data: Orders[];
  meta: IMeta;
}

export const getOrdersAPI = async (url: string) => {
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

  return data as ServerResponse;
};
