import { User } from 'next-auth';
import { JWT, DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth/jwt' {
  interface JWT {
    sub: string;
  }
}

declare module 'next-auth' {
  interface Session {
    user: User;
  }
}
