import { request } from '@/lib/axios';
import { ErrorType } from '@/types/utils';
import { ITenants } from '@/types/user';

export const getTenantAPI = async () => {
  const { data, error } = await request({
    options: {
      method: 'GET',
      url: `/tenants`,
    },
  });

  if (error && !data) {
    const errorMessage =
      (error?.response?.data as ErrorType['error'])?.message ||
      'An unknown error occurred';

    throw new Error(errorMessage);
  }

  return data as ITenants;
};
