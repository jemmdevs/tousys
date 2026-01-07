"use client";

import { useState, useRef, useEffect, useCallback, memo, useMemo } from "react";
import styles from "./VideoShowcaseSection.module.css";

// Tab data - defined outside component to avoid recreation
const TABS = [
    { id: 0, label: "Table Editor", video: "/video1.webm" },
    { id: 1, label: "SQL Editor", video: "/video2.webm" },
    { id: 2, label: "RLS Policies", video: "/video3.webm" },
] as const;

// Features list - defined outside to avoid recreation
const FEATURES = [
    "Full CRUD",
    "Materialized Views",
    "Foreign Tables",
    "Partitioned Tables",
    "Easy as a spreadsheet",
] as const;

// Memoized Checkmark SVG component to prevent re-renders
const CheckIcon = memo(function CheckIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <polyline points="20 6 9 17 4 12" />
        </svg>
    );
});

// Memoized Tab Button component
const TabButton = memo(function TabButton({
    label,
    isActive,
    onClick,
}: {
    label: string;
    isActive: boolean;
    onClick: () => void;
}) {
    return (
        <button
            className={`${styles.tabButton} ${isActive ? styles.tabButtonActive : ""}`}
            onClick={onClick}
            aria-pressed={isActive}
            type="button"
        >
            {label}
        </button>
    );
});

// Memoized Feature Item component
const FeatureItem = memo(function FeatureItem({ feature }: { feature: string }) {
    return (
        <li className={styles.featureItem}>
            <CheckIcon className={styles.checkIcon} />
            <span>{feature}</span>
        </li>
    );
});

export default function VideoShowcaseSection() {
    const [activeTab, setActiveTab] = useState(0);
    const [hasLoaded, setHasLoaded] = useState(false); // Only for initial load
    const sectionRef = useRef<HTMLElement>(null);
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
    const isVisibleRef = useRef(false); // Use ref to avoid re-renders
    const activeTabRef = useRef(0); // Track active tab without causing re-renders

    // Keep activeTabRef in sync
    useEffect(() => {
        activeTabRef.current = activeTab;
    }, [activeTab]);

    // Intersection Observer - ONLY for initial load, no state updates during scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                const visible = entry.isIntersecting;

                // Only update hasLoaded once (for initial load) - with delay to not interrupt scroll
                if (visible && !hasLoaded) {
                    // Small delay to let scroll settle before loading videos
                    setTimeout(() => {
                        setHasLoaded(true);
                    }, 150);
                }

                // Track visibility in ref (no re-render)
                isVisibleRef.current = visible;

                // Defer video operations to not block scroll
                requestAnimationFrame(() => {
                    if (!visible) {
                        // Pause videos when out of view
                        videoRefs.current.forEach((video) => {
                            if (video && !video.paused) {
                                video.pause();
                            }
                        });
                    } else {
                        // Resume active video when back in view
                        const activeVideo = videoRefs.current[activeTabRef.current];
                        if (activeVideo && activeVideo.paused) {
                            // Use setTimeout to defer play to next frame
                            setTimeout(() => {
                                activeVideo.play().catch(() => { });
                            }, 0);
                        }
                    }
                });
            },
            { threshold: 0.05, rootMargin: "0px" } // Lower threshold, no margin
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, [hasLoaded]); // Only depend on hasLoaded, not activeTab

    // Handle tab change - play/pause videos (memoized)
    const handleTabChange = useCallback((tabId: number) => {
        setActiveTab(tabId);

        // Use requestAnimationFrame to not block UI
        requestAnimationFrame(() => {
            videoRefs.current.forEach((video, index) => {
                if (video) {
                    if (index === tabId) {
                        video.currentTime = 0;
                        video.play().catch(() => { });
                    } else {
                        video.pause();
                    }
                }
            });
        });
    }, []);

    // Memoized tab click handlers to prevent recreation
    const tabClickHandlers = useMemo(
        () => TABS.map((tab) => () => handleTabChange(tab.id)),
        [handleTabChange]
    );

    // Load and play videos when hasLoaded becomes true
    useEffect(() => {
        if (hasLoaded) {
            // Small delay to ensure src has been applied to DOM
            requestAnimationFrame(() => {
                videoRefs.current.forEach((video, index) => {
                    if (video) {
                        // Load the video first (needed with preload=none)
                        video.load();

                        // Play only the active video
                        if (index === activeTabRef.current && isVisibleRef.current) {
                            video.play().catch(() => { });
                        }
                    }
                });
            });
        }
    }, [hasLoaded]);

    return (
        <section ref={sectionRef} className={styles.section}>
            {/* Header */}
            <header className={styles.header}>
                <h2 className={styles.title}>Stay productive and manage your app</h2>
                <p className={styles.subtitle}>without leaving the dashboard</p>
            </header>

            {/* Tab Buttons - using memoized components */}
            <div className={styles.tabsContainer} role="tablist">
                {TABS.map((tab, index) => (
                    <TabButton
                        key={tab.id}
                        label={tab.label}
                        isActive={activeTab === tab.id}
                        onClick={tabClickHandlers[index]}
                    />
                ))}
            </div>

            {/* Features List - using memoized components */}
            <ul className={styles.featuresList}>
                {FEATURES.map((feature) => (
                    <FeatureItem key={feature} feature={feature} />
                ))}
            </ul>

            {/* Video Container - Mockup Window */}
            <div className={styles.videoContainer}>
                {/* macOS-style window header */}
                <div className={styles.windowHeader} aria-hidden="true">
                    <span className={`${styles.windowDot} ${styles.windowDotRed}`} />
                    <span className={`${styles.windowDot} ${styles.windowDotYellow}`} />
                    <span className={`${styles.windowDot} ${styles.windowDotGreen}`} />
                </div>

                {/* Video Wrapper - Videos always mounted, hidden via CSS */}
                <div className={styles.videoWrapper} role="tabpanel">
                    {TABS.map((tab, index) => (
                        <video
                            key={tab.id}
                            ref={(el) => {
                                videoRefs.current[index] = el;
                            }}
                            className={`${styles.video} ${activeTab === index ? styles.videoActive : ""}`}
                            src={hasLoaded ? tab.video : undefined}
                            muted
                            loop
                            playsInline
                            preload="none"
                            poster="/video-poster.svg"
                            aria-hidden={activeTab !== index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
