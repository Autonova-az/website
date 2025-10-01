/** @type {import('next').NextConfig} */
const nextConfig = {
    // SEO and Performance Optimizations
    compress: true,
    poweredByHeader: false,
    generateEtags: true,
    
    // Image Optimization
    images: {
        unoptimized: true,
        formats: ['image/webp', 'image/avif'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
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

    // Headers for SEO and Security
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'origin-when-cross-origin',
                    },
                    {
                        key: 'Permissions-Policy',
                        value: 'camera=(), microphone=(), geolocation=()',
                    },
                ],
            },
            {
                source: '/sitemap.xml',
                headers: [
                    {
                        key: 'Content-Type',
                        value: 'application/xml',
                    },
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=86400, s-maxage=86400',
                    },
                ],
            },
            {
                source: '/robots.txt',
                headers: [
                    {
                        key: 'Content-Type',
                        value: 'text/plain',
                    },
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=86400, s-maxage=86400',
                    },
                ],
            },
        ];
    },

    // Redirects for SEO
    async redirects() {
        return [
            {
                source: '/home',
                destination: '/',
                permanent: true,
            },
            {
                source: '/cars',
                destination: '/automobiles',
                permanent: true,
            },
        ];
    },

    // Rewrites for clean URLs
    async rewrites() {
        return [
            {
                source: '/sitemap',
                destination: '/sitemap.xml',
            },
        ];
    },

    // Experimental features for better performance
    experimental: {
        optimizeCss: true,
        scrollRestoration: true,
    },

    // Compiler optimizations
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production',
    },

    // Output configuration
    output: 'standalone',
    
    // Trailing slash configuration
    trailingSlash: false,
};

export default nextConfig;