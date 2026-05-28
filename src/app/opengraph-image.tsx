import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'RecruitmentOS — Done-For-You BD for Recruitment Agencies';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: 'linear-gradient(135deg, #0A0A0A 0%, #1a1a1a 100%)',
          fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
          position: 'relative',
        }}
      >
        {/* Accent glow */}
        <div
          style={{
            position: 'absolute',
            top: 100,
            right: 100,
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: '#FF6A00',
            opacity: 0.06,
            filter: 'blur(80px)',
          }}
        />

        {/* Logo + brand */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 40 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 16,
              background: '#FF6A00',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 20,
              fontSize: 40,
              fontWeight: 900,
              color: '#FFFFFF',
            }}
          >
            R
          </div>
          <span style={{ fontSize: 48, fontWeight: 900, color: '#FFFFFF', letterSpacing: -1 }}>
            Recruitment
          </span>
          <span style={{ fontSize: 48, fontWeight: 900, color: '#FF6A00', letterSpacing: -1 }}>
            OS
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 40,
            fontWeight: 700,
            color: '#FFFFFF',
            lineHeight: 1.3,
            marginBottom: 8,
          }}
        >
          We replace your BD function.
        </div>
        <div
          style={{
            fontSize: 40,
            fontWeight: 700,
            color: '#FF6A00',
            lineHeight: 1.3,
            marginBottom: 50,
          }}
        >
          You stop being the bottleneck.
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 24 }}>
          {[
            { value: '5.3%', label: 'AVG REPLY RATE' },
            { value: '1M+', label: 'JOBS SCRAPED' },
            { value: '5x', label: 'MORE PLACEMENTS' },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '16px 28px',
                borderRadius: 12,
                background: 'rgba(255,255,255,0.08)',
              }}
            >
              <span style={{ fontSize: 28, fontWeight: 800, color: '#FFFFFF' }}>
                {stat.value}
              </span>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', letterSpacing: 1.5, marginTop: 4 }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom accent bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 8,
            background: 'linear-gradient(90deg, #FF6A00, #FF8C33)',
          }}
        />
      </div>
    ),
    { ...size }
  );
}
