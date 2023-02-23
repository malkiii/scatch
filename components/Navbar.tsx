import Link from 'next/link';
import Image from 'next/image';
import ThemeButton from './ThemeButton';

export default function Navbar(): JSX.Element {
  return (
    <header className="h-20 w-full px-8">
      <nav className="flex items-center justify-between max-w-7xl h-full mx-auto">
        <Link href="/">
          <Image
            src="/logotype.svg"
            className="relative"
            alt="Logo"
            width={144}
            height={36}
          />
        </Link>
        <div>
          <Link href="/" className="theme-link">
            Explore
          </Link>
          <Link href="/" className="theme-link">
            My albums
          </Link>
          <ThemeButton text="Login" className="px-6 py-3" />
        </div>
      </nav>
    </header>
  );
}
