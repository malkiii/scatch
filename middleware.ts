import { NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';

export default withAuth(
  async function middleware(req) {
    const token = req.nextauth.token;
    const isAuthenticated = !!token;
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/', req.url));
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
