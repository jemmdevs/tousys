"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface SmoothScrollProps {
    children: ReactNode;
}

// Component to handle scroll reset on route change
function ScrollReset() {
    const lenis = useLenis();
    const pathname = usePathname();

    useEffect(() => {
        // Reset scroll to top when pathname changes
        if (lenis) {
            lenis.scrollTo(0, { immediate: true });
        }
    }, [pathname, lenis]);

    return null;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Check if device is mobile/touch
        const checkMobile = () => {
            const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
            const isSmallScreen = window.innerWidth < 768;
            setIsMobile(isTouchDevice && isSmallScreen);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // On mobile, use native scroll (no Lenis)
    if (isMobile) {
        return <>{children}</>;
    }

    // On desktop, use Lenis smooth scroll
    return (
        <ReactLenis
            root
            options={{
                lerp: 0.1,
                duration: 1.5,
            }}
        >
            <ScrollReset />
            {children}
        </ReactLenis>
    );
}
