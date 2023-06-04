import { z } from 'zod';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { ReactElement, ReactNode, RefObject } from 'react';
import {
  ResponseImageSchema,
  ImageAPIRequestQuerySchema,
  ImagePageSchema
} from '@/utils/validation';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
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
