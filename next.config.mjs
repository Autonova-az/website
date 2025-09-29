/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'logos-world.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'static.vecteezy.com',
        port: '',
        pathname: '/**',
      },
       {
        protocol: 'https',
        hostname: 'minio.autonova.az',
        port: '',
        pathname: '/**',
      },

       {
        protocol: 'https',
        hostname: 'minio-dev.autonova.az',
        port: '',
        pathname: '/**',
      },

       {
        protocol: 'http',
        hostname: '127.0.0.1:8000',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
