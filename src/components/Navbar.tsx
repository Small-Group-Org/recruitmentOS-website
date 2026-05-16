'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar({ onPricingToggle }: { onPricingToggle?: () => void }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { name: 'Case Studies', href: '/case-studies' },
        { name: 'Services', href: '/#services' },
        // { name: 'Pricing', href: '/pricing' },
        { name: 'Tools', href: '/tools' },
        { name: 'Resources', href: '/resources' },
    ];

    return (
        <header className="bg-white/90 backdrop-blur-md border-b border-[#e5e5e5] w-full">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-4">
                <nav className="flex items-center justify-between">
                    <Link href="/" className="flex items-center font-bold text-2xl sm:text-3xl tracking-tight">
                        <span className="text-[#0A0A0A]">Recruitment</span>
                        <span className="flex items-center text-orange-500 ml-2">
                            <span className="animate-[spin_4s_linear_infinite] inline-block leading-none">O</span>
                            <span>S</span>
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-base font-medium text-[#111827] hover:text-[#0A0A0A] transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            href="https://cal.com/tusharm/30min?user=tusharm"
                            target="_blank"
                            className="bg-[#0A0A0A] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#1a1a1a] transition-colors"
                        >
                            Book a Demo
                        </Link>
                    </div>

                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="p-2.5 md:hidden text-[#0A0A0A]"
                        aria-label="Toggle menu"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            {isMenuOpen ? (
                                <>
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </>
                            ) : (
                                <>
                                    <line x1="4" y1="8" x2="20" y2="8" />
                                    <line x1="4" y1="16" x2="20" y2="16" />
                                </>
                            )}
                        </svg>
                    </button>
                </nav>

                {isMenuOpen && (
                    <div className="md:hidden pt-4 pb-2 space-y-3 border-t border-[#e5e5e5] mt-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="block text-sm font-medium text-[#6b7280] hover:text-[#0A0A0A] transition-colors py-1"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            href="https://cal.com/tusharm/30min?user=tusharm"
                            target="_blank"
                            className="block bg-[#0A0A0A] text-white px-5 py-2.5 rounded-lg text-sm font-medium text-center mt-2"
                        >
                            Book a Demo
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
}
