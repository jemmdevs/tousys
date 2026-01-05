"use client";

import { useState, memo, useCallback } from "react";
import Image from "next/image";
import styles from "./UseCaseToolsList.module.css";

interface Tool {
    name: string;
    description: string;
    image: string;
}

interface UseCaseToolsListProps {
    tools: Tool[];
}

// Memoized tool item to prevent unnecessary re-renders
const ToolItem = memo(function ToolItem({ tool }: { tool: Tool }) {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = useCallback(() => setIsHovered(true), []);
    const handleMouseLeave = useCallback(() => setIsHovered(false), []);

    return (
        <div
            className={styles.toolItem}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Full-width background element */}
            <div className={styles.toolItemBg} aria-hidden="true" />

            <span className={styles.toolName}>{tool.name}</span>
            <p className={styles.toolDescription}>{tool.description}</p>
            <div className={`${styles.toolImageWrapper} ${isHovered ? styles.toolImageVisible : ''}`}>
                <Image
                    src={tool.image}
                    alt={tool.name}
                    width={320}
                    height={200}
                    className={styles.toolImage}
                    loading="lazy"
                    quality={75}
                    sizes="(max-width: 767px) 100vw, 320px"
                />
            </div>
        </div>
    );
});

export default function UseCaseToolsList({ tools }: UseCaseToolsListProps) {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                {tools.map((tool) => (
                    <ToolItem key={tool.name} tool={tool} />
                ))}
            </div>
        </section>
    );
}
