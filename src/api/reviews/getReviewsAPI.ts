import { request } from '@/lib/axios';
import { ErrorType } from '@/types/utils';
import { Reviews } from '@/types/reviews';

export const getReviewsAPI = async (url: string) => {
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

  if (data && !error) {
    return data;
  }

  return {} as Reviews;
};
