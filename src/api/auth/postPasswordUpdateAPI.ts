import { request } from '@/lib/axios';
import { ErrorType } from '@/types/utils';

interface Props {
  body: {
    id: string;
    oldPassword: string;
    newPassword: string;
  };
}

export const postPasswordUpdateAPI = async ({ body }: Props) => {
  const { data, error } = await request({
    options: {
      method: 'POST',
      url: `/auth/change-password`,
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
