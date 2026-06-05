import { ImageResponse } from 'next/og';

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = 'image/png';

export function renderOgImage(eyebrow: string, title: string, subtitle?: string) {
    return new ImageResponse(
        (
            <div
                style={{
                    background: '#0A0A0A',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: '80px',
                    fontFamily: 'system-ui, sans-serif',
                    position: 'relative',
                }}
            >
                {/* Orange accent line top */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '6px', background: '#F97316' }} />

                {/* Eyebrow */}
                <div style={{ color: '#F97316', fontSize: '20px', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '32px', fontWeight: 700 }}>
                    {eyebrow}
                </div>

                {/* Title */}
                <div style={{ color: '#ffffff', fontSize: '64px', fontWeight: 800, lineHeight: 1.05, marginBottom: subtitle ? '24px' : 0, maxWidth: '950px', letterSpacing: '-0.02em' }}>
                    {title}
                </div>

                {/* Subtitle */}
                {subtitle && (
                    <div style={{ color: '#a1a1aa', fontSize: '28px', fontWeight: 500, lineHeight: 1.3, maxWidth: '950px' }}>
                        {subtitle}
                    </div>
                )}

                {/* Bottom-right wordmark */}
                <div style={{ position: 'absolute', bottom: '60px', right: '80px', color: '#F97316', fontSize: '22px', fontWeight: 900, letterSpacing: '-0.02em' }}>
                    recruitmentos.smallgrp.com
                </div>
            </div>
        ),
        { ...OG_SIZE }
    );
}
