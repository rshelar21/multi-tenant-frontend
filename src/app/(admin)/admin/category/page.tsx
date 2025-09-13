'use client';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { AdminCategoryTable } from '@/containers/admin';
import { PageHeading } from '@/components/common';
import { getCategoryAPI } from '@/api/products';
import { generateUrl } from '@/utils/generateUrl';
import { usePagination } from '@/hooks/use-pagination';

const AdminCategoryPage = () => {
  const [{ page }] = usePagination();

  const { data, isLoading } = useQuery({
    queryKey: ['admin-category', page],
    queryFn: async () => {
      const url = generateUrl({
        path: '/category/sub-category/all',
        params: {
          limit: 12,
          page: page,
        },
      });
      return await getCategoryAPI(url);
    },
  });

  return (
    <div className="pb-8">
      <PageHeading
        title="Category"
        subTitle="Explore all predefined categories"
      />
      <AdminCategoryTable
        data={data?.data || []}
        isLoading={isLoading}
        meta={data?.meta || undefined}
      />
    </div>
  );
};

export default AdminCategoryPage;
