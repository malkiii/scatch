import { hash } from 'bcryptjs';
import { ClassValue, clsx } from 'clsx';
import resizer from 'react-image-file-resizer';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getHashedPassword(password: string) {
  return await hash(password, 12);
}

export function getResizedImage(src: string, size: number) {
  return `${src}?auto=compress&cs=tinysrgb&w=${size}`;
}

export function getUserAvatar(imageSrc?: string | null, original = false) {
  if (!imageSrc) return '/assets/avatar-placeholder.png';
  if (!original) return imageSrc;

  const src = new URL(imageSrc);
  switch (src.hostname) {
    case 'lh3.googleusercontent.com':
      return imageSrc.replace(/=s\d+(-c)?/g, '=s360');
    case 'res.cloudinary.com':
      src.pathname = src.pathname.replace(/w_\d+/g, 'w_360');
      return src.href;
    default:
      return imageSrc;
  }
}

export function getImageModalRouteQuery(pathname: string, id: number, index: number) {
  return {
    [pathname.startsWith('/search')
      ? 'query'
      : pathname.startsWith('/albums')
      ? 'name'
      : 'username']: id,
    i: index
  };
}
export function removeClassNames(element: HTMLElement, classNames?: string) {
  if (!classNames) return (element.className = '');
  classNames
    .trim()
    .split(' ')
    .forEach(className => element.classList.remove(className));
}

export function disableScrolling(force: boolean = true) {
  document.documentElement.classList.toggle('no-scroll', force);
}

export async function resizeAndCropImage(file: File, width: number, height: number) {
  const resizeImage = () =>
    new Promise<string>(resolve => {
      resizer.imageFileResizer(
        file,
        width, // max width
        height, // max height
        'PNG', // output format
        100, // quality
        0, // rotation
        uri => resolve(uri as any),
        'base64'
      );
    });

  return await resizeImage();
}
