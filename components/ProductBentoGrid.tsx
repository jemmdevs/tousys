"use client";

import { memo, useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import styles from "./ProductBentoGrid.module.css";

// Tools data
// modalTitle and modalDescription are optional - if not set, uses title/description
const tools = [
    {
        id: 1,
        title: "Optimization Report",
        description: "Generate lab-ready optimization reports.",
        image: "/features/reportOptimization.avif",
        isNew: true,
        date: "Jan 2026",
    },
    {
        id: 2,
        title: "DAIS Analysis",
        description: "DNA analysis and scoring system",
        image: "/features/daisAnalysis_converted.avif",
    },
    {
        id: 3,
        title: "3D Structure",
        description: "Advanced molecular visualization",
        image: "/features/3dStructure_converted.avif",
    },
    {
        id: 4,
        title: "Codon Optimizer",
        description: "AI-powered optimization for protein expression",
        image: "/features/codonOptimization_converted.avif",
    },
    {
        id: 5,
        title: "In-Canvas Tools",
        description: "Powerful editing tools at your fingertips",
        image: "/features/inCanvasTools_converted.avif",
        isNew: true,
        date: "Dec 2025",
    },
    {
        id: 6,
        title: "Mutation Comparator",
        description: "Compare and analyze genetic mutations",
        image: "/features/mutationComparator_converted.avif",
    },
    {
        id: 7,
        title: "AI Kinetic Peak Analysis",
        description: "Detect and resolve translational bottlenecks.",
        image: "/features/kineticChart_converted.avif",
    },
    {
        id: 8,
        title: "AI Peak Analysis",
        description: "Intelligent peak detection and analysis",
        image: "/features/aiPeakAnalysis_converted.avif",
    },
    {
        id: 9,
        title: "Dark Mode",
        description: "Enhanced visual experience for extended sessions",
        image: "/features/darkMode_converted.avif",
        date: "Nov 2025",
    },
];

type Tool = {
    id: number;
    title: string;
    description: string;
    image: string;
    modalTitle?: string;
    modalDescription?: string;
    isNew?: boolean;
    date?: string;
};

// Close Icon
const CloseIcon = memo(() => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
));
CloseIcon.displayName = "CloseIcon";

// Modal Component
const ToolModal = memo(({
    tool,
    onClose
}: {
    tool: Tool | null;
    onClose: () => void;
}) => {
    const panelRef = useRef<HTMLDivElement>(null);
    const [dragY, setDragY] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const startY = useRef(0);

    // Close on Escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (tool) {
            document.addEventListener("keydown", handleEscape);
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "";
        };
    }, [tool, onClose]);

    // Touch handlers for swipe-to-close (iOS-like)
    const handleTouchStart = useCallback((e: React.TouchEvent) => {
        startY.current = e.touches[0].clientY;
        setIsDragging(true);
    }, []);

    const handleTouchMove = useCallback((e: React.TouchEvent) => {
        if (!isDragging) return;
        const currentY = e.touches[0].clientY;
        const diff = currentY - startY.current;
        // Only allow dragging down, with rubber-band resistance
        if (diff > 0) {
            // iOS-like rubber-band: diminishing returns as you drag further
            const resistance = 0.5;
            const rubberBandDrag = diff * resistance;
            setDragY(rubberBandDrag);
        }
    }, [isDragging]);

    const handleTouchEnd = useCallback((e: React.TouchEvent) => {
        setIsDragging(false);
        // Calculate velocity for snap decision
        const threshold = 50; // Lower threshold since we have rubber-banding
        if (dragY > threshold) {
            onClose();
        }
        setDragY(0);
    }, [dragY, onClose]);

    if (!tool) return null;

    // iOS-like spring animation
    const panelStyle = {
        transform: dragY > 0 ? `translateY(${dragY}px) scale(${1 - dragY / 1000})` : undefined,
        transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.32, 0.72, 0, 1), border-radius 0.3s ease',
        opacity: dragY > 0 ? 1 - (dragY / 200) : 1,
        willChange: isDragging ? 'transform, opacity' : 'auto' as const,
        borderRadius: dragY > 0 ? '20px' : '0px'
    };

    return (
        <div className={styles.modalOverlay} onClick={onClose} data-lenis-prevent>
            {/* Contenedor1 - Full height panel */}
            <div
                ref={panelRef}
                className={styles.modalPanel}
                onClick={(e) => e.stopPropagation()}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={panelStyle}
            >
                {/* Drag indicator for mobile */}
                <div className={styles.dragIndicator} />

                {/* Contenedor2 - Image container */}
                <div className={styles.modalImageContainer}>
                    <div className={styles.modalImageInner}>
                        <Image
                            src={tool.image}
                            alt={tool.title}
                            width={800}
                            height={600}
                            className={styles.modalImage}
                            quality={90}
                        />
                    </div>
                </div>

                {/* Title & Description - Outside contenedor2, inside contenedor1 */}
                <div className={styles.modalInfo}>
                    <button className={styles.closeButton} onClick={onClose} aria-label="Close">
                        <CloseIcon />
                    </button>
                    <div className={styles.modalHeader}>
                        <h2 className={styles.modalTitle}>{tool.modalTitle || tool.title}</h2>
                        {tool.date && <span className={styles.modalDate}>{tool.date}</span>}
                    </div>
                    {tool.isNew && <span className={styles.modalBadge}>NEW</span>}
                    <div className={styles.modalDivider}></div>
                    <p className={styles.modalDescription}>{tool.modalDescription || tool.description}</p>
                </div>
            </div>
        </div>
    );
});
ToolModal.displayName = "ToolModal";

// Bento Card Component
const BentoCard = memo(({
    item,
    shouldLoadImage,
    onSelect
}: {
    item: Tool;
    shouldLoadImage: boolean;
    onSelect: (tool: Tool) => void;
}) => {
    const handleClick = useCallback(() => {
        onSelect(item);
    }, [onSelect, item]);

    return (
        <article className={styles.card} onClick={handleClick}>
            <div className={styles.imageWrapper}>
                {shouldLoadImage && (
                    <Image
                        src={item.image}
                        alt={item.title}
                        width={800}
                        height={600}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className={styles.image}
                        loading="lazy"
                        quality={80}
                    />
                )}
            </div>
            <div className={styles.content}>
                <h3 className={styles.title}>{item.title}</h3>
                <p className={styles.description}>{item.description}</p>
            </div>
        </article>
    );
});
BentoCard.displayName = "BentoCard";

export default function ProductBentoGrid() {
    const [isMounted, setIsMounted] = useState(false);
    const [selectedTool, setSelectedTool] = useState<Tool | null>(null);

    // Defer image loading until after hydration
    useEffect(() => {
        const timer = requestAnimationFrame(() => {
            setIsMounted(true);
        });
        return () => cancelAnimationFrame(timer);
    }, []);

    const handleCardClick = useCallback((tool: Tool) => {
        setSelectedTool(tool);
    }, []);

    const handleCloseModal = useCallback(() => {
        setSelectedTool(null);
    }, []);

    return (
        <>
            <section className={styles.section}>
                <div className={styles.grid}>
                    {tools.map((item) => (
                        <BentoCard
                            key={item.id}
                            item={item}
                            shouldLoadImage={isMounted}
                            onSelect={handleCardClick}
                        />
                    ))}
                </div>
            </section>

            <ToolModal tool={selectedTool} onClose={handleCloseModal} />
        </>
    );
}
