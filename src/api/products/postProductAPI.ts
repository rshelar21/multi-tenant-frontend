import { request } from '@/lib/axios';
import { ErrorType } from '@/types/utils';
import { IProduct } from '@/types/product';

type Props = {
  category: string;
} & Omit<IProduct, 'category' | 'id' | 'createDate' | 'updateDate' | 'user'>;

export const postProductAPI = async (body: Props) => {
  const { data, error } = await request({
    options: {
      method: 'POST',
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
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return data;
};
