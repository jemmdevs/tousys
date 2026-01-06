import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Get in Touch | Al-Awal Biotech",
    description: "Contact Al-Awal Biotech for general inquiries or request access to our codon optimization platform. We read every message.",
    openGraph: {
        title: "Get in Touch | Al-Awal Biotech",
        description: "Contact Al-Awal Biotech for general inquiries or request access to our codon optimization platform.",
    },
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
