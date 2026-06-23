'use client';

import Navbar from './Navbar';

export default function SiteHeader() {
    return (
        <div className="sticky top-0 z-[100] w-full">
            {/* AnnouncementBanner hidden */}
            <Navbar />
        </div>
    );
}

