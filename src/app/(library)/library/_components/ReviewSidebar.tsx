import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getReviewsAPI } from '@/api/reviews';
import { Loader } from '@/components/common';
import { ReviewForm } from './ReviewForm';

interface ReviewSidebarProps {
  productId: string;
}

export const ReviewSidebar = ({ productId }: ReviewSidebarProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ['reviews', productId],
    queryFn: async () => await getReviewsAPI(`/reviews?productId=${productId}`),
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <ReviewForm productId={productId} data={data} />
    </div>
  );
};
