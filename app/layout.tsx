import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tousys | Engineering Progress",
  description: "We engineer progress with next-generation platforms",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
