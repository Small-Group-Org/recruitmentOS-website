import type { Metadata } from "next";
import { Inter, DM_Serif_Display, DM_Mono, Outfit } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/Analytics";
import UTMTracker from "@/components/UTMTracker";
import SiteHeader from "@/components/SiteHeader";
import ConsultationPopup from "@/components/ConsultationPopup";
import WhatsAppButton from "@/components/WhatsAppButton";
import { JsonLd } from "@/components/JsonLd";
import { organizationSchema } from "@/lib/schemas";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter', display: 'swap' });
const dmSerif = DM_Serif_Display({ weight: '400', subsets: ["latin"], variable: '--font-serif', display: 'swap' });
const dmMono = DM_Mono({ weight: '400', subsets: ["latin"], variable: '--font-mono', display: 'swap' });
const outfit = Outfit({ subsets: ["latin"], variable: '--font-outfit', display: 'swap' });

export const metadata: Metadata = {
    metadataBase: new URL("https://recruitmentos.smallgrp.com"),
    title: "RecruitmentOS — Done-For-You BD for Recruitment Agencies",
    description: "We replace your BD function — sourcing, enrichment, outreach, reply handling on your stack. 100 hiring-manager contacts in 60 days or we work free.",
    icons: {
        icon: "/favicon.svg",
    },
    openGraph: {
        title: "RecruitmentOS — Done-For-You BD for Recruitment Agencies",
        description: "We replace your BD function — sourcing, enrichment, outreach, reply handling on your stack. 100 hiring-manager contacts in 60 days or we work free.",
        type: "website",
        siteName: "RecruitmentOS",
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
                <WhatsAppButton />
            </body>
        </html>
    );
}
