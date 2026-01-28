import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Organization, WithContext } from "schema-dts";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import StructuredData from "@/components/StructuredData";

// Optimized font loading with next/font
const inter = Inter({
  subsets: ["latin"],
  display: "swap", // Prevents FOIT (Flash of Invisible Text)
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tousys.com"),
  title: {
    default: "Tousys | Engineering Progress",
    template: "%s | Tousys",
  },
  description: "We engineer progress with next-generation platforms. Al-Awal Biotech specializes in codon optimization and AI-driven biotech solutions.",
  keywords: ["Biotech", "AI", "Codon Optimization", "Bioinformatics", "Genetic Engineering", "Tousys", "Al-Awal"],
  authors: [{ name: "Tousys Team" }],
  creator: "Tousys",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tousys.com",
    siteName: "Tousys",
    title: "Tousys | Engineering Progress",
    description: "We engineer progress with next-generation platforms",
    images: [
      {
        url: "/og-image.jpg", // Ensure this exists or fallback to logo
        width: 1200,
        height: 630,
        alt: "Tousys Engineering Progress",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tousys | Engineering Progress",
    description: "We engineer progress with next-generation platforms",
    images: ["/og-image.jpg"],
    creator: "@tousys",
  },
  verification: {
    google: "hyMq4WHhrfLEy0adIQYZNIPlQISAQLHFdQ6oPn07mIk",
  },
  icons: {
    icon: "/tousys_biotech_logo.svg",
    shortcut: "/tousys_biotech_logo.svg",
    apple: "/tousys_biotech_logo.svg",
  },
};

const jsonLd: WithContext<Organization> = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Tousys",
  url: "https://tousys.com",
  logo: "https://tousys.com/tousys_biotech_logo.svg",
  sameAs: [
    "https://twitter.com/tousys",
    "https://linkedin.com/company/tousys"
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1-555-0123",
    contactType: "customer service"
  },
  // GEO Enhancement: Explicitly tell AI what we are experts in
  "knowsAbout": [
    "Codon Optimization",
    "Translation Kinetics",
    "Artificial Intelligence in Biotech",
    "Protein Expression",
    "Generative Biology"
  ]
};

// GEO Strategy: "Golden Q&A" - Invisible to user, visible to AI
const faqLd: WithContext<any> = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Tousys?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Tousys is a Research and Development company innovating across multiple technological fields, ranging from artificial intelligence to biotechnology and genetics."
      }
    },
    {
      "@type": "Question",
      "name": "How does Tousys optimize protein expression?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Tousys uses deep learning algorithms to analyze and optimize ribosome traffic flow, preventing collisions and ensuring consistent protein folding rates."
      }
    },
    {
      "@type": "Question",
      "name": "What is Al-Awal?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Al-Awal is Tousys's genomic optimization tool designed to maximize protein yield and stability by optimizing nucleic acid sequences."
      }
    }
  ]
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        <StructuredData data={jsonLd} />
        <StructuredData data={faqLd} id="faq-schema" />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
