import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { cn, getResizedImage, getUserProfileRoutes } from '@/utils';
import { albumDemoThumbnails } from '@/data/constants';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const AlbunmsContainer: FC<{ animate: boolean }> = ({ animate }) => {
  const itemDelay = (index: number) => 150 + index * 100 + 'ms';
  const showItem = (event: any) => event.currentTarget.classList.remove('opacity-0');

  return (
    <div className="relative grid aspect-[2298/1522] w-full grid-cols-2 grid-rows-2 items-center gap-4 md:w-[500px]">
      {albumDemoThumbnails.map((imageURL, index) => (
        <div
          key={index}
          onAnimationStartCapture={showItem}
          style={{ animationDelay: itemDelay(index) }}
          className={cn(
            'group relative aspect-[1149/761] overflow-hidden rounded-lg border-2 border-white text-white opacity-0 shadow-2xl transition-colors hover:border-primary hover:text-primary',
            { 'animate-in fade-in slide-in-from-top-6 duration-300': animate }
          )}
        >
          <Image
            priority
            src={getResizedImage(imageURL, 520)}
            className="w-full rounded-inherit transition-all duration-200 group-hover:scale-125"
            alt="album"
            fill
          />
          <span className="absolute bottom-2 left-3 font-bold opacity-70">album</span>
        </div>
      ))}
    </div>
  );
};

const AlbumsSection: FC = () => {
  const { data: session } = useSession();

  const { targetRef, isInView } = useIntersectionObserver({ threshold: 4 / 5, once: true });
  const animate = isInView
    ? 'animate-in fade-in slide-in-from-bottom-10 duration-200'
    : 'opacity-0';

  const albumsPageLink = session ? getUserProfileRoutes(session.user.name!).albums : '/login';

  return (
    <div
      ref={targetRef}
      className="flex h-[760px] flex-col-reverse items-center justify-end gap-10 px-8 py-20 lg:flex-row lg:justify-center lg:py-0"
    >
      <AlbunmsContainer animate={isInView} />
      <div className={cn('max-w-[500px] text-center lg:text-left', animate)}>
        <h2 className="mb-4 text-3xl sm:text-4xl">Create your own albums.</h2>
        <p className="mb-6 text-xl">
          After creating your account, you can save images in albums which you can check later.
        </p>
        <Link
          href={albumsPageLink}
          className={cn(
            'theme-btn shadow-xl',
            isInView ? 'animate-in fade-in slide-in-from-right-10 delay-150' : 'opacity-0'
          )}
        >
          See your albums
        </Link>
      </div>
    </div>
  );
};

export default AlbumsSection;
