'use client';
import { getProductTagsAPI } from '@/api/products';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Checkbox } from '@/components/ui/checkbox';
import { LoaderIcon } from 'lucide-react';

interface Props {
  value: string[] | null;
  onChange: (v: string[]) => void;
}

export const TagsFilter = ({ onChange, value }: Props) => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['tags'],
      queryFn: getProductTagsAPI,
      initialPageParam: 1,
      getNextPageParam: (lastPage) =>
        lastPage.meta.hasNextPage ? lastPage.meta?.nextPage : undefined,
    });

  const handleClick = (tag: string) => {
    if (value?.includes(tag)) {
      onChange(value.filter((t) => t !== tag) || []);
    } else {
      onChange([...(value || []), tag]);
    }
  };

  return (
    <div className="flex flex-col gap-y-2">
      {isLoading ? (
        <div className="flex items-center justify-center p-4">
          <LoaderIcon className="size-4 animate-spin" />
        </div>
      ) : (
        data?.pages?.map((pages) =>
          pages?.data?.map((tag) => (
            <div
              key={tag?.id}
              className="flex cursor-pointer items-center justify-between"
              onClick={() => handleClick(tag.name)}
            >
              <p className="font-medium">{tag?.name}</p>
              <Checkbox
                checked={value?.includes(tag.name)}
                onCheckedChange={() => handleClick(tag.name)}
              />
            </div>
          ))
        )
      )}

      {hasNextPage && (
        <button
          disabled={isFetchingNextPage}
          onClick={() => fetchNextPage()}
          className="cursor-pointer justify-start text-start font-medium underline disabled:opacity-50"
        >
          Load more...
        </button>
      )}
    </div>
  );
};
