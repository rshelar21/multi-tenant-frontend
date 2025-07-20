import { useQueryStates, parseAsInteger } from 'nuqs';

export const usePagination = () => {
  return useQueryStates({
    page: parseAsInteger
      .withOptions({
        clearOnDefault: true,
      })
      .withDefault(1),
  });
};
