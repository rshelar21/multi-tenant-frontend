'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PageHeading } from '@/components/common';
import { useQuery } from '@tanstack/react-query';
import { getProductsAPI } from '@/api/products';
import { Plus } from 'lucide-react';
import { CreateProductsModal, ProductsTable } from './_components';
import { useAppSelector } from '@/store/hooks';
import { selectedUser } from '@/reducers/userSlice';
import { generateUrl } from '@/utils/generateUrl';

const Products = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { roles } = useAppSelector(selectedUser);
  const isSuperAdmin = roles?.some((i) => i.roleType === 1);

  const { data, isLoading } = useQuery({
    queryKey: ['admin-products', isSuperAdmin],
    queryFn: async () => {
      const url = generateUrl({
        path: '/products',
        params: {
          limit: 100,
          access: isSuperAdmin ? 'admin' : undefined,
        },
      });
      return await getProductsAPI(url);
    },
  });

  return (
    <div>
      <PageHeading
        title="Products"
        subTitle="List of products"
        actions={
          <Button
            variant="default"
            size="sm"
            onClick={() => setIsOpenModal(true)}
          >
            <Plus />
            Add Product
          </Button>
        }
      />
      <ProductsTable data={data?.data || []} isLoading={isLoading} />

      <CreateProductsModal
        open={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        isSuperAdmin={isSuperAdmin}
      />
    </div>
  );
};

export default Products;
