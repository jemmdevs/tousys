"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "./Navbar.module.css";

// Links con dropdown tendrán hasDropdown: true
const navLinks = [
    { label: "Products", href: "#", hasDropdown: true },
    { label: "About Us", href: "#", hasDropdown: false },
    { label: "Blog", href: "#", hasDropdown: false },
    { label: "Resources", href: "#", hasDropdown: true },
];

// Componente de flecha hacia abajo (para Products/Resources)
const ChevronDown = () => (
    <svg
        className={styles.chevron}
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M4.5 6.75L9 11.25L13.5 6.75"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

// Componente de flecha hacia la derecha (para dropdown links)
const ChevronRight = () => (
    <svg
        className={styles.dropdownArrow}
        width="14"
        height="14"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M6.75 4.5L11.25 9L6.75 13.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

// Icono de mail/carta
const MailIcon = () => (
    <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
    >
        <path
            d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M22 6L12 13L2 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

// Contenido placeholder para los dropdowns - lo personalizarás después
const dropdownContent: Record<string, React.ReactNode> = {
    Products: (
        <div className={styles.dropdownInner}>
            <div className={styles.dropdownSection}>
                <h4 className={styles.dropdownTitle}>Intuitive for every type of builder</h4>
                <p className={styles.dropdownDescription}>Explore how Tousys Biotech helps you build</p>
                <Link href="#" className={styles.dropdownCta}>See overview</Link>
            </div>
            <div className={styles.dropdownLinks}>
                <Link href="#" className={styles.dropdownLink}>
                    <span className={styles.dropdownLinkText}>Product One</span>
                    <ChevronRight />
                </Link>
                <Link href="#" className={styles.dropdownLink}>
                    <span className={styles.dropdownLinkText}>Product Two</span>
                    <ChevronRight />
                </Link>
                <Link href="#" className={styles.dropdownLink}>
                    <span className={styles.dropdownLinkText}>Product Three</span>
                    <ChevronRight />
                </Link>
            </div>
        </div>
    ),
    Resources: (
        <div className={styles.dropdownInner}>
            <div className={styles.dropdownSection}>
                <h4 className={styles.dropdownTitle}>Learn and explore</h4>
                <p className={styles.dropdownDescription}>Resources to help you get started</p>
                <Link href="#" className={styles.dropdownCta}>Browse all</Link>
            </div>
            <div className={styles.dropdownLinks}>
                <Link href="#" className={styles.dropdownLink}>
                    <span className={styles.dropdownLinkText}>Documentation</span>
                    <ChevronRight />
                </Link>
                <Link href="#" className={styles.dropdownLink}>
                    <span className={styles.dropdownLinkText}>Tutorials</span>
                    <ChevronRight />
                </Link>
                <Link href="#" className={styles.dropdownLink}>
                    <span className={styles.dropdownLinkText}>API Reference</span>
                    <ChevronRight />
                </Link>
            </div>
        </div>
    ),
};

export default function Navbar() {
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [isHidden, setIsHidden] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 10) {
                // Scrolling down - hide navbar
                setIsHidden(true);
                setActiveDropdown(null); // Close any open dropdown
            } else {
                // Scrolling up - show navbar
                setIsHidden(false);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    return (
        <>
            <header
                className={`${styles.navbar} ${activeDropdown ? styles.navbarExpanded : ''} ${isHidden ? styles.navbarHidden : ''}`}
                onMouseLeave={() => setActiveDropdown(null)}
            >
                <nav className={styles.navContainer}>
                    {/* Logo + Navigation Links */}
                    <div className={styles.navLeft}>
                        <Link href="/" className={styles.logo}>
                            <span className={styles.logoMain}>Al-Awal</span>
                            <span className={styles.logoSub}>Biotech</span>
                        </Link>

                        <ul className={styles.navLinks}>
                            {navLinks.map((link) => (
                                <li
                                    key={link.label}
                                    onMouseEnter={() => link.hasDropdown ? setActiveDropdown(link.label) : setActiveDropdown(null)}
                                >
                                    {link.hasDropdown ? (
                                        <button
                                            className={`${styles.navLink} ${styles.navLinkDropdown} ${activeDropdown === link.label ? styles.navLinkActive : ''}`}
                                        >
                                            {link.label}
                                            <ChevronDown />
                                        </button>
                                    ) : (
                                        <Link
                                            href={link.href}
                                            className={styles.navLink}
                                            onMouseEnter={() => setActiveDropdown(null)}
                                        >
                                            {link.label}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact CTA */}
                    <div className={styles.navRight}>
                        <Link href="#" className={styles.contactLink}>
                            Get in touch
                            <MailIcon />
                        </Link>
                    </div>
                </nav>

                {/* Dropdown Panel */}
                <div className={`${styles.dropdownPanel} ${activeDropdown ? styles.dropdownPanelOpen : ''}`}>
                    <div className={styles.dropdownContainer}>
                        {/* Products Dropdown */}
                        <div className={`${styles.dropdownContent} ${activeDropdown === 'Products' ? styles.dropdownContentActive : ''}`}>
                            {dropdownContent.Products}
                        </div>
                        {/* Resources Dropdown */}
                        <div className={`${styles.dropdownContent} ${activeDropdown === 'Resources' ? styles.dropdownContentActive : ''}`}>
                            {dropdownContent.Resources}
                        </div>
                    </div>
                </div>
            </header>

            {/* Overlay oscuro - fuera del header */}
            <div
                className={`${styles.overlay} ${activeDropdown ? styles.overlayVisible : ''}`}
                onClick={() => setActiveDropdown(null)}
            />
        </>
    );
}