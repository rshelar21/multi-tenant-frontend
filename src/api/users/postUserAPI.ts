import { request } from '@/lib/axios';
import { IUser } from '@/types/user';
import { ErrorType } from '@/types/utils';

interface IPostUser {
  name: string;
  username: string;
  email: string;
  password: string;
}

interface ServerResponse {
  user: IUser;
  accessToken: string;
}

export const postUserAPI = async (body: IPostUser) => {
  const { data, error } = await request({
    options: {
      method: 'POST',
      url: `/auth/sign-up`,
      data: body,
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
