'use client';
import { getTenantAPI } from '@/api/users';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { generateTenantURL } from '@/utils';
import { CheckoutButton } from './CheckoutButton';

interface Props {
  slug: string;
}

export const Navbar = ({ slug }: Props) => {
  const { data } = useQuery({
    queryKey: ['tenant'],
    queryFn: getTenantAPI,
  });
  return (
    <nav className="h-20 border-b bg-white font-medium">
      <div className="mx-auto flex h-full max-w-(--breakpoint-xl) items-center justify-between px-4 lg:px-12">
        <Link
          href={generateTenantURL(slug)}
          className="flex items-center gap-2"
        >
          {data?.storeImg && (
            <Image
              src={data?.storeImg}
              alt={slug}
              width={32}
              height={32}
              className="size-[32px] shrink-0 rounded-full border"
            />
          )}
          <p className="text-xl">{slug}</p>
        </Link>
        <CheckoutButton tenantSlug={slug} hideIfEmpty />
      </div>
    </nav>
  );
};

export const NavbarSkeleton = () => {
  return (
    <nav className="h-20 border-b bg-white font-medium">
      <div className="mx-auto flex h-full max-w-(--breakpoint-xl) items-center justify-between px-4 lg:px-12">
        <div className="" />
        {/* todo: skeleton for checkout button */}
      </div>
    </nav>
  );
};
