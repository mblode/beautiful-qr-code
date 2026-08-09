import type { Metadata } from "next";
import localFont from "next/font/local";

import { CraftedBy } from "@/components/crafted-by";

import "./globals.css";

const glide = localFont({
  src: [
    { path: "./fonts/glide-variable.woff2", style: "normal" },
    { path: "./fonts/glide-variable-italic.woff2", style: "italic" },
  ],
  variable: "--font-glide",
  weight: "100 950",
  display: "swap",
});

const glideMono = localFont({
  src: "./fonts/glide-mono.woff2",
  variable: "--font-glide-mono",
  weight: "400",
  display: "swap",
});

const siteUrl = "https://blode.co/beautiful-qr-code";
const productName = "Beautiful QR Code";
// Product first, then a colon, under 60 characters. Not a pipe, not a dash.
const siteTitle = `${productName}: free customizable QR code generator`;
const siteDescription =
  "Create stunning, customizable QR codes with rounded corners, custom colors, and embedded logos. A free, open-source QR code generator, no signup required.";

export const metadata: Metadata = {
  alternates: {
    canonical: siteUrl,
  },
  // blode.co, not mblode.com: the identity edge has to point at the site that
  // publishes https://blode.co/#person, or it credits an unrelated origin.
  authors: [{ name: "Matthew Blode", url: "https://blode.co" }],
  creator: "Matthew Blode",
  publisher: "Matthew Blode",
  applicationName: productName,
  description: siteDescription,
  keywords: [
    "qr code",
    "qr code generator",
    "qr generator",
    "beautiful qr",
    "custom qr code",
  ],
  metadataBase: new URL("https://blode.co"),
  openGraph: {
    description: siteDescription,
    // The person, not the product. All 33 zones are one site, and the product
    // name is already in og:title, so this is the only slot in the card that
    // can say who made the thing.
    siteName: "Matthew Blode",
    title: siteTitle,
    type: "website",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    creator: "@mattblode",
    description: siteDescription,
    title: siteTitle,
  },
  // Inner pages inherit the template; the app ships one route today, but a flat
  // string means anything added later has no title pattern to fall into.
  title: {
    default: siteTitle,
    template: `%s | ${productName}`,
  },
  verification: {
    google: "mFwyBIbXTaKK4uF_NA0MzVWFyY40hPgBjFObg3rje04",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${glide.variable} ${glideMono.variable}`} lang="en">
      <head>
        <link href={process.env.NEXT_PUBLIC_POSTHOG_HOST} rel="preconnect" />
      </head>
      <body className="font-sans antialiased">
        {children}
        <footer className="border-border border-t py-6">
          <div className="container mx-auto flex justify-center px-4">
            <CraftedBy />
          </div>
        </footer>
      </body>
    </html>
  );
}
