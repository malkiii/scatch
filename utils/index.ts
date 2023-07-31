import { hash } from 'bcryptjs';
import { DashboardPageRoute } from '@/components/Dashboard';

export { default as cn } from 'classnames';

export function createUsernameParam(username: string): string {
  return '@' + username.trim().replace(/\W+/g, '-');
}

export async function getHashedPassword(password: string) {
  return await hash(password, 12);
}

type ProfileRoutes = Record<DashboardPageRoute | 'base', string>;
export function getUserProfileRoutes(username: string): ProfileRoutes {
  const userRoute = '/' + createUsernameParam(username);
  return {
    base: userRoute,
    images: userRoute + '/images',
    albums: userRoute + '/albums',
    favorite: userRoute + '/favorite',
    stats: userRoute + '/stats'
  };
}

export function getResizedImage(src: string, size: number) {
  return `${src}?auto=compress&cs=tinysrgb&w=${size}`;
}

export function getUserAvatar(imageSrc?: string | null) {
  if (!imageSrc) return '/assets/avatar-placeholder.png';

  if (imageSrc.includes('lh3.googleusercontent.com')) {
    return imageSrc.replace(/=s\d+(-c)?/g, '=s360');
  }
  return imageSrc;
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
