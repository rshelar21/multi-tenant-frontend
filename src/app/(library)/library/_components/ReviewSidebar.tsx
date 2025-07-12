import React from 'react';
import { getReviewsAPI } from '@/api/reviews';
import { useQuery } from '@tanstack/react-query';
import { ReviewForm } from './ReviewForm';

interface ReviewSidebarProps {
  productId: string;
}

export const ReviewSidebar = ({ productId }: ReviewSidebarProps) => {
  const { data, isFetching } = useQuery({
    queryKey: ['reviews', productId],
    queryFn: async () => await getReviewsAPI(`/reviews?productId=${productId}`),
  });

  if (isFetching) {
    return <h1>loading</h1>;
  }

  return (
    <div>
      <ReviewForm productId={productId} data={data} />
    </div>
  );
};
