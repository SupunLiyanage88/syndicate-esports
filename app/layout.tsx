import type { Metadata } from "next";
import { Rajdhani, Inter, Orbitron } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const russoOne = Russo_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-russo",
  display: "swap",
});

const chakraPetch = Chakra_Petch({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-chakra",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-orbitron",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ascendant League Season 1 | Syndicate Esports",
  description:
    "Sri Lanka's premier Mobile Legends: Bang Bang 5v5 tournament. Register your team and compete for glory.",
  keywords: [
    "MLBB",
    "Mobile Legends",
    "esports",
    "tournament",
    "Sri Lanka",
    "Syndicate Esports",
    "Ascendant League",
  ],
  openGraph: {
    title: "Ascendant League Season 1 | Syndicate Esports",
    description:
      "Sri Lanka's premier MLBB 5v5 tournament. Register now.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${rajdhani.variable} ${inter.variable}`}>
      <body className="font-inter bg-background text-white antialiased">
        <Navbar />
        <main className="min-h-screen pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
