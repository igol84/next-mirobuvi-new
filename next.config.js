const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const path = require('path')
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    remotePatterns: [
      {hostname: 'sweetshoes.com.ua'},
      {hostname: 'lh3.googleusercontent.com'},
    ],
  },
}

module.exports = withNextIntl(nextConfig);
