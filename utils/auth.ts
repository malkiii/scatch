import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/server/db/client';

const env = process.env as Record<string, string>;
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  pages: { signIn: '/login' },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET
    }),
    FacebookProvider({
      clientId: env.FACEBOOK_CLIENT_ID,
      clientSecret: env.FACEBOOK_CLIENT_SECRET,
      authorization: {
        url: 'https://www.facebook.com/v16.0/dialog/oauth'
      }
    })
  ],
  callbacks: {
    async session({ token, session }) {
      session.user = token;
      return session;
    },
    async jwt({ token, user }) {
      const clientUser = await prisma.user.findFirst({
        where: {
          email: token.email
        }
      });

      if (!clientUser) {
        if (user) token.id = user.id;
        return token;
      }

      return { ...clientUser! };
    }
  }
};
