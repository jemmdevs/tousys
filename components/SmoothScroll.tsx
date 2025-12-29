"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { ReactNode, useEffect } from "react";
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
