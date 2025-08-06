'use client';
import Link from 'next/link';
import { CheckCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface Props {
  open: boolean;
  isSuccess: string;
  isCancel: string;
}

export const ProductCheckoutStatusCard = ({
  open,
  isSuccess,
  isCancel,
}: Props) => {
  return (
    <Dialog open={open}>
      <DialogContent hideClose className="">
        {isSuccess === 'true' && (
          <>
            <div className="relative mt-3 mb-6">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 shadow-lg">
                <CheckCircle className="h-10 w-10 animate-pulse text-white" />
              </div>
              <div className="absolute inset-0 mx-auto h-20 w-20 animate-ping rounded-full bg-emerald-400 opacity-20"></div>
            </div>

            <div className="mb-8 text-center">
              <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                Purchase Successful! 🎉
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Thank you for your purchase. Your order has been confirmed and
                will be processed shortly.
              </p>
            </div>

            <Link href="/library">
              <Button variant="elevated" size="lg" className="w-full">
                View
              </Button>
            </Link>
          </>
        )}

        {isCancel === 'true' && (
          <>
            <div className="relative mt-3 mb-6">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-red-400 to-red-600 shadow-lg">
                <X className="h-10 w-10 animate-pulse text-white" />
              </div>
              <div className="absolute inset-0 mx-auto h-20 w-20 animate-ping rounded-full bg-red-400 opacity-20"></div>
            </div>

            <div className="mb-8 text-center">
              <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                Checkout failed.
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Something went wrong. Please try again.
              </p>
            </div>

            <Link href={'/'}>
              <Button variant="elevated" size="lg" className="w-full">
                Close
              </Button>
            </Link>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
