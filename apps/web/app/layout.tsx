import type { Metadata } from "next";

import { CraftedBy } from "@/components/crafted-by";

import "./globals.css";

const siteUrl = "https://blode.co/beautiful-qr-code";

export const metadata: Metadata = {
  alternates: {
    canonical: siteUrl,
  },
  authors: [{ name: "Matthew Blode", url: "https://mblode.com" }],
  description:
    "Create stunning, customizable QR codes with rounded corners, custom colors, and embedded logos. A free, open-source QR code generator — no signup required.",
  keywords: [
    "qr code",
    "qr code generator",
    "qr generator",
    "beautiful qr",
    "custom qr code",
  ],
  metadataBase: new URL("https://blode.co"),
  openGraph: {
    description:
      "Create stunning, customizable QR codes with rounded corners, custom colors, and embedded logos. A free, open-source online QR code generator.",
    siteName: "Beautiful QR Code",
    title: "Beautiful QR Code Generator",
    type: "website",
    url: siteUrl,
  },
  title: "Beautiful QR Code - Generate Beautiful, Customizable QR Codes",
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
    <html lang="en">
      <head>
        <link href="https://r.blode.co" rel="preconnect" />
      </head>
      <body>
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
