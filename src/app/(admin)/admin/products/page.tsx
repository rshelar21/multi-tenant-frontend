'use client';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Plus } from 'lucide-react';

import { deleteProductAPI, getProductsAPI } from '@/api/products';
import { useAppSelector } from '@/store/hooks';
import { generateUrl } from '@/utils/generateUrl';
import { selectedUser, isSuperAdmin } from '@/reducers/userSlice';
import { usePagination } from '@/hooks/use-pagination';
import { IProduct } from '@/types/product';

import { PageHeading } from '@/components/common';
import { Button } from '@/components/ui/button';
import {
  CreateProductsModal,
  ProductsTable,
  CreateContentModal,
} from './_components';

const AdminProductsPage = () => {
  const user = useAppSelector(selectedUser);
  const isUserSuperAdmin = useAppSelector(isSuperAdmin);
  const [{ page }] = usePagination();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [productDetails, setProductDetails] = useState<Partial<IProduct>>();
  const [isAddContentOpen, setIsAddContentOpen] = useState(false);

  const queryClient = useQueryClient();

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

  const { mutate, isPending } = useMutation({
    mutationKey: ['product-delete'],
    mutationFn: deleteProductAPI,
    onSuccess: () => {
      toast.success('Product Deleted!');
      queryClient.invalidateQueries({
        queryKey: ['admin-products', isSuperAdmin],
      });
    },
    onError: (err) => {
      toast.error(err.message || 'Something went wrong!');
    },
  });

  const handleDeleteProduct = (id: string) => {
    mutate({ id });
  };

  const hadleSetProductData = (productData: Partial<IProduct>): void => {
    setProductDetails(productData);
  };

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
        setIsAddContentOpen={setIsAddContentOpen}
        onSetProductData={hadleSetProductData}
        onDeleteProduct={handleDeleteProduct}
        setIsOpenModal={setIsOpenModal}
        isPending={isPending}
      />

      <CreateProductsModal
        open={isOpenModal}
        onClose={() => {
          setIsOpenModal(false);
          setProductDetails({});
        }}
        isSuperAdmin={isUserSuperAdmin}
        data={productDetails || null}
      />
      <CreateContentModal
        open={isAddContentOpen}
        onClose={() => {
          setIsAddContentOpen(false);
          setProductDetails({});
        }}
        isSuperAdmin={isUserSuperAdmin}
        productId={productDetails?.id || ''}
        initialContent={productDetails?.content || []}
        data={productDetails || null}
      />
    </div>
  );
};

export default AdminProductsPage;
