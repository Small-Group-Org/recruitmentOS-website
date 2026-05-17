import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-template';

export const runtime = 'edge';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
    return renderOgImage(
        'RecruitmentOS · Founder',
        'Tushar Mangla.',
        'I run the BD function for the first 60 days myself.',
    );
}
