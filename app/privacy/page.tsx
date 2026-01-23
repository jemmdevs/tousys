import Navbar from "@/components/Navbar";
import PreFooter from "@/components/PreFooter";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

export const metadata = {
    title: "Privacy Policy | Tousys",
    description: "Privacy policy for Tousys website and Al-Awal platform.",
};

export default function PrivacyPage() {
    return (
        <>
            <Navbar />
            <main className={styles.main}>
                <h1 className={styles.pageTitle}>Privacy Policy</h1>
                <p className={styles.sectionDate}>Last Updated: January 2026</p>

                {/* 1. Introduction */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>1. Introduction</h2>
                    <p className={styles.text}>
                        Welcome to Al-Awal by Tousys. We are committed to protecting your privacy and the confidentiality of your scientific data.
                    </p>
                    <p className={styles.text}>This Privacy Policy applies to:</p>
                    <ul className={styles.introList}>
                        <li><strong>The Website (Landing Page):</strong> Where we present our services and collect requests for access.</li>
                        <li><strong>The Platform (SaaS Tool):</strong> Where registered users perform codon optimization and analysis.</li>
                    </ul>
                    <p className={styles.text}>
                        By using our Website or Platform, you consent to the data practices described in this policy.
                    </p>
                </section>

                <hr className={styles.divider} />

                {/* 2. Data We Collect */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>2. Data We Collect</h2>
                    <p className={styles.text}>We collect distinct types of information depending on how you interact with us:</p>

                    <h3 className={styles.heading}>A. For Website Visitors (Landing Page)</h3>
                    <ul className={styles.list}>
                        <li><strong>Contact Information:</strong> Name, email, and institution when you "Request Access" or "Request Quote".</li>
                        <li><strong>Usage Data:</strong> Pages visited, time spent, and referral sources (via cookies).</li>
                        <li><strong>Device Data:</strong> Browser type, IP address, and operating system.</li>
                    </ul>

                    <h3 className={styles.heading}>B. For Platform Users (Tool Access)</h3>
                    <ul className={styles.list}>
                        <li><strong>Account Credentials:</strong> Username, encrypted password, and API tokens.</li>
                        <li><strong>Scientific Data:</strong> DNA/RNA sequences, project names, and optimization parameters submitted to the tool.</li>
                        <li><strong>Activity Logs:</strong> Optimization history, export actions, and error logs for debugging.</li>
                    </ul>
                </section>

                {/* 3. How We Use Your Data */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>3. How We Use Your Data</h2>

                    <h3 className={styles.heading}>A. Personal & Contact Data</h3>
                    <ul className={styles.list}>
                        <li>To process your request for access or quotation.</li>
                        <li>To authenticate your identity when logging into the platform.</li>
                        <li>To send administrative updates (e.g., maintenance notices, terms updates).</li>
                    </ul>

                    <h3 className={styles.heading}>B. Scientific & Sequence Data (CRITICAL)</h3>
                    <ul className={styles.list}>
                        <li><strong>Purpose:</strong> Identifying sequences is strictly for the purpose of generating optimization results, 3D structure predictions, and kinetic reports.</li>
                        <li><strong>Ownership:</strong> You retain full ownership of your biological data. We do not claim rights over your sequences.</li>
                        <li><strong>No Third-Party Sharing:</strong> We do not share, sell, or use your sequences for training public models without your explicit consent.</li>
                        <li><strong>Storage:</strong> Projects are stored encrypted in our cloud. You may delete them at any time.</li>
                    </ul>
                </section>

                {/* 4. Scientific Confidentiality */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>4. Scientific Confidentiality</h2>
                    <p className={styles.text}>We understand the sensitive nature of unpublished research and IP.</p>
                    <ul className={styles.list}>
                        <li><strong>Encryption:</strong> Data is encrypted in transit (TLS/SSL) and at rest.</li>
                        <li><strong>Isolation:</strong> User environments are logically isolated.</li>
                        <li><strong>Automated Processing:</strong> Our algorithms process data automatically; human access to sequence data is restricted to critical support cases and only with your permission.</li>
                    </ul>
                </section>

                {/* 5. Cookies */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>5. Cookies and Tracking</h2>
                    <p className={styles.text}>We use cookies to:</p>
                    <ul className={styles.list}>
                        <li>Maintain your active session on the Platform.</li>
                        <li>Analyze aggregate traffic patterns on the Landing Page.</li>
                    </ul>
                    <p className={styles.text}>
                        You can control cookies through your browser settings, though disabling them may affect Platform functionality.
                    </p>
                </section>

                {/* 6. Data Retention */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>6. Data Retention</h2>
                    <ul className={styles.list}>
                        <li><strong>Account Data:</strong> Retained as long as your account is active.</li>
                        <li><strong>Project Data:</strong> Retained until you delete it or your account is terminated.</li>
                        <li><strong>Backups:</strong> Deleted cyclically every 30 days.</li>
                    </ul>
                </section>

                {/* 7. Third-Party Services */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>7. Third-Party Services</h2>
                    <p className={styles.text}>We use trusted providers for infrastructure:</p>
                    <ul className={styles.list}>
                        <li><strong>Hosting & Compute:</strong> [e.g., AWS/Google Cloud/Vercel]</li>
                        <li><strong>Protein Folding:</strong> [e.g., ESMFold API] (Only sequence data is sent, transiently processed, and not stored by the third party).</li>
                        <li><strong>Analytics:</strong> [e.g., Google Analytics] (Anonymized usage data only).</li>
                    </ul>
                </section>

                {/* 8. Integrated Service Users */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>8. Integrated Service Users (Tousys Synthesis)</h2>
                    <p className={styles.text}>If you use the Tousys Integrated Service:</p>
                    <ul className={styles.list}>
                        <li>We share necessary sequence data with our certified synthesis partners (e.g., GenScript) strictly for manufacturing.</li>
                        <li>We share shipping details with logistics partners (e.g., World Courier).</li>
                        <li>These partners are bound by strict non-disclosure agreements (NDAs).</li>
                    </ul>
                </section>

                {/* 9. Your Rights */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>9. Your Rights (GDPR/CCPA)</h2>
                    <p className={styles.text}>You have the right to:</p>
                    <ul className={styles.list}>
                        <li>Access the personal data we hold about you.</li>
                        <li>Export your scientific data (standard feature of the platform).</li>
                        <li>Delete your account and all associated data ("Right to be forgotten").</li>
                        <li>Rectify inaccurate information.</li>
                    </ul>
                    <p className={styles.text}>
                        To exercise these rights, contact: <a href="mailto:Servicio@tousysbiotech.com" className={styles.link}>Servicio@tousysbiotech.com</a>
                    </p>
                </section>

                <hr className={styles.divider} />

                {/* 10. Changes & Contact */}
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>10. Changes to This Policy</h2>
                    <p className={styles.text}>
                        We may update this policy to reflect changes in our service or regulations.
                        We will notify registered users of material changes via email.
                    </p>

                    <h3 className={styles.subHeading} style={{ marginTop: '2rem' }}>Contact Us</h3>
                    <p className={styles.text}>
                        If you have questions about this policy or our security practices, please contact us at:<br />
                        <a href="mailto:Servicio@tousysbiotech.com" className={styles.link} style={{ display: 'inline-block', marginTop: '0.5rem' }}>
                            Servicio@tousysbiotech.com
                        </a>
                    </p>
                </section>
            </main>
            <PreFooter />
            <Footer />
        </>
    );
}
