"use client";

import Link from "next/link";
import { useState, CSSProperties } from "react";
import styles from "./Navbar.module.css";

// Links con dropdown tendrán hasDropdown: true
const navLinks = [
    { label: "Products", href: "#", hasDropdown: true },
    { label: "Use Cases", href: "#", hasDropdown: false },
    { label: "Blog", href: "#", hasDropdown: false },
    { label: "Resources", href: "#", hasDropdown: true },
];

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
                    <span className={styles.dropdownArrow}>›</span>
                </Link>
                <Link href="#" className={styles.dropdownLink}>
                    <span className={styles.dropdownLinkText}>Product Two</span>
                    <span className={styles.dropdownArrow}>›</span>
                </Link>
                <Link href="#" className={styles.dropdownLink}>
                    <span className={styles.dropdownLinkText}>Product Three</span>
                    <span className={styles.dropdownArrow}>›</span>
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
                    <span className={styles.dropdownArrow}>›</span>
                </Link>
                <Link href="#" className={styles.dropdownLink}>
                    <span className={styles.dropdownLinkText}>Tutorials</span>
                    <span className={styles.dropdownArrow}>›</span>
                </Link>
                <Link href="#" className={styles.dropdownLink}>
                    <span className={styles.dropdownLinkText}>API Reference</span>
                    <span className={styles.dropdownArrow}>›</span>
                </Link>
            </div>
        </div>
    ),
};

// Componente de flecha SVG
const ChevronDown = () => (
    <svg
        className={styles.chevron}
        width="16"
        height="16"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M3 4.5L6 7.5L9 4.5"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export default function Navbar() {
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    const getDisplayStyle = (dropdownName: string): CSSProperties => ({
        display: activeDropdown === dropdownName ? 'block' : 'none'
    });

    return (
        <>
            <header
                className={`${styles.navbar} ${activeDropdown ? styles.navbarExpanded : ''}`}
                onMouseLeave={() => setActiveDropdown(null)}
            >
                <nav className={styles.navContainer}>
                    {/* Logo + Navigation Links */}
                    <div className={styles.navLeft}>
                        <Link href="/" className={styles.logo}>
                            <span className={styles.logoMain}>Tousys</span>
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
                        </Link>
                    </div>
                </nav>

                {/* Dropdown Panel */}
                <div className={`${styles.dropdownPanel} ${activeDropdown ? styles.dropdownPanelOpen : ''}`}>
                    <div className={styles.dropdownContainer}>
                        {/* Renderizar ambos dropdowns, mostrar solo el activo */}
                        <div style={getDisplayStyle('Products')}>
                            {dropdownContent.Products}
                        </div>
                        <div style={getDisplayStyle('Resources')}>
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