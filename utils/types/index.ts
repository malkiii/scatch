import { RefObject } from 'react';

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
