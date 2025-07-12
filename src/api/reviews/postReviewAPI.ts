import { request } from '@/lib/axios';
import { ErrorType } from '@/types/utils';

type Props = {
  description: string;
  rating: number;
  productId: string;
};

export const postReviewAPI = async (body: Props) => {
  const { data, error } = await request({
    options: {
      method: 'POST',
      url: `/reviews`,
      data: body,
    },
  });

  if (error && !data) {
    const errorMessage =
      (error?.response?.data as ErrorType['error'])?.message ||
      'An unknown error occurred';

    throw new Error(errorMessage);
  }

  return data;
};
