import Link from 'next/link';
import { FC, ReactNode } from 'react';
import { ResponseImage } from '@utils/types';
import { CgMathPlus, CgSoftwareDownload } from 'react-icons/cg';

const logoSize = 25;
function cancelEvents(e: any) {
  e.stopPropagation();
}

type WithImage = {
  image: ResponseImage;
};
type WithChildren = {
  children: ReactNode;
};
type WithClassName = {
  className?: string;
};

type PhotographerNameProps = {
  name: string;
} & WithClassName;

export const PhotographerName: FC<PhotographerNameProps> = props => {
  const { name, className } = props;
  const styleClasses = className || '';
  return <strong className={'font-normal ' + styleClasses}>By {name}</strong>;
};

type SaveButtonPros = WithClassName;
export const SaveButton: FC<SaveButtonPros> = props => {
  const className = props.className || '';
  return (
    <a
      href=""
      className={'image-layer-btn ' + className}
      onClick={cancelEvents}
    >
      <CgMathPlus size={logoSize} />
    </a>
  );
};

type DownloadButtonPops = {
  content: 'text' | 'icon';
} & WithImage &
  WithClassName;

export const DownloadButton: FC<DownloadButtonPops> = props => {
  const { image, content } = props;
  const className = props.className || '';
  const downloadURL = `${image.src}?cs=srgb&dl=scatch-${image.id}.jpg&fm=jpg`;

  return (
    <a
      href={downloadURL}
      className={'image-layer-btn ' + className}
      onClick={cancelEvents}
    >
      {content == 'icon' ? <CgSoftwareDownload size={logoSize} /> : 'Download'}
    </a>
  );
};

type LayerProps = {
  linkProps: any;
  hasMobileSize: boolean;
} & WithImage &
  WithChildren;

const InnerImageLayer: FC<LayerProps> = ({ image, linkProps, children }) => {
  return (
    <Link {...linkProps} className="relative">
      {children}
      <div className="image-layout-cover">
        <SaveButton className="absolute top-5 right-5 cs-fixed" />
        <div className="absolute w-full bottom-0 p-5 flex items-center justify-between">
          <PhotographerName name={image.photographer} />
          <DownloadButton image={image} content="icon" className="cs-fixed" />
        </div>
      </div>
    </Link>
  );
};

const OuterImageLayer: FC<LayerProps> = ({ image, children }) => {
  return (
    <div key={image.id}>
      <PhotographerName name={image.photographer} className="block py-3" />
      {children}
      <div className="w-full flex items-center justify-between pt-3">
        <SaveButton className="cs-change" />
        <DownloadButton image={image} content="text" className="cs-change" />
      </div>
    </div>
  );
};

export const ImageLayer: FC<LayerProps> = props => {
  if (props.hasMobileSize) return <OuterImageLayer {...props} />;
  return <InnerImageLayer {...props} />;
};
