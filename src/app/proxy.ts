import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'es'] as const;
const defaultLocale = 'en';

function getPreferredLocale(request: NextRequest): (typeof locales)[number] {
  const header = request.headers.get('accept-language') || '';
  const parts = header.split(',').map((p) => p.split(';')[0].trim().toLowerCase());
  for (const part of parts) {
    const base = part.split('-')[0];
    if (base === 'es') return 'es';
    if (base === 'en') return 'en';
  }
  return defaultLocale;
}

export default function proxy(request: NextRequest) {
  const url = new URL(request.url);
  const { pathname, search } = url;

  // Ignore Next internals, API routes, and asset/file requests
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/favicon') ||
    /\.(?:\w+)$/.test(pathname)
  ) {
    return;
  }

  // Already localized?
  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (hasLocale) return;

  // Redirect to preferred locale
  const locale = getPreferredLocale(request);
  const redirectURL = new URL(`/${locale}${pathname}${search}`, request.url);
  return NextResponse.redirect(redirectURL);
}

export const config = {
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};