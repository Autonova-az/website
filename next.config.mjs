/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'logos-world.net',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'upload.wikimedia.org',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'static.vecteezy.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'minio-dev.autonova.az',
                pathname: '/autonova/**',
            },
            {
                protocol: 'https',
                hostname: 'minio.autonova.az',
                pathname: '/autonova/**',
            },

            {
                protocol: 'https',
                hostname: 'minio-dev.autonova.az',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'minio.autonova.az',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
