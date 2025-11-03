import { NextResponse } from 'next/server';

const locales = ['en', 'es'];
const defaultLocale = 'en';

function getLocale(request: Request): string {
  try {
    const header = request.headers.get('accept-language') || '';
    const parts = header.split(',').map((p) => p.split(';')[0].trim());
    for (const part of parts) {
      const base = part.split('-')[0];
      if (locales.includes(base)) return base;
    }
  } catch {}
  return defaultLocale;
}

export function proxy(request: Request) {
  const url = new URL(request.url);
  const { pathname } = url;
  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (hasLocale) return;

  const locale = getLocale(request);
  url.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next).*)'],
};


