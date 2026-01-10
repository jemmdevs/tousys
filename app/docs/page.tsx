import Navbar from "@/components/Navbar";
import PreFooter from "@/components/PreFooter";
import Footer from "@/components/Footer";

export default function DocsPage() {
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
                    Documentation for Alawal Biotech's platform is currently under development.
                    API references, integration guides, and usage examples will be published here.
                </p>
            </main>
            <PreFooter />
            <Footer />
        </>
    );
}
