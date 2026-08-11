import type { Metadata } from "next";
import { Geist, Geist_Mono, Michroma, Varela_Round } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Loader } from "@/components/ui/loader";
import { Suspense } from "react";
import "./globals.css";

import localFont from "next/font/local";

export const metadata: Metadata = {
  title: "Seema Enterprise - Printing & Paper Converting Machinery",
  description:
    "Leading supplier of printing and paper-converting machinery, consumables, and services. Quality equipment and reliable support since 1992.",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  generator: "fourbit.io",
  keywords:
    "printing machinery, paper converting, industrial equipment, machinery supplier, printing equipment, seema enterprise",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bodoniBlack = localFont({
  src: "../public/fonts/Bodoni-MT-Black.woff2",
  weight: "900",
  variable: "--font-heading",
});

const michroma = Michroma({
  weight: "400", // Michroma only ships one weight
  subsets: ["latin"],
  variable: "--font-heading",
});

const arialRounded = localFont({
  src: "../public/fonts/Arial-Rounded-MT-Bold.woff2",
  weight: "900",
  variable: "--font-heading",
});
//Arial-Rounded-MT-Bold.woff2

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${arialRounded.variable}  antialiased`}>
        <Suspense fallback={<Loader className="min-h-screen" />}>
          <Navigation />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </Suspense>
        <Analytics />
      </body>
    </html>
  );
}
