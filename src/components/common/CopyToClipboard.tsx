'use client';
import { useState } from 'react';
import { Clipboard, ClipboardCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface Props {
  text: string;
  className?: string;
}

export const CopyToClipboard = ({ text, className }: Props) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setIsCopied(true);
    toast.success('Copied to clipboard!');
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <>
      <Button
        className={cn('m-0 border-0 px-2 py-2 outline-0', className)}
        onClick={handleCopy}
        title="Copy"
        size="icon"
        variant="outline"
      >
        {isCopied ? (
          <ClipboardCheck className="size-4 text-green-700" />
        ) : (
          <Clipboard className="size-4" />
        )}
      </Button>
    </>
  );
};
