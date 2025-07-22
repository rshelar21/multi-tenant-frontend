export const runtime = 'edge';
import React from 'react';
import { CheckoutView } from './components/CheckoutView';

const CheckoutPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  return (
    <div>
      <CheckoutView tenantSlug={slug} />
    </div>
  );
};

export default CheckoutPage;
