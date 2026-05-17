export const SITE_URL = 'https://recruitmentos.smallgrp.com';
export const SITE_NAME = 'RecruitmentOS';

/** Build a clean canonical URL. Strips trailing slash except for root. */
export function buildCanonical(path: string): string {
    const clean = path === '/' ? '/' : path.replace(/\/$/, '');
    return `${SITE_URL}${clean}`;
}

export const DEFAULT_OG_DESCRIPTION = 'Done-for-you BD for established recruitment agencies billing $500K–$5M annually.';
