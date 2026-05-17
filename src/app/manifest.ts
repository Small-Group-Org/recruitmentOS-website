import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'RecruitmentOS',
        short_name: 'RecruitmentOS',
        description: 'Done-for-you BD for recruitment agencies.',
        start_url: '/',
        display: 'standalone',
        background_color: '#0A0A0A',
        theme_color: '#F97316',
        icons: [
            // NOTE: 192/512 PNG assets will be added in /public when Tushar provides the logo wordmark
            // For now, falls back to the SVG favicon.
            { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
        ],
    };
}
