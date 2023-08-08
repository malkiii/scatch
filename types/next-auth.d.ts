import type { Session, User } from 'next-auth';
import type { DefaultJWT, JWT } from 'next-auth/jwt';

declare module 'next-auth/jwt' {
  interface JWT {
    name: string;
    email: string;
    picture?: string | null;
    sub: string;
  }
}

declare module 'next-auth' {
  interface User {
    id: string;
    name: string;
    email: string;
    image?: string | null;
  }
  interface Session {
    user: User;
  }
}
