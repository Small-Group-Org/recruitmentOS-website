import type { Metadata } from "next";
import { Inter, DM_Serif_Display, DM_Mono, Outfit } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/Analytics";
import UTMTracker from "@/components/UTMTracker";
import SiteHeader from "@/components/SiteHeader";
import ConsultationPopup from "@/components/ConsultationPopup";
import JsonLd, { organizationSchema } from "@/components/JsonLd";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter', display: 'swap' });
const dmSerif = DM_Serif_Display({ weight: '400', subsets: ["latin"], variable: '--font-serif', display: 'swap' });
const dmMono = DM_Mono({ weight: '400', subsets: ["latin"], variable: '--font-mono', display: 'swap' });
const outfit = Outfit({ subsets: ["latin"], variable: '--font-outfit', display: 'swap' });

export const metadata: Metadata = {
    metadataBase: new URL("https://recruitmentos.smallgrp.com"),
    title: {
        default: "RecruitmentOS — Done-For-You BD for Recruitment Agencies ($500K–$5M)",
        template: "%s — RecruitmentOS",
    },
    description: "We replace your BD function — sourcing, enrichment, outreach, reply handling on your stack. 100 hiring-manager contacts + 10 replies in 60 days or we work free.",
    keywords: [
        "done-for-you BD recruitment agency",
        "recruitment agency business development",
        "outsource recruitment BD",
        "recruitment agency lead generation",
        "BD as a service for recruiters",
    ],
    authors: [{ name: "Tushar Mangla" }],
    icons: {
        icon: "/favicon.svg",
    },
    alternates: {
        canonical: "/",
    },
    openGraph: {
        title: "RecruitmentOS — Done-For-You BD for Recruitment Agencies",
        description: "We replace your BD function. You stop being the bottleneck. 100 hiring-manager contacts + 10 verified replies in 60 days or we work free.",
        url: "https://recruitmentos.smallgrp.com",
        siteName: "RecruitmentOS",
        type: "website",
        locale: "en_US",
    },
    twitter: {
        card: "summary_large_image",
        title: "RecruitmentOS — Done-For-You BD for Recruitment Agencies",
        description: "We replace your BD function. You stop being the bottleneck.",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body suppressHydrationWarning className={`${inter.variable} ${dmSerif.variable} ${dmMono.variable} ${outfit.variable} antialiased font-sans`}>
                <JsonLd data={organizationSchema} />
                <SiteHeader />
                <Analytics />
                <UTMTracker />
                <ConsultationPopup />
                {children}
            </body>
        </html>
    );
}
