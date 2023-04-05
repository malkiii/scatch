type ImageURL = string;

const loadImage = (src: ImageURL): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = (...args) => reject(args);
    image.crossOrigin = 'Anonymous';
    image.src = src;
  });

export default async function getBlurhash(ImageURL: ImageURL) {
  const preloadImage = await loadImage(ImageURL);

  const canvas = document.createElement('canvas');
  canvas.width = preloadImage.width;
  canvas.height = preloadImage.height;

  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(preloadImage, 0, 0);

  const blurAmount = 30;
  ctx.filter = `blur(${blurAmount}px)`;
  ctx.drawImage(canvas, 0, 0);

  return canvas.toDataURL();
}
