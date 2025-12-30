"use client";

import { memo, useEffect, useRef, useState, useCallback } from "react";
import styles from "./MultiOrganismVisual.module.css";

interface MultiOrganismVisualProps {
    isHovered?: boolean;
}

const ORGANISMS = ["E. coli", "Yeast", "Human"] as const;
const TYPING_SPEED = 100;
const DELETING_SPEED = 50;
const PAUSE_DURATION = 1000;

function MultiOrganismVisual({ isHovered = false }: MultiOrganismVisualProps) {
    const [text, setText] = useState("Human");
    const [organismIndex, setOrganismIndex] = useState(2);
    const [isDeleting, setIsDeleting] = useState(false);
    const [animationStarted, setAnimationStarted] = useState(false);

    // Track if we're transitioning out (completing animation to Human)
    const [isTransitioningOut, setIsTransitioningOut] = useState(false);

    // Use ref for timer to ensure proper cleanup
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const pauseTimerRef = useRef<NodeJS.Timeout | null>(null);

    // Cleanup function
    const clearTimers = useCallback(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
        if (pauseTimerRef.current) {
            clearTimeout(pauseTimerRef.current);
            pauseTimerRef.current = null;
        }
    }, []);

    // Handle hover state changes
    useEffect(() => {
        if (!isHovered && animationStarted) {
            // Start transitioning out - will complete to "Human"
            clearTimers();
            setIsTransitioningOut(true);
            setIsDeleting(true);
        } else if (isHovered && !animationStarted) {
            // Start animation when hovering
            setAnimationStarted(true);
            setIsDeleting(true);
        }
    }, [isHovered, animationStarted, clearTimers]);

    // Animation effect
    useEffect(() => {
        // Continue animation if hovered OR if transitioning out
        if (!animationStarted && !isTransitioningOut) return;
        if (!isHovered && !isTransitioningOut) return;

        const currentOrganism = ORGANISMS[organismIndex];

        // If transitioning out and we've reached "Human", stop
        if (isTransitioningOut && text === "Human" && !isDeleting) {
            setIsTransitioningOut(false);
            setAnimationStarted(false);
            return;
        }

        if (isDeleting) {
            timerRef.current = setTimeout(() => {
                setText(prev => {
                    const newText = prev.slice(0, -1);
                    if (newText === "") {
                        setIsDeleting(false);
                        // If transitioning out, go directly to Human (index 2)
                        if (isTransitioningOut) {
                            setOrganismIndex(2);
                        } else {
                            setOrganismIndex(idx => (idx + 1) % ORGANISMS.length);
                        }
                    }
                    return newText;
                });
            }, DELETING_SPEED);
        } else {
            timerRef.current = setTimeout(() => {
                const nextChar = currentOrganism.slice(0, text.length + 1);
                setText(nextChar);

                if (nextChar === currentOrganism) {
                    // If transitioning out and reached Human, don't continue
                    if (isTransitioningOut && organismIndex === 2) {
                        return;
                    }
                    pauseTimerRef.current = setTimeout(() => {
                        setIsDeleting(true);
                    }, PAUSE_DURATION);
                }
            }, TYPING_SPEED);
        }

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [text, isDeleting, organismIndex, isHovered, animationStarted, isTransitioningOut]);

    return (
        <div className={`${styles.container} ${isHovered ? styles.hovered : ""}`}>
            <div className={styles.optimizeBadge}>
                <span className={styles.staticText}>Optimize: </span>
                <span className={styles.dynamicText}>
                    {text}
                    {isHovered && <span className={styles.cursor} />}
                </span>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src="/multiorganism.svg?v=6"
                alt=""
                className={styles.svg}
                aria-hidden="true"
                loading="lazy"
            />
        </div>
    );
}

// Memoize component to prevent unnecessary re-renders
export default memo(MultiOrganismVisual);
