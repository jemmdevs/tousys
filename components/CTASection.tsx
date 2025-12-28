"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useAnimationControls } from "framer-motion";
import CardNeuralNoise from "./CardNeuralNoise";
import styles from "./CTASection.module.css";

const ctaText = "Access Al-Awal for Intelligent Genomics";

export default function CTASection() {
    const [displayedText, setDisplayedText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);
    const [hasExpanded, setHasExpanded] = useState(false);
    const [showCursor, setShowCursor] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    const controls = useAnimationControls();

    // Trigger expand animation once when section comes into view
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasAnimated) {
                        // Start typing
                        setIsTyping(true);
                        setHasAnimated(true);
                        setShowCursor(true);
                    }
                    if (entry.isIntersecting && !hasExpanded) {
                        // Trigger expand animation only once
                        setHasExpanded(true);
                        controls.start({
                            marginLeft: "0.5rem",
                            marginRight: "0.5rem",
                            borderRadius: "24px",
                            transition: {
                                duration: 0.8,
                                ease: [0.25, 0.1, 0.25, 1]
                            }
                        });
                    }
                });
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, [hasAnimated, hasExpanded, controls]);

    // Typing animation - slower speed
    useEffect(() => {
        if (!isTyping) return;

        let currentIndex = 0;
        const typingInterval = setInterval(() => {
            if (currentIndex < ctaText.length) {
                setDisplayedText(ctaText.slice(0, currentIndex + 1));
                currentIndex++;
            } else {
                setIsTyping(false);
                clearInterval(typingInterval);
            }
        }, 45); // Slower typing speed

        return () => clearInterval(typingInterval);
    }, [isTyping]);

    return (
        <section ref={sectionRef} className={styles.wrapper}>
            <motion.div
                className={styles.section}
                initial={{
                    marginLeft: "6rem",
                    marginRight: "6rem",
                    borderRadius: "32px"
                }}
                animate={controls}
            >
                {/* Neural noise background */}
                <CardNeuralNoise color="cyan" />

                {/* Content */}
                <div className={styles.content}>
                    <p className={styles.title}>
                        {displayedText}
                        {showCursor && <span className={styles.cursor}>|</span>}
                    </p>

                    <div className={styles.buttons}>
                        <a href="#" className={styles.primaryButton}>
                            Create free account
                        </a>
                        <a href="#" className={styles.secondaryButton}>
                            Sign in to Al-Awal
                        </a>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
