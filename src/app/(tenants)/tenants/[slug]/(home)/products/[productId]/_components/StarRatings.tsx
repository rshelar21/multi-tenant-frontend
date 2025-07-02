import React from 'react';
import { StarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const MAX_RATING = 5;
const MIN_RATING = 0;

interface StarRatingsProps {
  className?: string;
  rating: number;
  text?: string;
  iconClassName?: string;
}

export const StarRatings = ({
  rating,
  className,
  iconClassName,
  text,
}: StarRatingsProps) => {
  const safeRating = Math.max(MIN_RATING, Math.min(MAX_RATING, rating));
  return (
    <div className={cn(`flex items-center gap-x-1`, className)}>
      {Array.from({ length: MAX_RATING }).map((_, index) => (
        <StarIcon
          key={index}
          className={cn(
            `size-4`,
            (index ) < safeRating ? 'fill-black' : '',
            iconClassName
          )}
        />
      ))}
      {text && <p>{text}</p>}
    </div>
  );
};
