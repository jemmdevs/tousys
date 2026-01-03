"use client";

import { memo, useState, useEffect } from "react";
import Image from "next/image";
import styles from "./ProductBentoGrid.module.css";

// Bento items data - can be expanded later
const bentoItems = [
    {
        id: 1,
        title: "Agent Manager",
        description: "Manage multiple agents in parallel across workspaces",
        image: "/features/feature-agent-manager.png",
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

// Memoized Bento Card for performance
const BentoCard = memo(({
    item,
    shouldLoadImage
}: {
    item: typeof bentoItems[0];
    shouldLoadImage: boolean;
}) => {
    return (
        <article className={styles.card}>
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

    // Defer image loading until after hydration
    useEffect(() => {
        const timer = requestAnimationFrame(() => {
            setIsMounted(true);
        });
        return () => cancelAnimationFrame(timer);
    }, []);

    return (
        <section className={styles.section}>
            <div className={styles.grid}>
                {bentoItems.map((item) => (
                    <BentoCard
                        key={item.id}
                        item={item}
                        shouldLoadImage={isMounted}
                    />
                ))}
            </div>
        </section>
    );
}
