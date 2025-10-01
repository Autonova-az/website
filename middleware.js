// middleware.js
import { NextResponse } from 'next/server'

export function middleware(request) {
  const response = NextResponse.next();
  const url = new URL(request.url);

  // --- Part 1: Handle Locale ---
  const locale = url.searchParams.get('locale');
  if (locale && ['az', 'ru', 'en'].includes(locale)) {
    response.cookies.set('locale', locale, {
      maxAge: 60 * 60 * 24 * 365, // 1 year
      path: '/',
    });
  }

  // --- Part 2: SEO and Security Headers ---
  response.headers.set("x-current-path", request.nextUrl.pathname);
  response.headers.set("x-search-params", request.nextUrl.searchParams.toString());
  
  // Security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin');
  response.headers.set('X-XSS-Protection', '1; mode=block');

  // --- Part 3: Handle SEO Redirects ---
  const pathname = request.nextUrl.pathname;

  // Redirect old URLs to new ones
  if (pathname === '/home') {
    return NextResponse.redirect(new URL('/', request.url), 301);
  }
  
  if (pathname === '/cars') {
    return NextResponse.redirect(new URL('/automobiles', request.url), 301);
  }

  // Handle trailing slashes
  if (pathname.endsWith('/') && pathname !== '/') {
    return NextResponse.redirect(new URL(pathname.slice(0, -1), request.url), 301);
  }

  // --- Part 4: Bot Detection and Handling ---
  const userAgent = request.headers.get('user-agent') || '';
  const isBot = /bot|crawler|spider|crawling/i.test(userAgent);
  
  if (isBot) {
    response.headers.set('X-Robots-Tag', 'index, follow');
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
