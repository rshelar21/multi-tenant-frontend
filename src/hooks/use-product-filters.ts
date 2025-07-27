import {
  parseAsString,
  useQueryStates,
  parseAsArrayOf,
  parseAsStringLiteral,
} from 'nuqs';

const sortValues = ['curated', 'trending', 'hot_and_new'] as const;

export const useProductFilters = () => {
  return useQueryStates({
    minPrice: parseAsString
      .withOptions({
        clearOnDefault: true,
      })
      .withDefault(''),
    maxPrice: parseAsString
      .withOptions({
        clearOnDefault: true,
      })
      .withDefault(''),
    tags: parseAsArrayOf(parseAsString)
      .withOptions({
        clearOnDefault: true,
      })
      .withDefault([]),
    sort: parseAsStringLiteral(sortValues).withDefault('curated'),
    search: parseAsString
      .withOptions({
        clearOnDefault: true,
      })
      .withDefault(''),
  });
};
