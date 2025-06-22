import { request } from '@/lib/axios';
import { ErrorType } from '@/types/utils';

export const getAllUsersAPI = async () => {
  const { data, error } = await request({
    options: {
      method: 'GET',
      url: `/users`,
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
