/** @type {import('next').NextConfig} */
const path = require('path')
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    remotePatterns: [
      {hostname: 'mirobuvi.com.ua'},
      {hostname: 'lh3.googleusercontent.com'},
    ],
  },
  webpack: (config, {isServer}) => {
    if (!isServer) {
      config.output.filename = 'static/chunks/[name].js';
      config.output.chunkFilename = 'static/chunks/[name].js';
    }
    return config;
  }
}

module.exports = nextConfig
