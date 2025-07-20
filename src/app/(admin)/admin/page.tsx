'use client';
import { Button } from '@/components/ui/button';
import { PageHeading } from '@/components/common';
import { useMutation } from '@tanstack/react-query';
import { postVerifyAccountAPI } from '@/api/auth';
import { toast } from 'sonner';
import { useAppSelector } from '@/store/hooks';
import { selectedUser, isSuperAdmin } from '@/reducers/userSlice';
import { AdminDashboard } from '@/containers/admin';

const AdminPage = () => {
  const user = useAppSelector(selectedUser);
  const isUserSuperAdmin = useAppSelector(isSuperAdmin);

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
    <div className="pb-8">
      <PageHeading
        title={`Welcome back, ${user?.username || ''}`}
        subTitle="Here's what's happening with your store today"
      />
      {!isUserSuperAdmin && !user?.tenant?.stripeDetailsSubmitted && (
        <div className="rounded-lg border-2 border-dashed border-gray-500 py-8">
          <div className="flex flex-col items-center justify-center gap-2">
            <Button size="sm" disabled={isPending} onClick={() => mutate()}>
              Verify Account
            </Button>
            <p className="text-base font-normal text-gray-600">
              To create your products, first verify your account
            </p>
          </div>
        </div>
      )}

      <AdminDashboard isSuperAdmin={isUserSuperAdmin} />
    </div>
  );
};
export default AdminPage;
