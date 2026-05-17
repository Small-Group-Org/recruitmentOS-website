export type SocialIconName = 'linkedin' | 'instagram' | 'whatsapp';

export type SocialLink = {
    name: string;
    url: string;
    ariaLabel: string;
    icon: SocialIconName;
};

export const socialLinks: SocialLink[] = [
    {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/company/recruitmentos/',
        ariaLabel: 'RecruitmentOS on LinkedIn',
        icon: 'linkedin',
    },
    {
        name: 'Instagram',
        url: 'https://www.instagram.com/recruitmentos/',
        ariaLabel: 'RecruitmentOS on Instagram',
        icon: 'instagram',
    },
    {
        name: 'WhatsApp community',
        url: 'https://chat.whatsapp.com/I9PLSmDMJ06B6qYYVsRb0q?mode=gi_t',
        ariaLabel: 'Join the RecruitmentOS WhatsApp community',
        icon: 'whatsapp',
    },
];
