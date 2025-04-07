/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/hp_total-interior-eco',
  assetPrefix: '/hp_total-interior-eco/',  // 末尾にスラッシュを追加
  images: {
    unoptimized: true,
    loader: 'custom',
    loaderFile: './image-loader.js',
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  i18n: {
    locales: ['ja', 'en'],
    defaultLocale: 'ja',
  },
};

module.exports = nextConfig; 