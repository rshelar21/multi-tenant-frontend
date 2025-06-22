'use client';
import React from 'react';
import { SearchInput } from './search-input';
import { Categories } from './categories';
import { categoriesList } from './filters.constant';
import { useParams } from 'next/navigation';
import { BreadcrumbNavigation } from './BreadcrumbNavigation';

const DEFAULT_BG_COLOR = '#F5F5F5';

export const SearchFilters = () => {
  const params = useParams();

  const categoryName = params?.category as string;
  const subCategoryName = params?.subcategory as string;

  const currentCategory = categoriesList?.find((c) => c.slug === categoryName);

  const subCategory = currentCategory?.subcategories?.find((s) => s.slug === subCategoryName)?.name

  return (
    <div
      className="flex w-full flex-col gap-4 border-b px-4 py-8 lg:px-2"
      style={{
        background: currentCategory?.color || DEFAULT_BG_COLOR,
      }}
    >
      <SearchInput data={categoriesList} />
      <div className="hidden lg:block">
        <Categories />
      </div>
      <BreadcrumbNavigation
        activeCategory={categoryName}
        activeCategoryName={currentCategory?.name || ''}
        activeSubcategoryName={subCategory || ''}
      />
    </div>
  );
};
