import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-template';

export const runtime = 'edge';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
    return renderOgImage(
        'RecruitmentOS · Pricing',
        'Your price, your numbers.',
        'Calculator-driven retainer · Starter / Growth / Pro',
    );
}
