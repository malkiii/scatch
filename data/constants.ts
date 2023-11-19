export const siteInfos = {
  name: 'Scatch',
  author: 'Malki Abdurrahman',
  description:
    'Scatch, an image website where you can search for your favored images and download or save them in your albums for free with high resolution.',
  smallDescription:
    'Scatch is an image website where you can search, download or save images in your albums.'
};

export const themeColors = {
  primary: '#1ca8ac',
  secondary: { light: '#d3e4f8', dark: '#092039' },
  accent: '#13429c',
  neutral: { light: '#ddd', dark: '#1f1f1f' },
  text: { light: '#121212', dark: '#fff' },
  background: { light: '#fff', dark: '#121212' },
  error: '#ff1a1a'
} as const;

export const socialLinks = {
  Twitter: 'https://twitter.com/MalkiAbduu',
  Instagram: 'https://www.instagram.com/malkiabduu',
  Github: 'https://github.com/malkiii'
};

export const authValidationPatterns = {
  name: /^[[A-z_]*$/,
  email: /^[\w-\.]+@([\w-]+\.)+\w{2,7}$/,
  password: /.{6,}/
};
