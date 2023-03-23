import { FC } from 'react';
import { ResponseImage } from '../../hooks/useFetch';
import { CgMathPlus, CgSoftwareDownload } from 'react-icons/cg';

type LayerProps = {
  image: ResponseImage;
};

const ImageLayer: FC<LayerProps> = ({ image }) => {
  const logoSize = 25;
  const downloadURL = `${image.src}?cs=srgb&dl=scatch-${image.id}.jpg&fm=jpg`;
  function cancelEvents(e: any) {
    e.stopPropagation();
  }

  return (
    <>
      <a
        href={downloadURL}
        className="sm:hidden absolute bottom-5 right-5 text-white hover:text-theme transition-colors p-2"
      >
        <CgSoftwareDownload size={40} />
      </a>
      <div className="hidden sm:block image-layout-cover">
        <a
          href=""
          className="image-layout-btn absolute top-5 right-5"
          onClick={cancelEvents}
        >
          <CgMathPlus size={logoSize} />
        </a>
        <div className="absolute w-full bottom-0 p-5 flex items-center justify-between">
          <strong className="font-normal text-white">
            By {image.photographer}
          </strong>
          <a
            href={downloadURL}
            className="image-layout-btn"
            onClick={cancelEvents}
          >
            <CgSoftwareDownload size={logoSize} />
          </a>
        </div>
      </div>
    </>
  );
};
export default ImageLayer;
