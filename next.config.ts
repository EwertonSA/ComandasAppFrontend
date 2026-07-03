import type { NextConfig } from "next";
import api from "./src/services/api";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "api.esadev.com.br",
      pathname: "/**",
    },
  ],
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
