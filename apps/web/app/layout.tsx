import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { CraftedBy } from "@/components/crafted-by";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://beautiful-qr-code.blode.co"),
  title: "Beautiful QR Code - Generate Beautiful, Customizable QR Codes",
  description:
    "Create stunning, customizable QR codes with rounded corners, custom colors, and embedded logos. A free, open-source QR code generator — no signup required.",
  keywords: [
    "qr code",
    "qr code generator",
    "qr generator",
    "beautiful qr",
    "custom qr code",
  ],
  authors: [{ name: "Matthew Blode", url: "https://mblode.com" }],
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "mFwyBIbXTaKK4uF_NA0MzVWFyY40hPgBjFObg3rje04",
  },
  openGraph: {
    title: "Beautiful QR Code Generator",
    description:
      "Create stunning, customizable QR codes with rounded corners, custom colors, and embedded logos. A free, open-source online QR code generator.",
    url: "https://beautiful-qr-code.blode.co",
    siteName: "Beautiful QR Code",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <footer className="border-border border-t py-6">
          <div className="container mx-auto flex justify-center px-4">
            <CraftedBy />
          </div>
        </footer>
      </body>
      <GoogleAnalytics gaId="G-N8H7GZ9MTZ" />
    </html>
  );
}
