'use client';
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDownIcon, ChevronRightIcon } from 'lucide-react';
import { PriceFilter } from './PriceFilter';
import { useProductFilters } from '@/hooks/use-product-filters';
import { TagsFilter } from './TagsFilter';

interface IProductFilterProps {
  title: string;
  className?: string;
  children: React.ReactNode;
}

const ProductFilter = ({ children, title, className }: IProductFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const Icon = isOpen ? ChevronDownIcon : ChevronRightIcon;

  return (
    <div
      className={cn(
        'flex flex-col gap-2 border-b p-4 transition-all',
        className
      )}
    >
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex cursor-pointer items-center justify-between"
      >
        <p className="font-medium">{title}</p>
        <Icon className="size-5" />
      </div>
      {isOpen && children}
    </div>
  );
};

export const ProductFilters = () => {
  const [filters, setFilters] = useProductFilters();

  const hasFilters = Object.entries(filters).some(([key, value]) => {
    if (key === 'sort') return false;
    if (
      value !== null &&
      typeof value !== 'undefined' &&
      value !== '' &&
      value?.length !== 0
    ) {
      return true;
    }
    return false;
  });

  const onChange = (key: keyof typeof filters, value: unknown) => {
    setFilters({ ...filters, [key]: value });
  };

  const handeClear = () => {
    setFilters({
      minPrice: '',
      maxPrice: '',
      tags: [],
    });
  };

  return (
    <div className="rounded-md border bg-card">
      <div className="flex items-center justify-between border-b p-4">
        <p className="font-medium">Filters</p>
        {hasFilters && (
          <button
            className="cursor-pointer underline"
            onClick={() => handeClear()}
            type="submit"
          >
            Clear
          </button>
        )}
      </div>
      <ProductFilter title="Price" className="border-b-0">
        <PriceFilter
          maxPrice={filters.maxPrice}
          minPrice={filters.minPrice}
          onMinPriceChange={(value) => onChange('minPrice', value)}
          onMaxPriceChange={(value) => onChange('maxPrice', value)}
        />
      </ProductFilter>

      <ProductFilter title="Tags" className="border-b-0">
        <TagsFilter
          value={filters?.tags}
          onChange={(value) => onChange('tags', value)}
        />
      </ProductFilter>
    </div>
  );
};
