'use client'
import { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { StarIcon } from 'lucide-react';
import { IProduct } from '@/types/product';

interface Props extends IProduct {
  tenantSlug: string;
  tenantImgUrl?: string | null;
  reviewRating?: number;
  reviewCount?: number;
}

export const ProductCard = ({
  id,
  name,
  productImg,
  tenantImgUrl,
  tenantSlug,
  reviews,
}: Props) => {
  const reviewsDetails = useMemo(() => {
    if (reviews?.length) {
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

  return (
    <Link prefetch href={`/library/${id}`}>
      <div className="flex h-fit flex-col overflow-hidden rounded-md border bg-card  transition-shadow hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
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
          <div className="flex items-center gap-2">
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
        </div>
      </div>
    </Link>
  );
};

export const ProductSkeletonLoading = () => {
  return (
    <div className="aspect-3/4 w-full animate-pulse rounded-lg bg-neutral-200"></div>
  );
};
