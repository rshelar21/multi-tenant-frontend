import React from 'react';
import { SearchInput } from './search-input';
import { Categories } from './categories';
import { categoriesList } from './filters.constant';

export const SearchFilters = () => {
  return (
    <div className="flex w-full flex-col gap-4 border-b px-4 py-8 lg:px-2">
      <SearchInput data={categoriesList}/>
      <div className="hidden lg:block">
        <Categories />
      </div>
    </div>
  );
};
