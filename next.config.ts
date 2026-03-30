import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc'
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com'
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com'
      },
      {
        protocol: 'https',
        hostname: 'pbs.twimg.com'
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com'
      },
      {
        protocol: 'https',
        hostname: 'instagram.fgye1-1.fna.fbcdn.net'
      },
      {
        protocol: 'https',
        hostname: 'instagram.fgye1-2.fna.fbcdn.net'
      },
      {
        protocol: 'https',
        hostname: 'scontent.cdninstagram.com'
      },
      {
        protocol: 'https',
        hostname: 'offloadmedia.feverup.com'
      },
      {
        protocol: 'https',
        hostname: 'esa-cdn.carta.menu'
      },
      {
        protocol: 'https',
        hostname: 'render.vivenu.com'
      },
    ]
  },
};

export default nextConfig;
