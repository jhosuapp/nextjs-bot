import { NextRequest, NextResponse } from 'next/server';

const COOKIE_NAME = 'i18next';
const REALM = 'Basic realm="Dashboard", charset="UTF-8"';

const isProtectedPath = (pathname: string) =>
  pathname.startsWith('/dashboard') || pathname.startsWith('/api/admin');

const unauthorized = () =>
  new NextResponse('Auth required', {
    status: 401,
    headers: { 'WWW-Authenticate': REALM },
  });

const checkBasicAuth = (request: NextRequest): NextResponse | null => {
  const expectedUser = process.env.ADMIN_USERNAME;
  const expectedPass = process.env.ADMIN_PASSWORD;

  if (!expectedUser || !expectedPass) {
    return new NextResponse('Auth not configured', { status: 500 });
  }

  const header = request.headers.get('authorization');
  if (!header?.startsWith('Basic ')) return unauthorized();

  let decoded: string;
  try {
    decoded = atob(header.slice(6).trim());
  } catch {
    return unauthorized();
  }

  const sep = decoded.indexOf(':');
  if (sep === -1) return unauthorized();

  const user = decoded.slice(0, sep);
  const pass = decoded.slice(sep + 1);

  if (user !== expectedUser || pass !== expectedPass) return unauthorized();

  return null;
};

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isProtectedPath(pathname)) {
    const authFailure = checkBasicAuth(request);
    if (authFailure) return authFailure;
  }

  const response = NextResponse.next();

  if (pathname.startsWith('/en')) {
    response.cookies.set(COOKIE_NAME, 'en');
  } else if (pathname.startsWith('/pt')) {
    response.cookies.set(COOKIE_NAME, 'pt');
  } else if (pathname.startsWith('/fr')) {
    response.cookies.set(COOKIE_NAME, 'fr');
  } else if (pathname.startsWith('/de')) {
    response.cookies.set(COOKIE_NAME, 'de');
  } else {
    response.cookies.set(COOKIE_NAME, 'es');
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)', '/api/admin/:path*'],
};
