import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async headers() {
    return [
      {
        // This regex matches ALL routes and files (including .pdf in public)
        source: '/:path*', 
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow, noarchive',
          },
        ],
      },
    ];
  },
};

export default nextConfig;