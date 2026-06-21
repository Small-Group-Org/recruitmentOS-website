import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    compress: true,
    images: {
        formats: ['image/avif', 'image/webp'],
        minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    },
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                ],
            },
            {
                source: '/logos/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=2592000, immutable',
                    },
                ],
            },
            {
                source: '/resources/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=2592000, immutable',
                    },
                ],
            },
            {
                source: '/testimonials/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=2592000, immutable',
                    },
                ],
            },
        ];
    },
    async redirects() {
        return [
            {
                source: '/fit-call',
                destination: 'https://cal.com/tusharm/30min?user=tusharm',
                permanent: false,
            },
        ];
    },
};

export default nextConfig;
