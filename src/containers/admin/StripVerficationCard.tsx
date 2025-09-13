import React from 'react';
import { CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import { postVerifyAccountAPI } from '@/api/auth';
import { toast } from 'sonner';

export const StripVerficationCard = () => {
  const { mutate, isPending } = useMutation({
    mutationKey: ['account-link'],
    mutationFn: () => postVerifyAccountAPI(),
    onSuccess: (data) => {
      window.location.href = data?.url;
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return (
    <div className="rounded-lg border-2 border-dashed border-gray-500 py-8">
      <div className="bg-surface mx-auto flex h-fit w-fit items-center justify-center rounded-full p-4">
        <CreditCard className="size-7" />
      </div>
      <div className="py-2 text-center">
        <h3 className="text-2xl font-semibold">
          Business Information Required
        </h3>
        <p className="text-md font-medium dark:text-gray-400">
          Complete your business profile to start selling and receiving payments
        </p>

        <Button
          size="sm"
          disabled={isPending}
          onClick={() => mutate()}
          className="mt-5"
        >
          Continue With Stripe Connect
        </Button>
      </div>
    </div>
  );
};
