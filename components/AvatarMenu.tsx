import { FC } from 'react';
import Link from 'next/link';
import { User } from 'next-auth';
import OptionMenu from './OptionMenu';
import { signOut } from 'next-auth/react';
import ColorSchemeButton from './ColorSchemeButton';
import { useToggleMenu } from '@/hooks/useToggleMenu';
import { getUserProfileRoutes } from '@/utils';
import {
  BiMoon as MoonIcon,
  BiCog as SettingsIcon,
  BiLineChart as StatesIcon,
  BiPhotoAlbum as AlbumIcon,
  BiUserCircle as ProfileIcon,
  BiLogOutCircle as LogOutIcon
} from 'react-icons/bi';

type AvatarIconProps = AvatarMenuProps & {
  className?: string;
};
const AvatarIcon: FC<AvatarIconProps> = ({ user, className }) => {
  return (
    <img
      src={user.image || '/assets/avatar-placeholder.png'}
      alt={user.name || 'scatch avatar'}
      className={className}
      referrerPolicy="no-referrer"
    />
  );
};

type AvatarMenuProps = {
  user: User;
};
const AvatarMenu: FC<AvatarMenuProps> = props => {
  const iconSize = 25;
  const { isOpen, menuRef, toggle } = useToggleMenu();
  const { profileRoute, profileSubRoutes } = getUserProfileRoutes(props.user.name!);
  return (
    <div ref={menuRef} className="relative flex items-center justify-center">
      <button onClick={toggle}>
        <AvatarIcon
          user={props.user}
          className="w-10 rounded-circle outline outline-0 outline-black/10 transition-all hover:outline-[5px] dark:outline-white/10 md:mr-0"
        />
      </button>
      <OptionMenu isOpen={isOpen} className="avatar-menu" onClick={toggle}>
        <div>
          <Link href={profileRoute} className="avatar-menu-option">
            <ProfileIcon size={iconSize} /> View profile
          </Link>
          <Link href={profileSubRoutes.albums} className="avatar-menu-option">
            <AlbumIcon size={iconSize} /> Your albums
          </Link>
          <Link href={profileSubRoutes.stats} className="avatar-menu-option menu-separator">
            <StatesIcon size={iconSize} /> Your stats
          </Link>
          <Link href="/settings" className="avatar-menu-option">
            <SettingsIcon size={iconSize} /> Settings
          </Link>
          <div onClick={e => e.stopPropagation()}>
            <ColorSchemeButton
              containerClassName="flex w-full items-center justify-between p-3 menu-separator"
              buttonClassName="w-10"
            >
              <div className="flex items-center gap-x-3">
                <MoonIcon size={iconSize} /> Dark
              </div>
            </ColorSchemeButton>
          </div>
          <button className="avatar-menu-option w-full" onClick={() => signOut()}>
            <LogOutIcon size={iconSize} />
            Log Out
          </button>
        </div>
      </OptionMenu>
    </div>
  );
};
export default AvatarMenu;
