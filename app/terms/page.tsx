import Link from "next/link";
import Navbar from "@/components/Navbar";
import PreFooter from "@/components/PreFooter";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

export const metadata = {
    title: "Terms | Tousys",
    description: "Services and Terms of Service for Tousys and Al-Awal platform.",
};

export default function TermsPage() {
    return (
        <>
            <Navbar />
            <main className={styles.main}>
                {/* ═══════════════════════════════════════════════════════════
                    SECTION 1: OUR SERVICES
                ═══════════════════════════════════════════════════════════ */}
                <h1 className={styles.pageTitle}>Our Services</h1>
                <p className={styles.pageSubtitle}>
                    Two ways to work with us depending on your project needs.
                </p>

                {/* Al-Awal Platform */}
                <section className={styles.serviceSection}>
                    <h2 className={styles.serviceName}>Al-Awal Platform</h2>
                    <p className={styles.serviceType}>Software as a Service</p>
                    <p className={styles.serviceDescription}>
                        Full access to our codon optimization platform for teams who prefer complete control over their design.
                    </p>
                    <ul className={styles.featureList}>
                        <li>Visual sequence editor — Interactive canvas for codon-level adjustments</li>
                        <li>DAIS Algorithm — Dynamic assurance index with quality classification</li>
                        <li>3D Visualization — Protein folding prediction with ribosomal pause heatmap</li>
                        <li>Kinetics analysis — Interactive charts to identify ribosomal bottlenecks</li>
                        <li>Multi-organism — Calibrated for E. coli, Human, and Yeast</li>
                        <li>Cloud projects — Save and access your work from any device</li>
                        <li>Flexible export — FASTA, TXT, JSON, and CSV</li>
                    </ul>
                    <Link href="/contact?tab=getaccess" className={styles.ctaButton}>
                        Request Demo
                    </Link>
                </section>

                <hr className={styles.divider} />

                {/* Tousys Integrated */}
                <section className={styles.serviceSection}>
                    <h2 className={styles.serviceName}>Tousys Integrated</h2>
                    <p className={styles.serviceType}>Full Synthesis Service</p>
                    <p className={styles.serviceDescription}>
                        From design to delivery. We handle the complete process for teams who prefer to delegate execution.
                    </p>
                    <p className={styles.includesNote}>
                        Includes everything in Al-Awal Platform, plus:
                    </p>
                    <ul className={styles.featureList}>
                        <li>Design consulting — Our team reviews and optimizes your sequence</li>
                        <li>DNA synthesis — Production through certified partners</li>
                        <li>Quality control — Verification before shipping</li>
                        <li>Integrated logistics — Coordinated delivery to your lab</li>
                    </ul>
                    <Link href="/contact?tab=sayhi" className={styles.ctaButton}>
                        Request Quote
                    </Link>
                </section>

                {/* ═══════════════════════════════════════════════════════════
                    SECTION 2: TERMS OF SERVICE
                ═══════════════════════════════════════════════════════════ */}
                <div className={styles.legalSpacer} />

                <h2 className={styles.legalTitle}>Terms of Service</h2>
                <p className={styles.legalDate}>Effective Date: January 2026</p>

                {/* 1. Agreement */}
                <section className={styles.legalSection}>
                    <h3 className={styles.legalHeading}>1. Agreement to Terms</h3>
                    <p>
                        By accessing or using Al-Awal Platform or Tousys Integrated Service ("Services"),
                        you agree to be bound by these Terms. If you disagree with any part, you may not use our Services.
                    </p>
                </section>

                {/* 2. Description */}
                <section className={styles.legalSection}>
                    <h3 className={styles.legalHeading}>2. Description of Services</h3>

                    <h4 className={styles.legalSubheading}>2.1 Al-Awal Platform (SaaS)</h4>
                    <p>A cloud-based codon optimization platform providing:</p>
                    <ul className={styles.legalList}>
                        <li>Visual sequence editor and DAIS algorithm</li>
                        <li>3D protein visualization with ribosomal pause heatmaps</li>
                        <li>Kinetics analysis and multi-organism optimization</li>
                        <li>Project cloud storage and data export</li>
                    </ul>

                    <h4 className={styles.legalSubheading}>2.2 Tousys Integrated Service</h4>
                    <p>A full-service solution including all Al-Awal features plus:</p>
                    <ul className={styles.legalList}>
                        <li>Expert sequence design consulting</li>
                        <li>DNA synthesis through certified partners</li>
                        <li>Quality control and coordinated logistics</li>
                    </ul>
                </section>

                {/* 3. User Accounts */}
                <section className={styles.legalSection}>
                    <h3 className={styles.legalHeading}>3. User Accounts</h3>
                    <ul className={styles.legalList}>
                        <li>You must provide accurate registration information</li>
                        <li>You are responsible for maintaining account security</li>
                        <li>One account per individual or organization</li>
                        <li>Notify us immediately of unauthorized access</li>
                    </ul>
                </section>

                {/* 4. Acceptable Use */}
                <section className={styles.legalSection}>
                    <h3 className={styles.legalHeading}>4. Acceptable Use</h3>
                    <p>You agree NOT to:</p>
                    <ul className={styles.legalList}>
                        <li>Reverse engineer, decompile, or extract source code from the platform</li>
                        <li>Use automated scripts to access the service</li>
                        <li>Share login credentials with unauthorized parties</li>
                        <li>Use the service for illegal or harmful purposes</li>
                        <li>Submit sequences for biological weapons or harmful organisms</li>
                    </ul>
                </section>

                {/* 5. IP */}
                <section className={styles.legalSection}>
                    <h3 className={styles.legalHeading}>5. Intellectual Property</h3>

                    <h4 className={styles.legalSubheading}>Our Property</h4>
                    <ul className={styles.legalList}>
                        <li>The DAIS algorithm, platform interface, and underlying technology are proprietary to Tousys</li>
                        <li>All trademarks, logos, and brand elements belong to Tousys</li>
                    </ul>

                    <h4 className={styles.legalSubheading}>Your Property</h4>
                    <ul className={styles.legalList}>
                        <li>You retain full ownership of sequences you submit</li>
                        <li>Optimization results generated from your sequences belong to you</li>
                        <li>You grant us a limited license to process your data solely to provide the service</li>
                    </ul>
                </section>

                {/* 6. Data */}
                <section className={styles.legalSection}>
                    <h3 className={styles.legalHeading}>6. Data and Privacy</h3>
                    <ul className={styles.legalList}>
                        <li>Sequences submitted for optimization are processed confidentially</li>
                        <li>Cloud-saved projects are encrypted and accessible only to you</li>
                        <li>We do not share your sequences with third parties except as required for Tousys Integrated Service (synthesis partners)</li>
                    </ul>
                    <p>
                        See our <Link href="/privacy" className={styles.legalLink}>Privacy Policy</Link> for complete details.
                    </p>
                </section>

                {/* 7. Liability */}
                <section className={styles.legalSection}>
                    <h3 className={styles.legalHeading}>7. Limitation of Liability</h3>
                    <p className={styles.legalImportant}>IMPORTANT:</p>
                    <ul className={styles.legalList}>
                        <li>All optimization results are computational predictions, not guarantees</li>
                        <li>Experimental validation in laboratory is the sole responsibility of the user</li>
                        <li>Tousys is not liable for: failed experiments, synthesis errors by third-party partners, or any consequential damages</li>
                        <li>Maximum liability limited to fees paid in the 12 months prior to the claim</li>
                    </ul>
                </section>

                {/* 8. Service Specific */}
                <section className={styles.legalSection}>
                    <h3 className={styles.legalHeading}>8. Service Specific Terms</h3>

                    <h4 className={styles.legalSubheading}>8.1 Al-Awal Platform</h4>
                    <ul className={styles.legalList}>
                        <li>Subscription-based access billed monthly or annually</li>
                        <li>Free tier limited to sequences under 300 bases</li>
                        <li>Full features require active subscription</li>
                    </ul>

                    <h4 className={styles.legalSubheading}>8.2 Tousys Integrated Service</h4>
                    <ul className={styles.legalList}>
                        <li>Quoted per project based on sequence complexity</li>
                        <li>Synthesis performed by certified partners (terms may apply)</li>
                        <li>Delivery timelines are estimates, not guarantees</li>
                        <li>Shipping handled by specialized cold-chain logistics</li>
                    </ul>
                </section>

                {/* 9. Payment */}
                <section className={styles.legalSection}>
                    <h3 className={styles.legalHeading}>9. Payment Terms</h3>
                    <ul className={styles.legalList}>
                        <li>Fees are due according to your selected plan</li>
                        <li>All payments are non-refundable except as required by law</li>
                        <li>We reserve the right to modify pricing with 30 days notice</li>
                    </ul>
                </section>

                {/* 10. Termination */}
                <section className={styles.legalSection}>
                    <h3 className={styles.legalHeading}>10. Termination</h3>
                    <ul className={styles.legalList}>
                        <li>You may cancel your account at any time</li>
                        <li>Export your data before cancellation; we are not obligated to retain it</li>
                        <li>We may suspend accounts for violations of these Terms</li>
                        <li>Upon termination, your license to use the platform ends immediately</li>
                    </ul>
                </section>

                {/* 11. Changes */}
                <section className={styles.legalSection}>
                    <h3 className={styles.legalHeading}>11. Changes to Terms</h3>
                    <p>
                        We may update these Terms periodically. Changes will be posted on this page
                        with an updated effective date. Continued use after changes constitutes acceptance.
                    </p>
                </section>

                {/* 12. Governing Law */}
                <section className={styles.legalSection}>
                    <h3 className={styles.legalHeading}>12. Governing Law</h3>
                    <p>
                        These Terms are governed by the laws of Spain and the European Union.
                        Any disputes shall be resolved in the courts of Valencia, Spain.
                    </p>
                </section>

                {/* 13. Contact */}
                <section className={styles.legalSection}>
                    <h3 className={styles.legalHeading}>13. Contact</h3>
                    <p>For questions about these Terms:</p>
                    <p className={styles.contactInfo}>
                        Email: <a href="mailto:Servicio@tousysbiotech.com" className={styles.legalLink}>Servicio@tousysbiotech.com</a>
                    </p>
                </section>
            </main>
            <PreFooter />
            <Footer />
        </>
    );
}
