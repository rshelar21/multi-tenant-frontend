import { request } from '@/lib/axios';
import { IProduct } from '@/types/product';
import { ErrorType } from '@/types/utils';

type Product = {
  category: string;
  tags: string[];
} & Omit<
  IProduct,
  | 'category'
  | 'id'
  | 'createDate'
  | 'updateDate'
  | 'user'
  | 'reviews'
  | 'tags'
  | 'content'
>;

interface Props {
  id: string;
  body: Product;
}

export const updateProductAPI = async ({ id, body }: Props) => {
  const { data, error } = await request({
    options: {
      method: 'PATCH',
      url: `/products/${id}`,
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
