import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata: Metadata = {
  title: "OB Solutions | AI & Technology Consulting — Oussama Bousselsal",
  description: "Boutique AI, cloud, and digital transformation consulting by Oussama Bousselsal, Ing. — 10+ years, $25M+ portfolio, SAFe 6 & ITIL V4 certified. Montréal, Canada.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full flex flex-col bg-white text-slate-900" suppressHydrationWarning>
        <LanguageProvider>
          <ScrollProgress />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
