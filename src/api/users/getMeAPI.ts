import { request } from '@/lib/axios';
import { ErrorType } from '@/types/utils';
import { IUser } from '@/types/user';

interface ServerResponse {
  user: IUser;
  accessToken: string;
}

export const getMeAPI = async () => {
  const { data, error } = await request({
    options: {
      method: 'GET',
      url: `/users/me`,
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
