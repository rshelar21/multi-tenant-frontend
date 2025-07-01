'use client';
import { useState } from 'react';
import { Clipboard, ClipboardCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface Props {
  text: string;
}

export const CopyToClipboard = ({ text }: Props) => {
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
      className="m-0 border-transparent p-0"
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
