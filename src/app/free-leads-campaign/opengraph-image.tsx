import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-template';

export const runtime = 'edge';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
    return renderOgImage(
        'Free 30-day campaign',
        '10 hiring-manager contacts a day. 30 days. Free.',
        'Apply with your niche · 3 agencies per niche per month max',
    );
}
