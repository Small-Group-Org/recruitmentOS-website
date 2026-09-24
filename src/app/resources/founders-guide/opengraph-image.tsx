import { renderOgImage, OG_SIZE, OG_CONTENT_TYPE } from '@/lib/og-template';

export const runtime = 'edge';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
    return renderOgImage(
        'RecruitmentOS · Free 16-Step Blueprint',
        "The Founder's Guide to Finding New Clients Every Week",
        'The architecture to generate new recruitment clients every week without feast-or-famine.',
    );
}
