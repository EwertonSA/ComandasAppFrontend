import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    domains: ['localhost', 'esadev.com.br'],
  },

   async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.NODE_ENV === 'production'
          ? '/api/:path*'             // prod: mesmo domínio
          : 'http://localhost:5000/api/:path*', // dev: proxy para backend
      },
    ];
  }
};

export default nextConfig;
