import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "Beautiful QR Code - Generate Beautiful, Customizable QR Codes",
	description:
		"Create stunning QR codes with rounded corners, custom colors, and logos. Free online QR code generator.",
	keywords: [
		"qr code",
		"qr code generator",
		"qr generator",
		"beautiful qr",
		"custom qr code",
	],
	authors: [{ name: "Matthew Blode", url: "https://mblode.com" }],
	openGraph: {
		title: "Beautiful QR Code Generator",
		description:
			"Create stunning QR codes with rounded corners, custom colors, and logos",
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
			<body>{children}</body>
			<GoogleAnalytics gaId="G-N8H7GZ9MTZ" />
		</html>
	);
}
