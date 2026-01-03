"use client";

import { memo, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import styles from "./ProductBentoGrid.module.css";

// Tools data
// modalTitle and modalDescription are optional - if not set, uses title/description
const tools = [
    {
        id: 1,
        title: "Agent Manager",
        description: "Manage multiple agents in parallel across workspaces",
        image: "/features/feature-agent-manager.png",
        // modalTitle: "Custom Modal Title",
        // modalDescription: "Custom modal description here",
    },
    {
        id: 2,
        title: "Codon Optimizer",
        description: "AI-powered optimization for protein expression",
        image: "/features/feature-codon-optimizer.png",
    },
    {
        id: 3,
        title: "Neural Processing",
        description: "Advanced brain-inspired computing",
        image: "/features/brain.avif",
    },
    {
        id: 4,
        title: "Notion Integration",
        description: "Seamless workflow management",
        image: "/features/notion.avif",
    },
    {
        id: 5,
        title: "AI Platform",
        description: "Next-generation intelligence",
        image: "/features/aiga-square.avif",
    },
];

type Tool = {
    id: number;
    title: string;
    description: string;
    image: string;
    modalTitle?: string;
    modalDescription?: string;
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

    if (!tool) return null;

    return (
        <div className={styles.modalOverlay} onClick={onClose} data-lenis-prevent>
            {/* Contenedor1 - Full height panel */}
            <div className={styles.modalPanel} onClick={(e) => e.stopPropagation()}>
                {/* Contenedor2 - Image container */}
                <div className={styles.modalImageContainer}>
                    <button className={styles.closeButton} onClick={onClose} aria-label="Close">
                        <CloseIcon />
                    </button>
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
                    <h2 className={styles.modalTitle}>{tool.modalTitle || tool.title}</h2>
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
