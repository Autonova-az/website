// middleware.js
import { NextResponse } from 'next/server'

export function middleware(request) {
  // Start with a default response object.
  // This response object will be modified by both parts of the middleware.
  const response = NextResponse.next();

  // --- Part 1: Handle Locale (from your first middleware) ---
  const url = new URL(request.url);
  const locale = url.searchParams.get('locale');

  if (locale && ['az', 'ru', 'en'].includes(locale)) {
    response.cookies.set('locale', locale, {
      maxAge: 60 * 60 * 24 * 365, // 1 year
      path: '/',
    });
  }

  // --- Part 2: Set Custom Headers (from your second middleware) ---
  // We need to create a new Headers object from the *current* response headers
  // so that any headers set by middleware before this (if any) are preserved.
  // Then we add our custom headers.

  // Note: The headers object passed to NextResponse.next({ headers })
  //       is merged with existing headers, but it's good practice to
  //       ensure you're modifying a set that includes previous changes.
  //       However, for headers directly from middleware, you often just
  //       set them on the final response headers.
  //       The simpler way for custom headers often involves directly modifying
  //       the response.headers object, or passing them in the options if it's new.

  // Let's modify the response.headers directly:
  response.headers.set("x-current-path", request.nextUrl.pathname);
  response.headers.set("x-search-params", request.nextUrl.searchParams.toString());

  // --- Optional: Debugging logs (remove in production) ---

  console.log( "isliyen middlware yuxardaki");


  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
