import Link from 'next/link';
import React from 'react';
import { List } from './filters.constant';

interface Props {
  category: List;
  isOpen: boolean;
}

export const SubcategoryMenu = ({ category, isOpen }: Props) => {
  if (!isOpen || category?.subcategories?.length === 0) {
    return null;
  }

  return (
    <div
      className="absolute z-100"
      style={{
        top: "100%",
        left: 0,
      }}
    >
      <div className="h-3 w-60" />
      <div
        style={{
          backgroundColor: category.color,
        }}
        className="shadow-[4px_4px_0px_0px_rgba(0, 0, 0, 1)] w-60 -translate-x-[2px] -translate-y-[2px] overflow-hidden rounded-md border text-black"
      >
        <div>
          {category?.subcategories?.map((item) => (
            <Link
              prefetch
              href={`/${category.slug}/${item?.slug}`}
              key={item?.name}
              className="flex w-full items-center justify-between p-4 text-left font-medium underline hover:bg-black hover:text-white"
            >
              {item?.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
