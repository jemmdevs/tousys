import Navbar from "@/components/Navbar";
import PreFooter from "@/components/PreFooter";
import Footer from "@/components/Footer";

export default function TermsPage() {
    return (
        <>
            <Navbar />
            <main style={{
                minHeight: "60vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "8rem 2rem 4rem",
                fontFamily: "system-ui, -apple-system, sans-serif",
            }}>
                <p style={{
                    fontSize: "1rem",
                    color: "#6b7280",
                    textAlign: "center",
                    maxWidth: "500px",
                    lineHeight: 1.7,
                }}>
                    By using Alawal Biotech services, you agree to our terms of use.
                    All genomic data processed through our platform remains your property.
                    We ensure compliance with international data protection regulations.
                </p>
            </main>
            <PreFooter />
            <Footer />
        </>
    );
}
