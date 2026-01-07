"use client";

import { useRef, useCallback, useState, memo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "./page.module.css";

// Memoized Input component for performance
const FormInput = memo(function FormInput({
    label,
    name,
    type = "text",
    placeholder,
    required = false,
    value,
    onChange,
}: {
    label: string;
    name: string;
    type?: string;
    placeholder: string;
    required?: boolean;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
    return (
        <div className={styles.inputGroup}>
            <label htmlFor={name} className={styles.label}>
                {label}
                {required && <span className={styles.required}>*</span>}
            </label>
            <input
                type={type}
                id={name}
                name={name}
                placeholder={placeholder}
                className={styles.input}
                value={value}
                onChange={onChange}
                required={required}
                autoComplete="off"
            />
        </div>
    );
});

// Memoized Textarea component with auto-expand
const FormTextarea = memo(function FormTextarea({
    label,
    name,
    placeholder,
    required = false,
    value,
    onChange,
}: {
    label: string;
    name: string;
    placeholder: string;
    required?: boolean;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Auto-expand on value change
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(e);
        // Auto-resize
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

    return (
        <div className={styles.inputGroup}>
            <label htmlFor={name} className={styles.label}>
                {label}
                {required && <span className={styles.required}>*</span>}
            </label>
            <textarea
                ref={textareaRef}
                id={name}
                name={name}
                placeholder={placeholder}
                className={styles.textarea}
                value={value}
                onChange={handleChange}
                required={required}
                rows={3}
            />
        </div>
    );
});

// Tab types
type ActiveTab = "sayhi" | "getaccess";

function ContactPageContent() {
    const searchParams = useSearchParams();
    const initTab = searchParams.get("tab") as ActiveTab;
    const [activeTab, setActiveTab] = useState<ActiveTab>(
        initTab === "getaccess" || initTab === "sayhi" ? initTab : "sayhi"
    );

    // Sync tab with URL parameter if it changes
    useEffect(() => {
        const tab = searchParams.get("tab");
        if (tab === "getaccess" || tab === "sayhi") {
            setActiveTab(tab as ActiveTab);
        }
    }, [searchParams]);

    // Form states - SAY HI
    const [sayHiForm, setSayHiForm] = useState({
        name: "",
        email: "",
        source: "",
        message: "",
    });

    // Form states - GET ACCESS
    const [getAccessForm, setGetAccessForm] = useState({
        name: "",
        email: "",
        organization: "",
        message: "",
    });

    // Memoized handlers
    const handleSayHiChange = useCallback((field: string) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setSayHiForm(prev => ({ ...prev, [field]: e.target.value }));
    }, []);

    const handleGetAccessChange = useCallback((field: string) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setGetAccessForm(prev => ({ ...prev, [field]: e.target.value }));
    }, []);

    const handleTabChange = useCallback((tab: ActiveTab) => {
        setActiveTab(tab);
    }, []);

    const formRef = useRef<HTMLFormElement>(null);

    // Submission states
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{
        type: 'success' | 'error' | null;
        message: string;
    }>({ type: null, message: '' });

    // Handle Say Hi form submission
    const handleSayHiSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus({ type: null, message: '' });

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'sayhi',
                    data: sayHiForm,
                }),
            });

            if (response.ok) {
                setSubmitStatus({
                    type: 'success',
                    message: 'Message sent successfully! We\'ll get back to you soon.',
                });
                setSayHiForm({ name: '', email: '', source: '', message: '' });
            } else {
                throw new Error('Failed to send message');
            }
        } catch {
            setSubmitStatus({
                type: 'error',
                message: 'Something went wrong. Please try again.',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handle Get Access form submission
    const handleGetAccessSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus({ type: null, message: '' });

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'getaccess',
                    data: getAccessForm,
                }),
            });

            if (response.ok) {
                setSubmitStatus({
                    type: 'success',
                    message: 'Access request submitted! We\'ll be in touch within 24 hours.',
                });
                setGetAccessForm({ name: '', email: '', organization: '', message: '' });
            } else {
                throw new Error('Failed to submit request');
            }
        } catch {
            setSubmitStatus({
                type: 'error',
                message: 'Something went wrong. Please try again.',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Navbar />
            <main className={styles.main}>
                <div className={styles.container}>
                    {/* Tab Navigation */}
                    <nav className={styles.tabNav} role="tablist">
                        <button
                            role="tab"
                            aria-selected={activeTab === "sayhi"}
                            className={`${styles.tabButton} ${activeTab === "sayhi" ? styles.tabButtonActive : ""}`}
                            onClick={() => handleTabChange("sayhi")}
                        >
                            Say Hey
                        </button>
                        <button
                            role="tab"
                            aria-selected={activeTab === "getaccess"}
                            className={`${styles.tabButton} ${activeTab === "getaccess" ? styles.tabButtonActive : ""}`}
                            onClick={() => handleTabChange("getaccess")}
                        >
                            Get Access
                        </button>
                    </nav>

                    {/* SAY HEY Section */}
                    <section
                        className={`${styles.section} ${activeTab === "sayhi" ? styles.sectionActive : ""}`}
                        aria-hidden={activeTab !== "sayhi"}
                    >
                        <div className={styles.sectionContent}>
                            {/* Left Side - Header */}
                            <div className={styles.headerSide}>
                                <h1 className={styles.title}>Say hey.</h1>
                                <div className={styles.description}>
                                    <p className={styles.subtitle}>Not sure where to start?</p>
                                    <p className={styles.bodyText}>
                                        Tell us about your research, your timeline,
                                        how you heard about us, and where you&apos;re located.
                                    </p>
                                    <p className={styles.bodyTextSmall}>
                                        We read every message. So, thanks in advance for making it a good one.
                                    </p>
                                </div>
                            </div>

                            {/* Right Side - Form */}
                            <div className={styles.formSide}>
                                <form ref={formRef} className={styles.form} onSubmit={handleSayHiSubmit}>
                                    <div className={styles.formGrid}>
                                        <FormInput
                                            label="Name"
                                            name="sayhi-name"
                                            placeholder="Enter your name"
                                            required
                                            value={sayHiForm.name}
                                            onChange={handleSayHiChange("name")}
                                        />
                                        <FormInput
                                            label="Email"
                                            name="sayhi-email"
                                            type="email"
                                            placeholder="Enter your email"
                                            required
                                            value={sayHiForm.email}
                                            onChange={handleSayHiChange("email")}
                                        />
                                    </div>

                                    <FormInput
                                        label="How did you hear of us?"
                                        name="sayhi-source"
                                        placeholder="Enter your answer"
                                        value={sayHiForm.source}
                                        onChange={handleSayHiChange("source")}
                                    />

                                    <FormTextarea
                                        label="Message"
                                        name="sayhi-message"
                                        placeholder="Type your message"
                                        required
                                        value={sayHiForm.message}
                                        onChange={handleSayHiChange("message")}
                                    />

                                    <div className={styles.formFooter}>
                                        <label className={styles.checkboxLabel}>
                                            <input type="checkbox" className={styles.checkbox} />
                                            <span>Signup to Newsletter</span>
                                        </label>
                                        <button
                                            type="submit"
                                            className={styles.submitButton}
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? 'Sending...' : 'Submit'}
                                        </button>
                                    </div>

                                    {submitStatus.type && (
                                        <p className={submitStatus.type === 'success' ? styles.successMessage : styles.errorMessage}>
                                            {submitStatus.message}
                                        </p>
                                    )}
                                </form>
                            </div>
                        </div>
                    </section>

                    {/* GET ACCESS Section */}
                    <section
                        className={`${styles.section} ${activeTab === "getaccess" ? styles.sectionActive : ""}`}
                        aria-hidden={activeTab !== "getaccess"}
                    >
                        <div className={styles.sectionContent}>
                            {/* Left Side - Header */}
                            <div className={styles.headerSide}>
                                <h1 className={styles.title}>Get access.</h1>
                                <div className={styles.description}>
                                    <p className={styles.subtitle}>Ready to accelerate your research?</p>
                                    <p className={styles.bodyText}>
                                        Tell us about your organization, your use case,
                                        and how our platform can help you achieve your goals.
                                    </p>
                                    <p className={styles.bodyTextSmall}>
                                        We&apos;ll get back to you within 24 hours with next steps.
                                    </p>
                                </div>
                            </div>

                            {/* Right Side - Form */}
                            <div className={styles.formSide}>
                                <form className={styles.form} onSubmit={handleGetAccessSubmit}>
                                    <div className={styles.formGrid}>
                                        <FormInput
                                            label="Name"
                                            name="access-name"
                                            placeholder="Enter your name"
                                            required
                                            value={getAccessForm.name}
                                            onChange={handleGetAccessChange("name")}
                                        />
                                        <FormInput
                                            label="Email"
                                            name="access-email"
                                            type="email"
                                            placeholder="Enter your work email"
                                            required
                                            value={getAccessForm.email}
                                            onChange={handleGetAccessChange("email")}
                                        />
                                    </div>

                                    <FormInput
                                        label="Organization"
                                        name="access-organization"
                                        placeholder="Enter your organization"
                                        required
                                        value={getAccessForm.organization}
                                        onChange={handleGetAccessChange("organization")}
                                    />

                                    <FormTextarea
                                        label="Tell us more"
                                        name="access-message"
                                        placeholder="Describe your research goals and how we can help"
                                        value={getAccessForm.message}
                                        onChange={handleGetAccessChange("message")}
                                    />

                                    <div className={styles.formFooter}>
                                        <label className={styles.checkboxLabel}>
                                            <input type="checkbox" className={styles.checkbox} />
                                            <span>I agree to the Terms of Service</span>
                                        </label>
                                        <button
                                            type="submit"
                                            className={styles.submitButton}
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? 'Submitting...' : 'Request Access'}
                                        </button>
                                    </div>

                                    {submitStatus.type && (
                                        <p className={submitStatus.type === 'success' ? styles.successMessage : styles.errorMessage}>
                                            {submitStatus.message}
                                        </p>
                                    )}
                                </form>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default function ContactPage() {
    return (
        <Suspense fallback={null}>
            <ContactPageContent />
        </Suspense>
    );
}
