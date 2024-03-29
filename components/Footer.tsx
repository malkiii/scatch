import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaGithub, FaInstagram, FaTwitter } from 'react-icons/fa';
import { siteInfos, socialLinks } from '@/data/constants';

type SocialName = keyof typeof socialLinks;
const socialIcons: Record<SocialName, JSX.Element> = {
  Instagram: <FaInstagram />,
  Twitter: <FaTwitter />,
  Github: <FaGithub />
};

const UsefulLinks: FC = () => {
  const usefulLinks = ['login', 'about'];
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
  return (
    <div className="flex flex-col gap-y-2">
      <h4 className="font-semibold">Social</h4>
      {Object.entries(socialLinks).map(([name, link], i) => (
        <a
          key={i}
          href={link}
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
    <footer className="fixed bottom-0 z-[-1] -ml-0 w-screen px-8 py-4 md:-ml-4">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-8 py-4 md:flex-row">
          <div className="max-w-sm">
            <Link href="/" className="mb-4 inline-block">
              <Image
                src="/logotype.svg"
                alt="scatch logotype"
                width={144}
                height={36}
                className="logo"
              />
            </Link>
            <p className="text-md">{siteInfos.smallDescription}</p>
          </div>
          <div className="mx-auto flex flex-wrap items-baseline gap-x-8 gap-y-4 lg:mx-0">
            <UsefulLinks />
            <SocialLinks />
          </div>
        </div>
        <div className="text-balance border-t border-t-base-content/50 pb-3 pt-6 text-center">
          <p>
            Copyright &copy; 2022-{currentYear} {siteInfos.author}.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
