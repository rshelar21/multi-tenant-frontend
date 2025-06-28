'use client';
import React, { ChangeEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Props {
  minPrice?: string | null;
  maxPrice?: string | null;
  onMinPriceChange: (v: string) => void;
  onMaxPriceChange: (v: string) => void;
}

export const formatAsCurrency = (v: string) => {
  const numericValue = v.replace(/[^0-9.]/g, '');

  const parts = numericValue.split('.');
  const formattedValue =
    parts[0] + (parts.length > 1 ? '.' + parts[1]?.slice(0, 2) : '');

  if (!formattedValue) return '';

  const number = parseFloat(formattedValue);
  if (isNaN(number)) return '';

  return new Intl.NumberFormat('en-us', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(number);
};

export const PriceFilter = ({
  onMaxPriceChange,
  onMinPriceChange,
  maxPrice,
  minPrice,
}: Props) => {
  const handleMinPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/[^0-9.]/g, '');
    onMinPriceChange(numericValue);
  };

  const handleMaxPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/[^0-9.]/g, '');
    onMaxPriceChange(numericValue);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <Label className="text-base font-medium">Minimum price</Label>
        <Input
          type="text"
          placeholder="$0"
          value={minPrice ? formatAsCurrency(minPrice) : ''}
          onChange={handleMinPriceChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label className="text-base font-medium">Mximum price</Label>
        <Input
          type="text"
          placeholder="*" // inifinity sign
          value={maxPrice ? formatAsCurrency(maxPrice) : ''}
          onChange={handleMaxPriceChange}
        />
      </div>
    </div>
  );
};
