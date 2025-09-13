'use client';
import { useState } from 'react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { AdminTagsTable, CreateTagsModal } from '@/containers/admin';
import { PageHeading } from '@/components/common';
import { getProductTagsAPI } from '@/api/products';
import { generateUrl } from '@/utils/generateUrl';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { usePagination } from '@/hooks/use-pagination';

const AdminTagsPage = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [{ page }] = usePagination();

  const { data, isLoading } = useQuery({
    queryKey: ['admin-tags', page],
    queryFn: async () => {
      const url = generateUrl({
        path: '/tags',
        params: {
          limit: 12,
          page: page,
        },
      });
      return await getProductTagsAPI(url);
    },
    placeholderData: keepPreviousData,
  });

  return (
    <div className="pb-8">
      <PageHeading
        title="Add Tag"
        subTitle="Personalize your products with custom tags"
        actions={
          <Button
            variant="default"
            size="sm"
            onClick={() => setIsOpenModal(true)}
          >
            <Plus />
            Add Tag
          </Button>
        }
      />
      <AdminTagsTable
        data={data?.data || []}
        isLoading={isLoading}
        meta={data?.meta || undefined}
      />

      <CreateTagsModal
        open={isOpenModal}
        onClose={() => setIsOpenModal(false)}
      />
    </div>
  );
};

export default AdminTagsPage;
