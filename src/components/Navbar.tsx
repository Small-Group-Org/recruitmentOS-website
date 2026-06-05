'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar({ onPricingToggle }: { onPricingToggle?: () => void }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { name: 'Services', href: '/#services' },
        { name: 'Case Studies', href: '/case-studies' },
        { name: 'How it works', href: '/methodology' },
        { name: 'Pricing', href: '/pricing' },
        { name: 'Resources', href: '/resources' },
    ];

    return (
        <header className="w-full bg-white/90 backdrop-blur-md border-b border-[#E5E5E5] relative z-50">
            <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
                <nav className="flex items-center justify-between h-16">
                    <Link href="/" className="flex items-center font-bold text-2xl sm:text-3xl tracking-tight z-50">
                        <span className="text-[#0A0A0A]">Recruitment</span>
                        <span className="flex items-center text-orange-500 ml-1">
                            <span className="animate-[spin_4s_linear_infinite] inline-block leading-none">O</span>
                            <span>S</span>
                        </span>
                    </Link>

                    <div className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium text-neutral-500 hover:text-[#0A0A0A] transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className="hidden lg:flex items-center gap-2">
                        <Link
                            href="/tools"
                            className="inline-flex items-center px-5 py-2 rounded-full border border-[#0A0A0A] bg-transparent text-[#0A0A0A] text-sm font-medium hover:bg-neutral-100 transition-colors"
                        >
                            Free Tools
                        </Link>
                        <Link
                            href="https://cal.com/tusharm/30min?user=tusharm"
                            target="_blank"
                            className="inline-flex items-center px-5 py-2 rounded-full bg-[#0A0A0A] text-white text-sm font-medium hover:bg-neutral-800 transition-colors"
                        >
                            Book a Call
                        </Link>
                    </div>

                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="p-2.5 lg:hidden text-[#0A0A0A]"
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
                    <div className="lg:hidden pt-4 pb-2 space-y-3 border-t border-[#E5E5E5] mt-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="block text-sm font-medium text-[#6B7280] hover:text-[#0A0A0A] transition-colors py-1"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link
                            href="/tools"
                            className="block bg-transparent text-[#0A0A0A] border border-[#0A0A0A] px-5 py-2.5 rounded-full text-sm font-medium text-center mt-2"
                        >
                            Free Tools
                        </Link>
                        <Link
                            href="https://cal.com/tusharm/30min?user=tusharm"
                            target="_blank"
                            className="block bg-[#0A0A0A] text-white px-5 py-2.5 rounded-full text-sm font-medium text-center mt-2"
                        >
                            Book a Call
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
}
