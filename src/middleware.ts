import { NextResponse, NextRequest } from 'next/server';

export const config = {
  matcher: ['/((?!api/|_next/|_static/|_vercel|media/|[\w-]+\.\w+).*)'],
};

export function middleware(request: NextRequest) {
  const { nextUrl, headers } = request;

  const host = headers.get('host') || '';

  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN;
  const rootOnlyRoutes = [
    '/settings',
    '/admin',
    '/pricing',
    '/admin/products',
    '/admin/category',
    '/admin/tags',
  ];

  if (
    host.endsWith(`.${rootDomain}`) &&
    rootOnlyRoutes.includes(nextUrl.pathname)
  ) {
    return NextResponse.redirect(`https://${rootDomain}${nextUrl.pathname}`);
  }

  if (host.endsWith(`.${rootDomain}`)) {
    const tenantSlug = host?.replace(`.${rootDomain}`, '');
    return NextResponse.rewrite(
      new URL(`/tenants/${tenantSlug}${nextUrl.pathname}`, request.url)
    );
  }
  return NextResponse.next();
}
