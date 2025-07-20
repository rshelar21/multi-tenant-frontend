import { LoaderCircle } from 'lucide-react';
import React from 'react';

interface LoaderProps {
  subTitle?: string;
}

export const Loader = ({ subTitle }: LoaderProps) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <LoaderCircle className="size-10 animate-spin" />
      {subTitle && <p className="text-base">{subTitle}</p>}
    </div>
  );
};
