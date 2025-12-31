"use client";

import { memo, useState, useEffect, useRef, useCallback } from "react";
import styles from "./CloudStorageVisual.module.css";

interface CloudStorageVisualProps {
    isHovered?: boolean;
}

const WORDS = ["Analysis", "Save", "Load"] as const;
const TYPING_SPEED = 80;
const DELETING_SPEED = 50;
const PAUSE_DURATION = 1200;

function CloudStorageVisual({ isHovered = false }: CloudStorageVisualProps) {
    const [text, setText] = useState("Analysis");
    const [wordIndex, setWordIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [animationStarted, setAnimationStarted] = useState(false);
    const [isTransitioningOut, setIsTransitioningOut] = useState(false);

    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const pauseTimerRef = useRef<NodeJS.Timeout | null>(null);

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
            clearTimers();
            setIsTransitioningOut(true);
            setIsDeleting(true);
        } else if (isHovered && !animationStarted) {
            setAnimationStarted(true);
            setIsDeleting(true);
        }
    }, [isHovered, animationStarted, clearTimers]);

    // Animation effect
    useEffect(() => {
        if (!animationStarted && !isTransitioningOut) return;
        if (!isHovered && !isTransitioningOut) return;

        const currentWord = WORDS[wordIndex];

        // If transitioning out and we've reached "Analysis", stop
        if (isTransitioningOut && text === "Analysis" && !isDeleting) {
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
                        if (isTransitioningOut) {
                            setWordIndex(0); // Go back to "Analysis"
                        } else {
                            setWordIndex(idx => (idx + 1) % WORDS.length);
                        }
                    }
                    return newText;
                });
            }, DELETING_SPEED);
        } else {
            timerRef.current = setTimeout(() => {
                const nextChar = currentWord.slice(0, text.length + 1);
                setText(nextChar);

                if (nextChar === currentWord) {
                    if (isTransitioningOut && wordIndex === 0) {
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
    }, [text, isDeleting, wordIndex, isHovered, animationStarted, isTransitioningOut]);

    return (
        <div className={`${styles.container} ${isHovered ? styles.hovered : ""}`}>
            <div className={styles.stack}>
                {/* Carpeta trasera */}
                <div className={`${styles.folder} ${styles.folderBack}`}>
                    <div className={styles.folderTab}></div>
                    <div className={styles.folderBody}>
                        <span className={styles.folderLabel}>Projects</span>
                    </div>
                </div>

                {/* Carpeta media */}
                <div className={`${styles.folder} ${styles.folderMiddle}`}>
                    <div className={styles.folderTab}></div>
                    <div className={styles.folderBody}>
                        <span className={styles.folderLabel}>Sequences</span>
                    </div>
                </div>

                {/* Carpeta frontal - con texto dinámico */}
                <div className={`${styles.folder} ${styles.folderFront}`}>
                    <div className={styles.folderTab}></div>
                    <div className={styles.folderBody}>
                        <span className={styles.folderLabelDynamic}>
                            {text}
                            {isHovered && <span className={styles.cursor} />}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(CloudStorageVisual);
