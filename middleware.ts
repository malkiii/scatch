import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import { withAuth } from 'next-auth/middleware';
import { createUsernameParam } from './utils';

export default withAuth(
  async function middleware(req) {
    const token = await getToken({ req });
    const isAuthenticated = !!token;

    if (isAuthenticated) {
      const username = token.name!;
      return NextResponse.redirect(new URL('/' + createUsernameParam(username), req.url));
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
