import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { siteInfos, socials } from '@/data/constants';
import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa';

const socialIcons = {
  Facebook: <FaFacebook />,
  Instagram: <FaInstagram />,
  Twitter: <FaTwitter />,
  Github: <FaGithub />
};

type SocialName = keyof typeof socialIcons;

const SocialList: FC = () => {
  return (
    <div>
      <h4>Social</h4>
      {socials.map(({ name, url }) => (
        <a key={name} href={url} className="footer-link" target="_blank" rel="noreferrer">
          {socialIcons[name as SocialName]} {name}
        </a>
      ))}
    </div>
  );
};

const currentYear = new Date().getFullYear();

const Footer: FC = () => {
  return (
    <footer className="bg-neutral-100 px-8 py-4 dark:bg-neutral-900">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap justify-between gap-8 py-4">
          <div className="max-w-md">
            <Link href="/" className="my-4 inline-block">
              <Image
                src="/logotype.svg"
                alt="Logo-footer"
                width={144}
                height={36}
                className="logo"
              />
            </Link>
            <p className="text-lg">
              Scatch is an online image gallery where you can edit, save, or download images for
              free.
            </p>
          </div>
          <div className="mx-auto flex flex-wrap items-baseline gap-x-8 gap-y-4 lg:mx-0">
            <div className="mr-10">
              <h4>Useful links</h4>
              <Link href="/login" className="footer-link">
                Login
              </Link>
              <Link href="/about" className="footer-link">
                About
              </Link>
              <Link href="/blog" className="footer-link">
                Blog
              </Link>
            </div>
            <SocialList />
          </div>
        </div>
        <div className="border-t border-t-dark/50 py-6 text-center dark:border-t-white/50 max-sm:text-sm">
          <p>
            Copyright &copy; 2022-{currentYear} {siteInfos.author}.
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
