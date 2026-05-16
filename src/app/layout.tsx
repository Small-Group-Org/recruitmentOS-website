import type { Metadata } from "next";
import { Inter, DM_Serif_Display, DM_Mono, Outfit } from "next/font/google";
import "./globals.css";
import Analytics from "@/components/Analytics";
import UTMTracker from "@/components/UTMTracker";
import SiteHeader from "@/components/SiteHeader";
import ConsultationPopup from "@/components/ConsultationPopup";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter', display: 'swap' });
const dmSerif = DM_Serif_Display({ weight: '400', subsets: ["latin"], variable: '--font-serif', display: 'swap' });
const dmMono = DM_Mono({ weight: '400', subsets: ["latin"], variable: '--font-mono', display: 'swap' });
const outfit = Outfit({ subsets: ["latin"], variable: '--font-outfit', display: 'swap' });

export const metadata: Metadata = {
    metadataBase: new URL("https://recruitmentos.smallgrp.com"),
    title: "RecruitmentOS - The Automated Lead Engine for Recruiting Agencies",
    description: "The only Recruiting agency lead generation platform that guarantees quality with a 6%+ reply rate.",
    icons: {
        icon: "/favicon.svg",
    },
    openGraph: {
        title: "RecruitmentOS - The Automated Lead Engine for Recruiting Agencies",
        description: "The only Recruiting agency lead generation platform that guarantees quality with a 6%+ reply rate.",
        type: "website",
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
                <SiteHeader />
                <Analytics />
                <UTMTracker />
                <ConsultationPopup />
                {children}
            </body>
        </html>
    );
}
