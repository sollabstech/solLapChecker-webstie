import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Providers from "@/components/Providers";
import { SITE } from "@/lib/site";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const TITLE = "SolLapChecker – Free Laptop Health Check Tool for Windows | Sollabs Tech";
const DESCRIPTION =
  "SolLapChecker is a free, offline Windows tool that tests laptop battery, SSD, CPU, GPU, keyboard, touchpad, webcam, speakers and mic, then gives you one certified health report. Test before you trust.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: SITE.name,
  keywords: [
    "laptop health check",
    "laptop diagnostic tool",
    "battery health test",
    "SSD health SMART",
    "CPU stress test",
    "GPU stress test",
    "keyboard test",
    "used laptop checker",
    "Windows laptop test",
    "Sollabs Tech",
  ],
  authors: [{ name: SITE.company, url: SITE.companyUrl }],
  creator: SITE.company,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE.url,
    siteName: SITE.name,
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "SolLapChecker – laptop health check for Windows" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0B1F3A",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: SITE.name,
  operatingSystem: "Windows 10, Windows 11",
  applicationCategory: "UtilitiesApplication",
  description: DESCRIPTION,
  url: SITE.url,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: { "@type": "Organization", name: SITE.company, url: SITE.companyUrl },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
