// Google Analytics 4 Helper Functions
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Track page views
export const pageview = (url: string) => {
    if (typeof window.gtag !== 'undefined') {
        window.gtag('config', GA_MEASUREMENT_ID as string, {
            page_path: url,
        });
    }
};

// Track custom events
export const event = ({ action, category, label, value }: {
    action: string;
    category: string;
    label?: string;
    value?: number;
}) => {
    if (typeof window.gtag !== 'undefined') {
        window.gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value,
        });
    }
};

// Track section views
export const trackSectionView = (sectionName: string) => {
    event({
        action: 'section_view',
        category: 'engagement',
        label: sectionName,
    });
};

// Track CTA clicks
export const trackCTAClick = (ctaName: string, location: string) => {
    event({
        action: 'cta_click',
        category: 'conversion',
        label: `${ctaName} - ${location}`,
    });
};

// Track scroll depth
export const trackScrollDepth = (percentage: number) => {
    event({
        action: 'scroll_depth',
        category: 'engagement',
        label: `${percentage}%`,
        value: percentage,
    });
};

// TypeScript declaration for gtag
declare global {
    interface Window {
        gtag: (...args: unknown[]) => void;
        dataLayer: unknown[];
    }
}
