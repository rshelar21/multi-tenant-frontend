import Link from 'next/link';
import { generateTenantURL } from '@/utils';
import { Button } from '@/components/ui/button';

interface Props {
  slug: string;
}

export const CheckoutHeader = ({ slug }: Props) => {
  return (
    <nav className="h-20 border-b font-medium">
      <div className="mx-auto flex h-full max-w-(--breakpoint-xl) items-center justify-between px-4 lg:px-12">
        <p className="text-xl">Checkout</p>
        <Button variant="elevated" asChild>
          <Link href={`${generateTenantURL(slug)}`}>Continue Shopping</Link>
        </Button>
      </div>
    </nav>
  );
};
