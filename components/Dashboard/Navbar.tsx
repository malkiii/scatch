import { FC, useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  BiPhotoAlbum as AlbumsIcon,
  BiHeart as FavoriteIcon,
  BiImages as ImagesIcon,
  BiLineChart as StatsIcon
} from 'react-icons/bi';
import { cn } from '@/utils';
import { DashboardPageRoute } from '.';

const useTrailerBorder = (currentPage: DashboardNavProps['currentPageRoute']) => {
  const navbarRef = useRef<HTMLDivElement>(null);
  const [firstRoute] = useState<DashboardPageRoute>(currentPage);
  const [trailerBorderStyle, setTrailerBorderStyle] = useState({
    '--trailer-border-width': '100%',
    '--trailer-border-position': '0'
  });

  const moveTrailerBorder = useCallback(() => {
    const navbar = navbarRef.current!;
    const routes = dashboardNavPages.map(({ name }) => name);
    if (!routes.includes(currentPage)) return;

    const firstLink: HTMLAnchorElement = navbar.querySelector(
      `a:nth-child(${routes.indexOf(firstRoute) + 1})`
    )!;
    const nextLink: HTMLAnchorElement = navbar.querySelector(
      `a:nth-child(${routes.indexOf(currentPage) + 1})`
    )!;

    setTrailerBorderStyle({
      '--trailer-border-width': nextLink.offsetWidth + 'px',
      '--trailer-border-position': nextLink.offsetLeft - firstLink.offsetLeft + 'px'
    });
  }, [currentPage]);

  useEffect(() => {
    moveTrailerBorder();
    window.addEventListener('resize', moveTrailerBorder);
    return () => window.removeEventListener('resize', moveTrailerBorder);
  }, [currentPage]);

  return { firstRoute, navbarRef, trailerBorderStyle };
};

type DashboardNavPage = {
  name: DashboardPageRoute;
  icon: JSX.Element;
};
const pageIconProps = { size: 23 };
const dashboardNavPages: DashboardNavPage[] = [
  {
    name: 'images',
    icon: <ImagesIcon {...pageIconProps} />
  },
  {
    name: 'albums',
    icon: <AlbumsIcon {...pageIconProps} />
  },
  {
    name: 'favorite',
    icon: <FavoriteIcon {...pageIconProps} />
  },
  {
    name: 'stats',
    icon: <StatsIcon {...pageIconProps} />
  }
];

type DashboardNavProps = {
  currentPageRoute: DashboardPageRoute;
};
const DashboardNav: FC<DashboardNavProps> = ({ currentPageRoute }) => {
  const { navbarRef, firstRoute, trailerBorderStyle } = useTrailerBorder(currentPageRoute);
  return (
    <nav ref={navbarRef} className="border-b border-neutral-600 pl-1 transition-colors">
      <div className="relatvie mx-auto max-w-7xl" style={trailerBorderStyle as any}>
        <ul className="mx-auto flex w-fit items-center gap-x-5 text-neutral-600 transition-all duration-200">
          {dashboardNavPages.map(({ name, icon }, id) => (
            <Link
              key={id}
              href={`/dashboard/${name}`}
              className={cn('profile-page-link', {
                'focus': name == firstRoute,
                'text-base-content': name == currentPageRoute
              })}
              shallow
            >
              {icon} <span className="hidden md:inline">{name}</span>
            </Link>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default DashboardNav;
