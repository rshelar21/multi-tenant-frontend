'use client';
import React, { useMemo } from 'react';
import { IProduct } from '@/types/product';
import Link from 'next/link';
import Image from 'next/image';
import { StarIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { formatCurrency, generateTenantURL } from '@/utils';

interface Props extends IProduct {
  tenantSlug: string;
  tenantImgUrl?: string | null;
  reviewRating?: number;
  reviewCount?: number;
}

export const ProductCard = ({
  id,
  name,
  price,
  productImg,
  tenantImgUrl,
  tenantSlug,
  reviews,
}: Props) => {
  const router = useRouter();

  const reviewsDetails = useMemo(() => {
    if (reviews.length) {
      const avg = reviews?.reduce(
        (acc, items) => acc + Number(items.rating),
        0
      );
      return {
        reviewCount: reviews.length,
        reviewRating: avg / reviews.length,
      };
    }

    return {
      reviewCount: 0,
      reviewRating: 0,
    };
  }, [reviews]);

  const handleTenantRedirect = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    router.push(generateTenantURL(tenantSlug));
  };

  return (
    <Link prefetch href={`${generateTenantURL(tenantSlug)}/products/${id}`}>
      <div className="bg-card flex h-fit flex-col overflow-hidden rounded-md border transition-shadow hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="relative aspect-square">
          <Image
            alt={name}
            fill
            src={productImg || '/placeholder.png'}
            className="object-cover"
          />
        </div>
        <div className="flex flex-1 flex-col gap-3 border-y p-4">
          <h2 className="line-clamp-4 text-lg font-medium">{name}</h2>
          <div
            className="flex items-center gap-2"
            onClick={handleTenantRedirect}
          >
            {tenantImgUrl && (
              <Image
                src={tenantImgUrl}
                alt={tenantSlug}
                width={16}
                height={16}
                className="size-[16px] shrink-0 rounded-full border"
              />
            )}

            <p className="text-sm font-medium underline">{tenantSlug}</p>
          </div>
          {reviewsDetails?.reviewCount > 0 && (
            <div className="flex items-center gap-1">
              <StarIcon className="size-3.5 fill-black" />
              <p className="text-sm font-medium">
                {reviewsDetails?.reviewRating} ({reviewsDetails?.reviewCount})
              </p>
            </div>
          )}
          {reviewsDetails?.reviewCount === 0 && <div className="h-5"></div>}
        </div>
        <div className="p-4">
          <div className="relative w-fit border bg-pink-400 px-2 py-1">
            <p className="text-sm font-medium">
              {formatCurrency(Number(price))}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export const ProductSkeletonLoading = () => {
  return (
    <div className="dark:bg-input/30 aspect-3/4 w-full animate-pulse rounded-lg bg-neutral-200"></div>
  );
};
