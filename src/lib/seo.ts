export const SITE_URL = 'https://www.hirerecruitmentos.com';
export const SITE_NAME = 'RecruitmentOS';
export const CONTACT_EMAIL = 'tushar.mangla1120@gmail.com';
export const CONTACT_MAILTO = 'mailto:tushar.mangla1120@gmail.com';

/** Build a clean canonical URL. Strips trailing slash except for root. */
export function buildCanonical(path: string): string {
    const clean = path === '/' ? '/' : path.replace(/\/$/, '');
    return `${SITE_URL}${clean}`;
}

export const DEFAULT_OG_DESCRIPTION = 'Done-for-you BD for established recruitment agencies.';
