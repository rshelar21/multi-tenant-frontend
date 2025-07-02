'use client';
import { Fragment } from 'react';
import { getSingleProductAPI } from '@/api/products';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { formatCurrency, generateTenantURL } from '@/utils';
import Link from 'next/link';
import { StarRatings } from './StarRatings';
import { Button } from '@/components/ui/button';
import { LinkIcon, StarIcon } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { AddToCartButton } from './AddToCartButton';

interface Props {
  productId: string;
  tenantSlug: string;
}

export const ProductView = ({ productId, tenantSlug }: Props) => {
  const { data, isLoading } = useQuery({
    queryKey: ['products', productId],
    queryFn: async () => await getSingleProductAPI(productId),
  });

  if (isLoading) {
    return <h1>loading</h1>;
  }

  return (
    <div className="px-4 py-10 lg:px-12">
      <div className="overflow-hidden rounded-sm border bg-white">
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
                <div className="flex items-center gap-1">
                  <StarRatings rating={3} iconClassName="size-4" />
                </div>
              </div>
            </div>

            <div className="block items-center justify-center border-b px-6 py-4 lg:hidden">
              <div className="flex items-center gap-1">
                <StarRatings rating={3} iconClassName="size-4" />
                <p className="text-base font-medium">{3} ratings</p>
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
                  <AddToCartButton
                    productId={productId}
                    tenantSlug={tenantSlug}
                  />
                  <Button
                    className="size-12"
                    variant="elevated"
                    onClick={() => {}}
                    disabled={false}
                  >
                    <LinkIcon />
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
                    <StarIcon className="size-4 fill-black" />
                    <p>({5})</p>
                    <p className="text-base">{5} ratings</p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-[auto_1fr_auto] gap-3">
                  {[5, 4, 3, 2, 1].map((i) => (
                    <Fragment key={i}>
                      <div className="font-medium">
                        {i} {i === 1 ? 'star' : 'stars'}
                      </div>
                      <Progress value={3} className="h-[1lh]" />
                      <div className="font-medium">{5}%</div>
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
