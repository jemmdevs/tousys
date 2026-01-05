"use client";

import { useRef, useEffect, useCallback, memo } from "react";
import styles from "./UseCaseScenarios.module.css";

interface Scenario {
    quote: string;
}

interface UseCaseScenariosProps {
    scenarios: Scenario[];
}

// Memoized scenario item
const ScenarioItem = memo(function ScenarioItem({ quote }: { quote: string }) {
    return (
        <div className={styles.scenarioItem}>
            <blockquote className={styles.quote}>
                <span className={styles.quoteOpen}>"</span>
                {quote}
                <span className={styles.quoteClose}>"</span>
            </blockquote>
        </div>
    );
});

export default function UseCaseScenarios({ scenarios }: UseCaseScenariosProps) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const rafRef = useRef<number | null>(null);
    const lastProgressRef = useRef<number>(0);

    const handleScroll = useCallback(() => {
        const section = sectionRef.current;
        const track = trackRef.current;
        if (!section || !track) return;

        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top;
        const sectionHeight = section.offsetHeight;
        const windowHeight = window.innerHeight;

        const scrollableDistance = sectionHeight - windowHeight;

        if (scrollableDistance <= 0) return;

        const scrolled = -sectionTop;
        const progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));

        // Only update if progress changed significantly (avoid unnecessary paints)
        if (Math.abs(progress - lastProgressRef.current) > 0.001) {
            lastProgressRef.current = progress;
            const maxScrollLeft = track.scrollWidth - track.clientWidth;
            track.scrollLeft = progress * maxScrollLeft;
        }
    }, []);

    useEffect(() => {
        const onScroll = () => {
            // Cancel any pending RAF to avoid stacking
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
            rafRef.current = requestAnimationFrame(handleScroll);
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        handleScroll(); // Initial call

        return () => {
            window.removeEventListener('scroll', onScroll);
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, [handleScroll]);

    return (
        <div ref={sectionRef} className={styles.stickyWrapper}>
            <div className={styles.stickyContainer}>
                <div className={styles.fadeLeft} aria-hidden="true" />
                <div className={styles.fadeRight} aria-hidden="true" />

                <div ref={trackRef} className={styles.scrollContainer}>
                    <div className={styles.scenariosTrack}>
                        {/* Spacer at start */}
                        <div className={styles.spacer} aria-hidden="true" />

                        {scenarios.map((scenario, index) => (
                            <ScenarioItem key={index} quote={scenario.quote} />
                        ))}

                        {/* Spacer at end */}
                        <div className={styles.spacer} aria-hidden="true" />
                    </div>
                </div>
            </div>
        </div>
    );
}
