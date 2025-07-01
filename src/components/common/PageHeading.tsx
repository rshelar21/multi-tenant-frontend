import React from 'react';
import { cn } from '@/lib/utils';

interface Props {
  title: string;
  subTitle: string;
  actions?: React.ReactNode;
}

export const PageHeading = ({ subTitle, title, actions }: Props) => {
  return (
    <div className={cn('flex justify-between pt-10 pb-6')}>
      <div>
        <h1 className="text-3xl font-semibold">{title}</h1>
        <p className="text-base">{subTitle}</p>
      </div>
      {actions && actions}
    </div>
  );
};
