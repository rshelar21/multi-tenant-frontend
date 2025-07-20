import { request } from '@/lib/axios';
import { ErrorType } from '@/types/utils';

interface Props {
  name: string;
}

export const postTagAPI = async ({ name }: Props) => {
  const { data, error } = await request({
    options: {
      method: 'POST',
      url: `/tags`,
      data: {
        name,
      },
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
