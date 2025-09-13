'use client';
import { PageHeading } from '@/components/common';
import { useAppSelector } from '@/store/hooks';
import { selectedUser, isSuperAdmin } from '@/reducers/userSlice';
import { AdminDashboard, StripVerficationCard } from '@/containers/admin';

const AdminPage = () => {
  const user = useAppSelector(selectedUser);
  const isUserSuperAdmin = useAppSelector(isSuperAdmin);

  return (
    <div className="pb-8">
      <PageHeading
        title={`Welcome back, ${user?.username || ''}`}
        subTitle="Here's what's happening with your store today"
      />

      {!isUserSuperAdmin && !user?.tenant?.stripeDetailsSubmitted && (
        <StripVerficationCard />
      )}
      {(user?.tenant?.stripeDetailsSubmitted || isUserSuperAdmin) && (
        <AdminDashboard isSuperAdmin={isUserSuperAdmin} />
      )}
    </div>
  );
};
export default AdminPage;
