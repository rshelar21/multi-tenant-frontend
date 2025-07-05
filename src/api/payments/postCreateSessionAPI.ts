import { request } from '@/lib/axios';
import { ErrorType } from '@/types/utils';

interface Props {
  tenantSlug: string;
  productIds: string[];
}

interface ServerResponse {
  url: string;
}

export const postCreateSessionAPI = async (body: Props) => {
  const { data, error } = await request({
    options: {
      method: 'POST',
      url: `/payments/checkout`,
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
