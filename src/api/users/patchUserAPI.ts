import { request } from '@/lib/axios';
import { IUser } from '@/types/user';
import { ErrorType } from '@/types/utils';

interface IPostUser {
  id: string;
  storeImg: string | null;
}

export const patchUserAPI = async (body: IPostUser) => {
  const { data, error } = await request({
    options: {
      method: 'PATCH',
      url: `/users`,
      data: body,
    },
  });

  if (error && !data) {
    const errorMessage =
      (error?.response?.data as ErrorType['error'])?.message ||
      'An unknown error occurred';

    throw new Error(errorMessage);
  }

  return data as IUser;
};
