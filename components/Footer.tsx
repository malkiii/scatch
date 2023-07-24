import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { siteInfos, socials } from '@/data/constants';
import { FaFacebook, FaGithub, FaInstagram, FaTwitter } from 'react-icons/fa';

const usefulLinks = ['login', 'about', 'blog'];

const socialIcons: Record<keyof typeof socials, JSX.Element> = {
  Facebook: <FaFacebook />,
  Instagram: <FaInstagram />,
  Twitter: <FaTwitter />,
  Github: <FaGithub />
};

const UsefulLinks: FC = () => {
  return (
    <div className="mr-10 flex flex-col gap-y-2">
      <h4 className="font-semibold">Useful links</h4>
      {usefulLinks.map(link => (
        <Link
          key={link}
          href={'/' + link}
          className="capitalize transition-colors hover:text-primary"
        >
          {link}
        </Link>
      ))}
    </div>
  );
};

const SocialLinks: FC = () => {
  type SocialName = keyof typeof socials;
  return (
    <div className="flex flex-col gap-y-2">
      <h4 className="font-semibold">Social</h4>
      {Object.keys(socials).map((name, i) => (
        <a
          key={i}
          href={socials[name as SocialName]}
          className="flex items-center gap-x-3 capitalize transition-colors hover:text-primary"
          target="_blank"
          rel="noreferrer"
        >
          {socialIcons[name as SocialName]} {name}
        </a>
      ))}
    </div>
  );
};

const Footer: FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="fixed bottom-0 z-[-1] w-full px-8 py-4">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-8 py-4 md:flex-row">
          <div className="max-w-sm">
            <Link href="/" className="my-4 inline-block">
              <Image
                src="/logotype.svg"
                alt="scatch logotype"
                width={144}
                height={36}
                className="logo"
              />
            </Link>
            <p className="text-md">
              Scatch is an image website where you can search, download or save images in your
              albums
            </p>
          </div>
          <div className="mx-auto flex flex-wrap items-baseline gap-x-8 gap-y-4 lg:mx-0">
            <UsefulLinks />
            <SocialLinks />
          </div>
        </div>
        <div className="border-t border-t-base-content/50 py-6 text-center max-sm:text-sm">
          <p>
            Copyright &copy; 2022-{currentYear} {siteInfos.author}.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
