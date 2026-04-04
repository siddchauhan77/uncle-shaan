import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#FAFAF8] text-[#111111]">
        {children}
      </body>
    </html>
  );
}
