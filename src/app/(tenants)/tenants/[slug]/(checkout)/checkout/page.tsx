import React from 'react';
import { CheckoutView } from '@/containers/tenants';

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
