import { z } from 'zod';
import { NextPage, NextComponentType } from 'next';
import { ReactElement, ReactNode, RefObject } from 'react';
import { AppContext, AppInitialProps, AppProps } from 'next/app';
import { Session } from 'next-auth';
import { Album } from '@prisma/client';
import {
  ResponseImageSchema,
  ImageAPIRequestQuerySchema,
  ImagePageSchema
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

export type UserAlbumThumbnail = Album & {
  images: {
    src: string;
  }[];
};
