import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ITruncateTextProps {
  text: string;
  maxLength?: number;
}

export const TruncateText = ({ text, maxLength = 12 }: ITruncateTextProps) => {
  return (
    <Tooltip>
      <TooltipTrigger>
        {text?.length > maxLength ? `${text.slice(0, maxLength)}...` : text}
      </TooltipTrigger>
      <TooltipContent>
        <p>{text}</p>
      </TooltipContent>
    </Tooltip>
  );
};
