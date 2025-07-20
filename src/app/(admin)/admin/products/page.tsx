'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PageHeading } from '@/components/common';
import { useQuery } from '@tanstack/react-query';
import { getProductsAPI } from '@/api/products';
import { Plus } from 'lucide-react';
import { CreateProductsModal, ProductsTable } from './_components';
import { useAppSelector } from '@/store/hooks';
import { generateUrl } from '@/utils/generateUrl';
import { selectedUser, isSuperAdmin } from '@/reducers/userSlice';
import { usePagination } from '@/hooks/use-pagination';

const AdminProductsPage = () => {
  const user = useAppSelector(selectedUser);
  const isUserSuperAdmin = useAppSelector(isSuperAdmin);
  const [{ page }] = usePagination();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['admin-products', isUserSuperAdmin],
    queryFn: async () => {
      const url = generateUrl({
        path: '/products',
        params: {
          limit: 12,
          access: isUserSuperAdmin ? 'admin' : undefined,
          page: page,
        },
      });
      return await getProductsAPI(url);
    },
  });

  return (
    <div className="pb-8">
      <PageHeading
        title="Products"
        subTitle="List of products"
        actions={
          <Button
            variant="default"
            size="sm"
            onClick={() => setIsOpenModal(true)}
            disabled={
              isUserSuperAdmin
                ? false
                : !Boolean(user?.tenant?.stripeDetailsSubmitted)
            }
          >
            <Plus />
            Add Product
          </Button>
        }
      />
      <ProductsTable
        data={data?.data || []}
        isLoading={isLoading}
        isSuperAdmin={isUserSuperAdmin}
        stripeDetailsSubmitted={user?.tenant?.stripeDetailsSubmitted || false}
        meta={data?.meta || undefined}
      />

      <CreateProductsModal
        open={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        isSuperAdmin={isUserSuperAdmin}
      />
    </div>
  );
};

export default AdminProductsPage;
