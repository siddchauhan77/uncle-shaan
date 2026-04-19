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
  metadataBase: new URL("https://uncle-shaan.vercel.app"),
  title: "Uncle Shaan",
  description:
    "School taught you a lot. Uncle Shaan teaches you the rest. Pull a card, take the quiz, get your prescription.",
  openGraph: {
    title: "Uncle Shaan",
    description:
      "School taught you a lot. Uncle Shaan teaches you the rest.",
    siteName: "Uncle Shaan",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Uncle Shaan",
    description:
      "School taught you a lot. Uncle Shaan teaches you the rest.",
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

        {/* Global footer */}
        <footer
          className="w-full px-6 py-6 text-center"
          style={{ backgroundColor: "var(--paper)", borderTop: "1px solid rgba(26,16,8,0.1)" }}
        >
          <p
            className="text-[0.55rem] tracking-wider leading-relaxed"
            style={{ fontFamily: "var(--type)", color: "var(--ink-ghost)" }}
          >
            Fan-made project inspired by Shaan Puri / My First Million.
            Not affiliated with or endorsed by Shaan Puri.
          </p>
          <div className="flex justify-center gap-4 mt-2">
            <a
              href="https://uncle-sam-ten.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[0.55rem] tracking-[0.2em] uppercase transition-colors hover:underline"
              style={{ fontFamily: "var(--type)", color: "var(--rust)" }}
            >
              Uncle Sam →
            </a>
            <a
              href="https://mfm-pulse.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[0.55rem] tracking-[0.2em] uppercase transition-colors hover:underline"
              style={{ fontFamily: "var(--type)", color: "var(--ink-ghost)" }}
            >
              MFM Pulse →
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
