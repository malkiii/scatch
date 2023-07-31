import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import { getUserProfileRoutes } from '@/utils';

export const config = {
  matcher: ['/login', '/register', '/albums/:path*', '/(@.*)/:path*', '/settings']
};

const authRoutes = config.matcher.slice(0, 2);

export default withAuth(
  async function middleware(req) {
    const url = req.nextUrl;
    const token = await getToken({ req });
    const isAuthenticated = !!token;
    const isAuthRoute = authRoutes.includes(url.pathname);

    if (isAuthRoute && isAuthenticated) {
      const { base: profileRoute } = getUserProfileRoutes(token.name!);
      return NextResponse.redirect(profileRoute);
    }

    if (!isAuthRoute && !isAuthenticated) {
      return NextResponse.redirect('/login');
    }

    return null;
  },
  {
    callbacks: {
      // you have to return "true" if you want the middleware function to be triggered
      authorized: () => true
    }
  }
);
