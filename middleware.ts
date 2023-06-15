import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';
import { getUserProfileRoutes } from '@/utils';

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req });
    const isAuthenticated = !!token;

    if (isAuthenticated) {
      const { profileRoute } = getUserProfileRoutes(token.name!);
      return NextResponse.redirect(new URL(profileRoute, req.url));
    }
    return null;
  },
  {
    callbacks: {
      authorized: () => true
    }
  }
);

export const config = {
  matcher: ['/login', '/register']
};
