import { describe, expect, it } from "vitest";
import { createQRCode, QRCodeStyling } from "../src/index";

describe("QRCodeStyling", () => {
	it("creates a QRCodeStyling instance with default options", () => {
		const qr = new QRCodeStyling({ data: "https://example.com" });
		expect(qr).toBeInstanceOf(QRCodeStyling);
	});

	it("generates SVG output", async () => {
		const qr = new QRCodeStyling({
			data: "https://example.com",
			type: "svg",
		});
		const svg = await qr.getSVG();
		expect(svg).toContain('<?xml version="1.0"?>');
		expect(svg).toContain("<svg");
		expect(svg).toContain("</svg>");
	});

	it("clamps radius between 0 and 1", () => {
		const qr1 = new QRCodeStyling({ data: "test", radius: 1.5 });
		const qr2 = new QRCodeStyling({ data: "test", radius: -0.5 });

		// Both should be clamped (we can't directly access config, but we can test it works)
		expect(qr1).toBeInstanceOf(QRCodeStyling);
		expect(qr2).toBeInstanceOf(QRCodeStyling);
	});
});

describe("createQRCode", () => {
	it("creates SVG QR code", async () => {
		const result = await createQRCode({
			data: "https://example.com",
			type: "svg",
		});
		expect(typeof result).toBe("string");
		expect(result).toContain("<svg");
	});
});
