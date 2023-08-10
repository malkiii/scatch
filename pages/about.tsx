import React from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import {
  BiPhotoAlbum as AlbumIcon,
  BiDownload as DownloadIcon,
  BiPurchaseTagAlt as FreeIcon,
  BiSearchAlt as SearchIcon
} from 'react-icons/bi';

const iconProps = { size: 48, className: 'mx-auto bg-primary rounded-circle p-3 text-white' };
const whatSetsUsApartSectionCards = [
  {
    icon: <SearchIcon {...iconProps} />,
    title: 'Image Search',
    text: 'Break language barriers with our intuitive image search.'
  },
  {
    icon: <AlbumIcon {...iconProps} />,
    title: 'Personalized Albums',
    text: 'Curate and organize in personalized albums.'
  },
  {
    icon: <DownloadIcon {...iconProps} />,
    title: 'High Quality Downloads',
    text: 'Download images in stunning high quality.'
  },
  {
    icon: <FreeIcon {...iconProps} />,
    title: 'Free Access',
    text: 'Enjoy free access to our diverse collection.'
  }
];

const AboutPage: NextPage = () => {
  return (
    <div className="[&_*]:text-balance text-center [&_div]:mx-auto [&_h3]:mb-4 [&_h3]:text-3xl [&_h4]:text-xl [&_h4]:font-semibold [&_p]:leading-[1.7] [&_section]:flex [&_section]:min-h-[640px] [&_section]:items-center [&_section]:px-8 [&_section]:py-20">
      <section className="">
        <div className="max-w-5xl">
          <h2 className="mb-5 text-4xl sm:text-5xl">About Us</h2>
          <p className="mb-7 text-xl">
            We are thrilled to introduce you to a platform that transcends language barriers and
            brings the world of captivating images to your fingertips. Our mission is to provide an
            intuitive and immersive experience, allowing you to effortlessly explore, collect, and
            download high-quality images that resonate with your interests.
          </p>
        </div>
      </section>
      <section className="bg-base-content text-base-100">
        <div className="max-w-5xl">
          <h3 className="text-3xl">What Sets Us Apart</h3>
          <p className="mb-7 text-xl">
            In a rapidly evolving digital landscape, we stand out as a unique hub for image
            enthusiasts, offering a plethora of features that cater to your creative needs. Here is
            what makes us special:
          </p>
          <div className="grid grid-cols-fill gap-7 [--col-min-width:320px] md:max-w-3xl">
            {whatSetsUsApartSectionCards.map(({ icon, title, text }) => (
              <div
                key={title}
                className="flex max-w-sm flex-col gap-3 rounded-xl bg-base-100 p-7 text-base-content shadow-2xl"
              >
                {icon}
                <h4>{title}</h4>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section>
        <div className="max-w-5xl">
          <h3 className="text-2xl sm:text-3xl">Join Us on this Journey</h3>
          <p className="mb-8 text-xl">
            We invite you to dive into the world of images that transcend words. Our platform is
            your gateway to endless inspiration. Explore, create, curate, and download with ease -
            your visual journey starts here.
          </p>
          <Link href="/login" className="theme-btn px-12 py-4 text-xl">
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
