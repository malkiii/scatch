import { hash } from 'bcryptjs';
import { DashboardPageRoute } from '@/components/Dashboard';

export { default as cn } from 'classnames';

export function createUsernameParam(username: string): string {
  return '@' + username.trim().replace(/\W+/g, '-');
}

export async function getHashedPassword(password: string) {
  return await hash(password, 12);
}

type ProfileRoutes = {
  profileRoute: string;
  profileSubRoutes: Record<DashboardPageRoute, string>;
};
export function getUserProfileRoutes(username: string): ProfileRoutes {
  const userRoute = '/' + createUsernameParam(username);
  return {
    profileRoute: userRoute,
    profileSubRoutes: {
      images: userRoute + '/images',
      albums: userRoute + '/albums',
      favorite: userRoute + '/favorite',
      stats: userRoute + '/stats'
    }
  };
}

export function getResizedImage(src: string, size: number) {
  return `${src}?auto=compress&cs=tinysrgb&w=${size}`;
}

export function resizeAvatar(avatarSrc?: string | null) {
  if (!avatarSrc) return '';
  if (avatarSrc.includes('lh3.googleusercontent.com')) {
    return avatarSrc.replace(/=s\d+(-c)?/g, '=s360');
  }
  return avatarSrc;
}
