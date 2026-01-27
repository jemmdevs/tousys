"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./IntroSection.module.css";
import LogoMarquee from "./LogoMarquee";


const introText = "Tousys Biotech redesigns translation kinetics, optimizing codons for higher expression and structural stability.";

export default function IntroSection() {
    const [displayedText, setDisplayedText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);
    const [showCursor, setShowCursor] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasAnimated) {
                        setIsTyping(true);
                        setHasAnimated(true);
                        setShowCursor(true);
                    }
                });
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, [hasAnimated]);

    useEffect(() => {
        if (!isTyping) return;

        let currentIndex = 0;
        const typingInterval = setInterval(() => {
            if (currentIndex < introText.length) {
                setDisplayedText(introText.slice(0, currentIndex + 1));
                currentIndex++;
            } else {
                setIsTyping(false);
                clearInterval(typingInterval);
            }
        }, 19); // Velocidad de escritura

        return () => clearInterval(typingInterval);
    }, [isTyping]);

    return (
        <section ref={sectionRef} className={styles.introSection}>
            <div className={styles.container}>
                <div className={styles.introTextWrapper}>
                    {/* Texto fantasma invisible - reserva el espacio */}
                    <span className={styles.introTextGhost} aria-hidden="true">
                        {introText}
                        <span className={styles.cursor}>|</span>
                    </span>
                    {/* Texto visible con animación */}
                    <p className={styles.introText}>
                        {isTyping ? (
                            <span translate="no">{displayedText}</span>
                        ) : (
                            <span>{introText}</span>
                        )}
                        {showCursor && <span className={styles.cursor}>|</span>}
                    </p>
                </div>
                <LogoMarquee />
                {/* <SpiralText /> */}
            </div>
        </section>
    );
}

