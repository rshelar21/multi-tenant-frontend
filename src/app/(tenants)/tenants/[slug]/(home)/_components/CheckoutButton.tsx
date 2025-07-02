import Link from 'next/link';
import { ShoppingCartIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import { cn } from '@/lib/utils';
import { generateTenantURL } from '@/utils';

interface CheckoutButtonProps {
  tenantSlug: string;
  hideIfEmpty?: boolean;
  className?: string;
}

export const CheckoutButton = ({
  tenantSlug,
  className,
  hideIfEmpty,
}: CheckoutButtonProps) => {
  const { totalItems } = useCart(tenantSlug);

  if (hideIfEmpty && totalItems === 0) return null;
  return (
    <Button variant="elevated" asChild className={cn('bg-white', className)}>
      <Link href={`${generateTenantURL(tenantSlug)}/checkout`}>
        <ShoppingCartIcon />
        {totalItems > 0 ? totalItems : ''}
      </Link>
    </Button>
  );
};
