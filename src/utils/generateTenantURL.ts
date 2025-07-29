export function generateTenantURL(tenantSlug: string) {
  console.log('NODE_ENV:', process.env.NODE_ENV);
  console.log('FRONTEND URL:', process.env.NEXT_PUBLIC_APP_FRONTEND_URL);
  
  const protocol = 'https';
  const domain = process.env.NEXT_PUBLIC_ROOT_DOMAIN;

  if (process.env.NODE_ENV === 'development') {
    return `${process.env.NEXT_PUBLIC_APP_FRONTEND_URL}/tenants/${tenantSlug}`;
  }

  if (process.env.NODE_ENV === 'production') {
    return `${protocol}://${tenantSlug}.${domain}`;
  }

  return `/tenants/${tenantSlug}`;
}
