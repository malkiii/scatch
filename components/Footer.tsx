import Link from 'next/link';
import Image from 'next/image';
import { FC } from 'react';
import { socials } from '../constants/socials';

const currentYear = new Date().getFullYear();

const Footer: FC = () => {
  return (
    <footer className="bg-neutral-800/10 py-4 px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex justify-between flex-wrap gap-8 py-4">
          <div className="max-w-md">
            <Link href="/" className="inline-block my-4">
              <Image
                src="/logotype.svg"
                alt="Logo-footer"
                width={144}
                height={36}
                className="logo"
              />
            </Link>
            <p className="text-lg">
              Scatch is an online image gallery where you can edit, save, or
              download images for free.
            </p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-4 items-baseline mx-auto lg:mx-0">
            <div className="mr-10">
              <h4>Useful links</h4>
              <Link href="/" className="footer-link">
                Login
              </Link>
              <Link href="/" className="footer-link">
                About
              </Link>
              <Link href="/" className="footer-link">
                Blog
              </Link>
            </div>
            <div>
              <h4>Social</h4>
              {socials.map(({ name, icon, url }) => (
                <a
                  key={name}
                  href={url}
                  className="footer-link"
                  target="_blank"
                  rel="noreferrer"
                >
                  {icon} {name}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="text-center py-6 border-t dark:border-t-white/50 border-t-dark/50">
          <p>Copyright &copy; 2022-{currentYear} Malki Abderrahman.</p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
