import { apiClient } from './apiClient';

export interface CreateLeadPayload {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  source:
    | 'tools_gate'
    | 'consultation_popup'
    | 'contact_form'
    | 'fit_call'
    | 'free_leads_campaign'
    | 'pricing_page'
    | 'resource_ai_recruiter_team'
    | 'resource_recruitment_skills'
    | 'resource_ai_hiring_blueprint'
    | 'resource_ai_systems_template'
    | 'resource_ai_audit'
    | 'tool_cold_email_writer'
    | 'tool_volume_gap_calculator'
    | 'tool_general_roi'
    | 'tool_bd_scorecard';
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  headaches?: string[];
  message?: string;
}

export interface LeadResponse {
  id: string;
  name: string;
  email: string;
  company: string | null;
  phone: string | null;
  source: string;
  status: string;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
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

export const leadService = {
  async createLead(payload: Omit<CreateLeadPayload, 'utmSource' | 'utmMedium' | 'utmCampaign' | 'utmContent'>): Promise<LeadResponse> {
    const utms = getUtmParams();
    const finalPayload = {
      ...payload,
      ...utms,
    };
    return apiClient.post<LeadResponse>('/api/v1/leads', finalPayload);
  },
};
