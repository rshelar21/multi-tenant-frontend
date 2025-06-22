import { request } from '@/lib/axios';
import { ErrorType } from '@/types/utils';
import { IUser } from '@/types/user';

interface IPostUser {
  email: string;
  password: string;
}

interface ServerResponse {
  user: IUser;
  accessToken: string;
}

export const postLoginUserAPI = async (body: IPostUser) => {
  const { data, error } = await request({
    options: {
      method: 'POST',
      url: `/auth/sign-in`,
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
