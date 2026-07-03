import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  images: {
    domains: ['localhost', 'esadev.com.br'],
  },



  // ⚠️ Isso garante que as requisições SSR usem cookies e credenciais corretamente
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
      allowedOrigins: [
        "http://localhost:3000",
        "https://esadev.com.br",
        "https://api.esadev.com.br"
      ],
    },
  },
};

export default nextConfig;
