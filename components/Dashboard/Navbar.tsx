import { FC, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  BiPhotoAlbum as AlbumsIcon,
  BiHeart as FavoriteIcon,
  BiImages as ImagesIcon,
  BiLineChart as StatsIcon
} from 'react-icons/bi';
import { cn } from '@/utils';
import { useScrollEvent } from '@/hooks/useScrollEvent';
import { DashboardPageRoute } from '.';

type DashboardNavPage = {
  name: DashboardPageRoute;
  icon: JSX.Element;
};
const logoSize = 22;
const dashboardNavPages: DashboardNavPage[] = [
  {
    name: 'images',
    icon: <ImagesIcon size={logoSize} />
  },
  {
    name: 'albums',
    icon: <AlbumsIcon size={logoSize} />
  },
  {
    name: 'favorite',
    icon: <FavoriteIcon size={logoSize} />
  },
  {
    name: 'stats',
    icon: <StatsIcon size={logoSize} />
  }
];

type DashboardNavProps = {
  userProfileRoute: string;
  currentPageRoute: DashboardPageRoute;
};
const DashboardNav: FC<DashboardNavProps> = ({ userProfileRoute, currentPageRoute }) => {
  const [firstRoute] = useState<DashboardPageRoute>(currentPageRoute);
  const [trailerBorderStyle, setTrailerBorderStyle] = useState({
    '--trailer-border-width': '100%',
    '--trailer-border-position': '0'
  });

  const navbarRef = useRef<HTMLDivElement>(null);
  useScrollEvent(() => {
    const isOnTop = navbarRef.current!.offsetTop - window.scrollY < 65;
    if (isOnTop) {
      document.querySelector('header')!.style.boxShadow = 'none';
      navbarRef.current!.classList.add('bg-cs-change');
      navbarRef.current!.classList.add('shadow-xl');
    } else {
      document.querySelector('header')!.style.boxShadow = '';
      navbarRef.current!.classList.remove('bg-cs-change');
      navbarRef.current!.classList.remove('shadow-xl');
    }
  });

  function moveTrailerBorder() {
    const navbar = navbarRef.current!;
    const routes = dashboardNavPages.map(({ name }) => name);
    if (!routes.includes(currentPageRoute)) return;

    const firstLink: HTMLAnchorElement = navbar.querySelector(
      `a:nth-child(${routes.indexOf(firstRoute) + 1})`
    )!;
    const nextLink: HTMLAnchorElement = navbar.querySelector(
      `a:nth-child(${routes.indexOf(currentPageRoute) + 1})`
    )!;

    setTrailerBorderStyle({
      '--trailer-border-width': nextLink.offsetWidth + 'px',
      '--trailer-border-position': nextLink.offsetLeft - firstLink.offsetLeft + 'px'
    });
  }

  useEffect(() => {
    moveTrailerBorder();
  }, [currentPageRoute]);

  return (
    <div
      ref={navbarRef}
      className="sticky top-[64px] z-[900] border-b border-neutral-600 pl-1 transition-colors"
    >
      <div className="relatvie mx-auto max-w-7xl" style={trailerBorderStyle as any}>
        <ul className="flex items-center gap-x-0 text-neutral-600 transition-all duration-200 sm:gap-x-5">
          {dashboardNavPages.map(({ name: page, icon }, id) => (
            <Link
              key={id}
              href={userProfileRoute + '/' + page}
              className={cn('profile-page-link', {
                'focus': page == firstRoute,
                'text-dark dark:text-white': page == currentPageRoute
              })}
              shallow
            >
              {icon} {page}
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default DashboardNav;
