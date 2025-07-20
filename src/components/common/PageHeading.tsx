import React from 'react';
import { cn } from '@/lib/utils';

interface Props {
  title: string | React.ReactNode;
  subTitle: string | React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

export const PageHeading = ({ subTitle, title, actions, className }: Props) => {
  return (
    <div className={cn('flex justify-between pt-10 pb-6', className)}>
      <div>
        {typeof title === 'string' ? (
          <h1 className="text-3xl font-semibold">{title}</h1>
        ) : (
          title
        )}
        {typeof subTitle === 'string' ? (
          <p className="text-base">{subTitle}</p>
        ) : (
          subTitle
        )}
      </div>
      {actions && actions}
    </div>
  );
};
