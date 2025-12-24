"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./Navbar.module.css";

// Links con dropdown tendrán hasDropdown: true
const navLinks = [
    { label: "Products", href: "#", hasDropdown: true },
    { label: "Use Cases", href: "#", hasDropdown: false },
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