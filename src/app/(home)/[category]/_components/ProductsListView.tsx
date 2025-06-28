import React, { Suspense } from 'react';
import { ProductSort } from './productFilter/ProductSort';
import { ProductsList } from './ProductsList';
import { ProductFilters } from './productFilter/ProductFilters';
import { ProductSkeletonLoading } from './ProductCard';

interface IProductsListViewProps {
  category?: string;
  subCategory?: string;
}

export const ProductsListView = ({
  category,
  subCategory,
}: IProductsListViewProps) => {
  return (
    <>
      <div className="flex flex-col gap-4 px-4 py-8 lg:px-12">
        <div className="flex flex-col justify-between gap-y-2 lg:flex-row lg:items-center lg:gap-y-0">
          <p className="text-2xl font-medium">Curated for you</p>
          <ProductSort />
        </div>
        <div className="grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-6 xl:grid-cols-8">
          <div className="lg:col-span-2 xl:col-span-2">
            <ProductFilters />
          </div>
          <div className="lg:col-span-4 xl:col-span-6">
            <Suspense fallback={<ProductSkeletonLoading />}>
              <ProductsList category={category} subCategory={subCategory} />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
};
