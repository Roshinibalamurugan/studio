import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: "https",
        hostname: "images.tv9telugu.com",
      },
      {
        protocol: "https",
        hostname: "mir-s3-cdn-cf.behance.net",
      },
      {
        protocol: "https",
        hostname: "www.theweek.in",
      },
      {
        protocol: "https",
        hostname: "www.themoviedb.org",
      },
      {
        protocol: "https",
        hostname: "gumlet.vikatan.com",
      },
      {
        protocol: "https",
        hostname: "d388d59m61mm0v.cloudfront.net",
      },
      {
        protocol: "https",
        hostname: "th.bing.com",
      },
    ],
  },
};

export default nextConfig;
