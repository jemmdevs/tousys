"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";
import styles from "./Navbar.module.css";

// Links con dropdown tendrán hasDropdown: true
const navLinks = [
    { label: "Product", href: "/product", hasDropdown: false },
    { label: "Use Cases", href: "#", hasDropdown: true },
    { label: "Resources", href: "#", hasDropdown: true },
    { label: "Blog", href: "/blog", hasDropdown: false },
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
    "Use Cases": (
        <div className={styles.dropdownInner}>
            <div className={styles.dropdownSection}>
                <h4 className={styles.dropdownTitle}>Discover what's possible</h4>
                <p className={styles.dropdownDescription}>See how teams are using our platform</p>
                <Link href="#" className={styles.dropdownCta}>View all use cases</Link>
            </div>
            <div className={styles.dropdownLinks}>
                <Link href="#" className={styles.dropdownLink}>
                    <span className={styles.dropdownLinkText}>Research Labs</span>
                    <ChevronRight />
                </Link>
                <Link href="#" className={styles.dropdownLink}>
                    <span className={styles.dropdownLinkText}>Pharmaceutical</span>
                    <ChevronRight />
                </Link>
                <Link href="#" className={styles.dropdownLink}>
                    <span className={styles.dropdownLinkText}>Biotech Startups</span>
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

// Icono Hamburguesa
const HamburgerIcon = () => (
    <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M3 12H21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
        />
        <path
            d="M3 6H21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
        />
        <path
            d="M3 18H21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
        />
    </svg>
);

// Icono X (cerrar)
const CloseIcon = () => (
    <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M18 6L6 18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
        />
        <path
            d="M6 6L18 18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
        />
    </svg>
);

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [isHidden, setIsHidden] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeMobileDropdown, setActiveMobileDropdown] = useState<string | null>(null);
    const lastScrollYRef = useRef(0);

    // Handle logo click - scroll to top on homepage, navigate to homepage on other pages
    const handleLogoClick = () => {
        if (pathname === '/') {
            // On homepage - smooth scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            // On other pages - navigate to homepage
            router.push('/');
        }
        // Close mobile menu if open
        setIsMobileMenuOpen(false);
    };

    // Toggle mobile menu
    const toggleMobileMenu = useCallback(() => {
        setIsMobileMenuOpen(prev => !prev);
        setActiveMobileDropdown(null);
    }, []);

    // Toggle mobile dropdown
    const toggleMobileDropdown = useCallback((label: string) => {
        setActiveMobileDropdown(prev => prev === label ? null : label);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
        setActiveMobileDropdown(null);
    }, [pathname]);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMobileMenuOpen]);

    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const currentScrollY = Math.max(0, window.scrollY);
                    const scrollDiff = currentScrollY - lastScrollYRef.current;
                    const minScrollChange = 5; // Threshold to prevent jitter

                    // Only update if scroll change is significant
                    if (Math.abs(scrollDiff) > minScrollChange) {
                        if (scrollDiff > 0 && currentScrollY > 10) {
                            // Scrolling down significant amount - hide navbar
                            setIsHidden(true);
                            setActiveDropdown(null);
                        } else if (scrollDiff < 0) {
                            // Scrolling up significant amount - show navbar
                            setIsHidden(false);
                        }
                        lastScrollYRef.current = currentScrollY;
                    }

                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <header
                className={`${styles.navbar} ${activeDropdown ? styles.navbarExpanded : ''} ${isHidden ? styles.navbarHidden : ''}`}
                onMouseLeave={() => setActiveDropdown(null)}
            >
                <nav className={styles.navContainer}>
                    {/* Logo + Navigation Links */}
                    <div className={styles.navLeft}>
                        <button
                            className={styles.logo}
                            onClick={handleLogoClick}
                            aria-label="Go to home"
                        >
                            <span className={styles.logoMain}>Al-Awal</span>
                            <span className={styles.logoSub}>Biotech</span>
                        </button>

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

                    {/* Contact CTA - Desktop */}
                    <div className={styles.navRight}>
                        <Link href="#" className={styles.contactLink}>
                            Get in touch
                            <MailIcon />
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className={`${styles.mobileMenuButton} ${isMobileMenuOpen ? styles.mobileMenuButtonOpen : ''}`}
                        onClick={toggleMobileMenu}
                        aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={isMobileMenuOpen}
                    >
                        {isMobileMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
                    </button>
                </nav>

                {/* Dropdown Panel */}
                <div className={`${styles.dropdownPanel} ${activeDropdown ? styles.dropdownPanelOpen : ''}`}>
                    <div className={styles.dropdownContainer}>
                        {/* Use Cases Dropdown */}
                        <div className={`${styles.dropdownContent} ${activeDropdown === 'Use Cases' ? styles.dropdownContentActive : ''}`}>
                            {dropdownContent["Use Cases"]}
                        </div>
                        {/* Resources Dropdown */}
                        <div className={`${styles.dropdownContent} ${activeDropdown === 'Resources' ? styles.dropdownContentActive : ''}`}>
                            {dropdownContent.Resources}
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Panel */}
            <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
                <nav className={styles.mobileMenuNav}>
                    {navLinks.map((link, index) => (
                        <div
                            key={link.label}
                            className={styles.mobileMenuItem}
                            style={{ animationDelay: isMobileMenuOpen ? `${index * 0.05}s` : '0s' }}
                        >
                            {link.hasDropdown ? (
                                <>
                                    <button
                                        className={`${styles.mobileMenuLink} ${activeMobileDropdown === link.label ? styles.mobileMenuLinkActive : ''}`}
                                        onClick={() => toggleMobileDropdown(link.label)}
                                    >
                                        {link.label}
                                        <ChevronDown />
                                    </button>
                                    <div className={`${styles.mobileSubmenu} ${activeMobileDropdown === link.label ? styles.mobileSubmenuOpen : ''}`}>
                                        {/* Submenu items */}
                                        {dropdownContent[link.label] && (
                                            <div className={styles.mobileSubmenuContent}>
                                                {link.label === 'Use Cases' && (
                                                    <>
                                                        <Link href="#" className={styles.mobileSubmenuLink}>Research Labs</Link>
                                                        <Link href="#" className={styles.mobileSubmenuLink}>Pharmaceutical</Link>
                                                        <Link href="#" className={styles.mobileSubmenuLink}>Biotech Startups</Link>
                                                    </>
                                                )}
                                                {link.label === 'Resources' && (
                                                    <>
                                                        <Link href="#" className={styles.mobileSubmenuLink}>Documentation</Link>
                                                        <Link href="#" className={styles.mobileSubmenuLink}>Tutorials</Link>
                                                        <Link href="#" className={styles.mobileSubmenuLink}>API Reference</Link>
                                                    </>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <Link
                                    href={link.href}
                                    className={styles.mobileMenuLink}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            )}
                        </div>
                    ))}
                </nav>
            </div>

            {/* Overlay oscuro - fuera del header */}
            <div
                className={`${styles.overlay} ${activeDropdown ? styles.overlayVisible : ''}`}
                onClick={() => setActiveDropdown(null)}
            />
        </>
    );
}