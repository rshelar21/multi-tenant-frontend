import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface ITruncateTextProps {
  text: string;
  maxLength?: number;
  textClassName?: string;
}

export const TruncateText = ({
  text,
  maxLength = 12,
  textClassName,
}: ITruncateTextProps) => {
  return (
    <Tooltip>
      <TooltipTrigger className={cn(textClassName)}>
        {text?.length > maxLength ? `${text.slice(0, maxLength)}...` : text}
      </TooltipTrigger>
      <TooltipContent>
        <p>{text}</p>
      </TooltipContent>
    </Tooltip>
  );
};
