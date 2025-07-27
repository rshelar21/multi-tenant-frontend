'use client';
import { Fragment, useMemo, useState } from 'react';
import { getSingleProductAPI } from '@/api/products';
import { getSingleOrderAPI } from '@/api/orders';
import { useQueries } from '@tanstack/react-query';
import Image from 'next/image';
import { formatCurrency, generateTenantURL } from '@/utils';
import Link from 'next/link';
import { StarRatings } from './StarRatings';
import { Button } from '@/components/ui/button';
import { CheckIcon, LinkIcon, StarIcon } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { AddToCartButton } from './AddToCartButton';
import { toast } from 'sonner';
import { Loader } from '@/components/common';

interface Props {
  productId: string;
  tenantSlug: string;
}

export const ProductView = ({ productId, tenantSlug }: Props) => {
  const [isCopied, setIsCopied] = useState(false);
  const results = useQueries({
    queries: [
      {
        queryKey: ['products', productId],
        queryFn: async () => await getSingleProductAPI(productId),
      },
      {
        queryKey: ['orders', 'product', productId],
        queryFn: async () =>
          await getSingleOrderAPI(`/orders/product?productId=${productId}`),
      },
    ],
  });

  const isLoading = results[0].isLoading || results[1].isLoading;
  const data = results[0]?.data;
  const data1 = results[1]?.data;

  const isPurchased = data1?.product?.some((i) => i.id === productId);

  const reviewsData = useMemo(() => {
    const ratingDistribution: Record<number, number> = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
    };
    if (data?.reviews.length) {
      const avg = data?.reviews?.reduce(
        (acc, items) => acc + Number(items.rating),
        0
      );

      data?.reviews.forEach((i) => {
        const rating = Number(i?.rating);

        if (rating >= 1 && rating <= 5) {
          ratingDistribution[rating] = (ratingDistribution[rating] || 0) + 1;
        }
      });

      Object.keys(ratingDistribution).map((key) => {
        const count = ratingDistribution[Number(key)];
        ratingDistribution[Number(key)] = Math.round(
          (count / data?.reviews.length) * 100
        );
      });

      return {
        reviewCount: data?.reviews.length,
        reviewRating: avg / data?.reviews.length,
        ratingDistribution: ratingDistribution,
      };
    }

    return {
      reviewCount: 0,
      reviewRating: 0,
      ratingDistribution: ratingDistribution,
    };
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex justify-center px-4 py-10 lg:px-12">
        <Loader />
      </div>
    );
  }

  return (
    <div className="px-4 py-10 lg:px-12">
      <div className="dark:bg-input/30 overflow-hidden rounded-sm border bg-[#f4f4f0]">
        <div className="relative aspect-[3.9] border-b">
          <Image
            src={data?.productImg || '/placeholder.png'}
            alt={data?.name || 'cover'}
            fill
            fetchPriority="auto"
            className="object-cover"
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-6">
          <div className="col-span-4">
            <div className="p-6">
              <h1 className="text-4xl font-medium">{data?.name}</h1>
            </div>
            <div className="flex border-y">
              <div className="flex items-center justify-center border-r px-6 py-4">
                <div className="relative w-fit border bg-pink-400 px-2 py-1">
                  <p className="text-base font-medium">
                    {formatCurrency(Number(data?.price))}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center px-6 py-4 lg:border-r">
                <Link
                  href={generateTenantURL(tenantSlug)}
                  className="flex items-center gap-2"
                >
                  {data?.user?.tenant?.storeImg && (
                    <Image
                      src={data?.user?.tenant?.storeImg}
                      alt={data?.user?.tenant?.name}
                      width={20}
                      height={20}
                      className="size-[20px] shrink-0 rounded-full border"
                    />
                  )}
                  <p className="text-base font-medium underline">
                    {data?.user?.tenant?.name}
                  </p>
                </Link>
              </div>

              <div className="hidden items-center justify-center px-6 py-4 lg:flex">
                <div className="flex items-center gap-2">
                  <StarRatings
                    rating={reviewsData?.reviewRating}
                    iconClassName="size-4"
                  />
                  <p className="text-base font-medium">
                    {reviewsData?.reviewCount} ratings
                  </p>
                </div>
              </div>
            </div>

            <div className="block items-center justify-center border-b px-6 py-4 lg:hidden">
              <div className="flex items-center gap-2">
                <StarRatings
                  rating={reviewsData?.reviewRating}
                  iconClassName="size-4"
                />
                <p className="text-base font-medium">
                  {reviewsData?.reviewCount} ratings
                </p>
              </div>
            </div>

            <div className="p-6">
              {data?.description ? (
                <p>{data?.description}</p>
              ) : (
                <p className="text-muted-foreground font-medium italic">
                  No description provided
                </p>
              )}
            </div>
          </div>

          <div className="col-span-2">
            <div className="h-full border-t lg:border-t-0 lg:border-l">
              <div className="flex flex-col gap-4 border-b p-6">
                <div className="flex flex-row items-center gap-2">
                  {isPurchased ? (
                    <Button
                      variant="elevated"
                      className="flex-1 bg-white"
                      asChild
                    >
                      <Link prefetch href="/library">
                        View in Library
                      </Link>
                    </Button>
                  ) : (
                    <AddToCartButton
                      productId={productId}
                      tenantSlug={tenantSlug}
                    />
                  )}
                  <Button
                    className="size-12"
                    variant="elevated"
                    onClick={() => {
                      setIsCopied(true);
                      navigator.clipboard.writeText(window.location.href);
                      toast.success('URL copied to clipboard');
                      setTimeout(() => setIsCopied(false), 500);
                    }}
                    disabled={false}
                  >
                    {isCopied ? <CheckIcon /> : <LinkIcon />}
                  </Button>
                </div>
                <p className="text-center font-medium">
                  {data?.refundPolicy === 'no-refunds'
                    ? 'No refunds'
                    : `${data?.refundPolicy} money back guarantee`}
                </p>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-medium">Ratings</h3>
                  <div className="flex items-center gap-x-1 font-medium">
                    <StarIcon className="size-4 fill-black dark:fill-white" />
                    <p>({reviewsData?.reviewRating})</p>
                    <p className="text-base">
                      {reviewsData?.reviewCount} ratings
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-[auto_1fr_auto] gap-3">
                  {[5, 4, 3, 2, 1].map((i) => (
                    <Fragment key={i}>
                      <div className="font-medium">
                        {i} {i === 1 ? 'star' : 'stars'}
                      </div>
                      <Progress
                        value={reviewsData?.ratingDistribution[i]}
                        className="h-[1lh]"
                      />
                      <div className="font-medium">
                        {reviewsData?.ratingDistribution[i]}%
                      </div>
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
