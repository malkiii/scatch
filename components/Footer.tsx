import Link from 'next/link';
import Image from 'next/image';
import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa';

const currentYear = new Date().getFullYear();

export default function Footer(): JSX.Element {
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
                Home
              </Link>
              <Link href="/" className="footer-link">
                About
              </Link>
              <Link href="/" className="footer-link">
                Blog
              </Link>
            </div>
            <div className="">
              <h4>Social</h4>
              <Link href="/" className="footer-link">
                <FaFacebook className="text-xl" /> Facebook
              </Link>
              <Link href="/" className="footer-link">
                <FaTwitter className="text-xl" /> Twitter
              </Link>
              <Link href="/" className="footer-link">
                <FaInstagram className="text-xl" /> Instagram
              </Link>
              <Link href="/" className="footer-link">
                <FaGithub className="text-xl" /> Github
              </Link>
            </div>
          </div>
        </div>
        <div className="text-center py-6 border-t border-t-white/50">
          <p>Copyright &copy; 2022-{currentYear} Malki Abderrahman.</p>
        </div>
      </div>
    </footer>
  );
}
