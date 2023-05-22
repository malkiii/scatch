import { RefObject } from 'react';

export type ImagePage = {
  images: ResponseImage[];
  hasMore: boolean;
};

export type ResponseImage = {
  id: number;
  width: number;
  height: number;
  photographer: string;
  avgColor: string;
  src: string;
};

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
