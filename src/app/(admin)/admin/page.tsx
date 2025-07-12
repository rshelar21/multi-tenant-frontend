'use client';
import { Button } from '@/components/ui/button';
import { PageHeading } from '@/components/common';
import { useMutation } from '@tanstack/react-query';
import { postVerifyAccountAPI } from '@/api/auth';
import { toast } from 'sonner';

const AdminPage = () => {
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
    <div className="">
      <PageHeading title="Welcome Jack" subTitle="Manage your store" />
      <div className="rounded-lg border-2 border-dashed border-gray-500 py-8">
        <div className="flex flex-col items-center justify-center gap-2">
          <Button
            variant="elevated"
            size="lg"
            disabled={isPending}
            onClick={() => mutate()}
          >
            Verify Account
          </Button>
          <p className="text-base font-normal text-gray-600">
            To create your products, first verify your account
          </p>
        </div>
      </div>
    </div>
  );
};
export default AdminPage;
