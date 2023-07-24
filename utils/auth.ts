import { db } from '@/server/db/client';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { compare } from 'bcryptjs';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';

const env = process.env as Record<string, string>;
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  pages: { signIn: '/login' },
  session: { strategy: 'jwt' },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET
    }),
    FacebookProvider({
      clientId: env.FACEBOOK_CLIENT_ID,
      clientSecret: env.FACEBOOK_CLIENT_SECRET,
      authorization: {
        url: 'https://www.facebook.com/v16.0/dialog/oauth',
        params: { scope: 'public_profile,email' }
      }
    }),
    CredentialsProvider({
      type: 'credentials',
      credentials: {},
      async authorize(credentials) {
        if (!credentials) return null;
        const { email, password } = credentials as Record<string, string>;

        // Check if it's an existing user
        const user = await db.user.findUnique({ where: { email } });
        if (!user) throw new Error('Email');

        // Validate the password
        const isPasswordValid = await compare(password, user.password!);
        if (!isPasswordValid) throw new Error('Password');

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image
        };
      }
    })
  ],
  secret: process.env.NEXT_PUBLIC_SECRET,
  callbacks: {
    async session({ token, session }) {
      if (session.user) {
        session.user.id = token.sub;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }
      return session;
    },
    async jwt({ token, user }) {
      return token;
    }
  }
};
