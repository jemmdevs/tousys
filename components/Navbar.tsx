"use client";

import Link from "next/link";
import styles from "./Navbar.module.css";

const navLinks = [
    { label: "Products", href: "#" },
    { label: "Use Cases", href: "#" },
    { label: "Pricing", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Solutions", href: "#" },
];

export default function Navbar() {
    return (
        <header className={styles.navbar}>
            <nav className={styles.navContainer}>
                {/* Logo + Navigation Links */}
                <div className={styles.navLeft}>
                    <Link href="/" className={styles.logo}>
                        <span className={styles.logoMain}>Tousys</span>
                        <span className={styles.logoSub}>Biotech</span>
                    </Link>

                    <ul className={styles.navLinks}>
                        {navLinks.map((link) => (
                            <li key={link.label}>
                                <Link href={link.href} className={styles.navLink}>
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact CTA */}
                <div className={styles.navRight}>
                    <Link href="#" className={styles.contactLink}>
                        Contact
                    </Link>
                </div>
            </nav>
        </header>
    );
}
