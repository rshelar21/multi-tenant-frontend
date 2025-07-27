import { request } from '@/lib/axios';
import { ErrorType } from '@/types/utils';

interface Props {
  id: string;
}

export const deleteProductAPI = async (body: Props) => {
  const { data, error } = await request({
    options: {
      method: 'DELETE',
      url: `/products`,
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
