import type { Metadata } from "next";
import { Playfair_Display, Special_Elite, Libre_Baskerville } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const specialElite = Special_Elite({
  subsets: ["latin"],
  variable: "--font-typewriter",
  weight: "400",
  display: "swap",
});

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Uncle Shaan",
  description: "Your cool uncle's guide to life. Scroll, pull a card, or take the quiz.",
  openGraph: {
    title: "Uncle Shaan",
    description: "Your cool uncle's guide to life.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${specialElite.variable} ${libreBaskerville.variable}`}
    >
      <body>
        <div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
