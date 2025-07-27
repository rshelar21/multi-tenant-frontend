import { request } from '@/lib/axios';
import { ErrorType } from '@/types/utils';

interface Props {
  content: string;
  id: string;
}

export const postProductContentAPI = async (body: Props) => {
  const { data, error } = await request({
    options: {
      method: 'POST',
      url: `/products/content`,
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
