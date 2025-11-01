import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "api.darkak.com.bd",
        port: "",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "pub-b7fd9c30cdbf439183b75041f5f71b92.r2.dev",
        port: "",
      },
      {
        protocol: "https",
        hostname: "example.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "ae01.alicdn.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "ae02.alicdn.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "ae03.alicdn.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "ae04.alicdn.com",
        port: "",
      },
    ],
  },
  reactStrictMode: true,
  //output: 'export',
  compress: true,
  experimental: {
    optimizePackageImports: [
      "react-icons",
      "date-fns",
      "firebase",
      "antd"
    ],
  },
};

export default nextConfig;
