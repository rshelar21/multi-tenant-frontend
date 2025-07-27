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
    <Button
      variant="outline"
      className={cn('m-0 border-0 bg-transparent p-0 outline-0', className)}
      onClick={handleCopy}
      title="Copy"
    >
      {isCopied ? (
        <ClipboardCheck className="size-4 text-green-700" />
      ) : (
        <Clipboard className="size-4" />
      )}
    </Button>
  );
};
