export const searchDemoImages = {
  nature: [
    'https://images.pexels.com/photos/1671325/pexels-photo-1671325.jpeg',
    'https://images.pexels.com/photos/8258044/pexels-photo-8258044.jpeg',
    'https://images.pexels.com/photos/640781/pexels-photo-640781.jpeg',
    'https://images.pexels.com/photos/8797307/pexels-photo-8797307.jpeg',
    'https://images.pexels.com/photos/10903696/pexels-photo-10903696.jpeg',
    'https://images.pexels.com/photos/12255770/pexels-photo-12255770.jpeg'
  ],
  wallpapers: [
    'https://images.pexels.com/photos/2246476/pexels-photo-2246476.jpeg',
    'https://images.pexels.com/photos/5117558/pexels-photo-5117558.jpeg',
    'https://images.pexels.com/photos/6012907/pexels-photo-6012907.jpeg',
    'https://images.pexels.com/photos/983200/pexels-photo-983200.jpeg',
    'https://images.pexels.com/photos/130621/pexels-photo-130621.jpeg',
    'https://images.pexels.com/photos/776656/pexels-photo-776656.jpeg'
  ],
  vintage: [
    'https://images.pexels.com/photos/859895/pexels-photo-859895.jpeg',
    'https://images.pexels.com/photos/3633990/pexels-photo-3633990.jpeg',
    'https://images.pexels.com/photos/247929/pexels-photo-247929.jpeg',
    'https://images.pexels.com/photos/14552610/pexels-photo-14552610.jpeg',
    'https://images.pexels.com/photos/704555/pexels-photo-704555.jpeg',
    'https://images.pexels.com/photos/92866/pexels-photo-92866.jpeg'
  ]
};

export function easeInOutExpo(x: number): number {
  return x == 0
    ? 0
    : x == 1
    ? 1
    : x < 0.5
    ? Math.pow(2, 20 * x - 10) / 2
    : (2 - Math.pow(2, -20 * x + 10)) / 2;
}
