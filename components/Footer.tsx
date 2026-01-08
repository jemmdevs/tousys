"use client";

import Link from "next/link";
import styles from "./Footer.module.css";

const footerLinks = [
    { label: "About Al-Awal", href: "#" },
    { label: "Product", href: "#" },
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
];

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                {/* Logo */}
                <div className={styles.logo}>
                    <span className={styles.logoMain}>Alawal</span>
                </div>

                {/* Links */}
                <nav className={styles.nav}>
                    {footerLinks.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className={styles.link}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>
            </div>
        </footer>
    );
}
