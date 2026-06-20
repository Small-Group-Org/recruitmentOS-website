import { apiClient } from './apiClient';

export interface PageEventPayload {
  eventType: string;
  page?: string;
  label?: string;
  value?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  sessionId?: string;
}

function getUtmParams() {
  if (typeof window === 'undefined') return {};
  const urlParams = new URLSearchParams(window.location.search);
  return {
    utmSource: urlParams.get('utm_source') || undefined,
    utmMedium: urlParams.get('utm_medium') || undefined,
    utmCampaign: urlParams.get('utm_campaign') || undefined,
    utmContent: urlParams.get('utm_content') || undefined,
  };
}

export const eventService = {
  async trackPageEvent(payload: Omit<PageEventPayload, 'utmSource' | 'utmMedium' | 'utmCampaign' | 'utmContent'>): Promise<{ success: boolean }> {
    const utms = getUtmParams();
    const finalPayload = {
      page: typeof window !== 'undefined' ? window.location.pathname : undefined,
      ...payload,
      ...utms,
    };
    return apiClient.post<{ success: boolean }>('/api/v1/internal/page-event', finalPayload);
  },
};
