import type { ReactElement, ReactNode, RefObject } from 'react';
import type { NextComponentType, NextPage } from 'next';
import type { AppContext, AppInitialProps, AppProps } from 'next/app';
import type { Album as UserAlbum } from '@prisma/client';
import type { Session } from 'next-auth';
// zod schemas
import { z } from 'zod';
import {
  ImageAPIRequestQuerySchema,
  ImagePageSchema,
  ResponseImageSchema
} from '@/utils/validation';

export type AppType = NextComponentType<AppContext, AppInitialProps, AppProps>;

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
  currentSession: Session | null;
};

export type ResponseImage = z.infer<typeof ResponseImageSchema>;

export type ContainerRef = RefObject<HTMLDivElement>;

export type ModalActions<T = () => void> = {
  next?: T;
  prev?: T;
  close: T;
};

export type ModalImage = {
  width: number;
  height: number;
  src: string;
};

export type SignUpFormData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type LoginFormData = {
  email: string;
  password: string;
};

export type WithFormError = {
  error?: 'Email' | 'Password' | 'Name';
};

export type ImageAPIRequestQuery = z.infer<typeof ImageAPIRequestQuerySchema>;
export type ImagePage = z.infer<typeof ImagePageSchema>;

export type UserAlbumThumbnail = UserAlbum & {
  images: {
    src: string;
  }[];
};
