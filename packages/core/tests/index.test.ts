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

  it("clamps radius above 1 down to 1", async () => {
    const clamped = await new QRCodeStyling({
      data: "test",
      radius: 1.5,
    }).getSVG();
    const atMax = await new QRCodeStyling({ data: "test", radius: 1 }).getSVG();
    expect(clamped).toBe(atMax);
  });

  it("clamps negative radius up to 0", async () => {
    const clamped = await new QRCodeStyling({
      data: "test",
      radius: -0.5,
    }).getSVG();
    const atMin = await new QRCodeStyling({ data: "test", radius: 0 }).getSVG();
    expect(clamped).toBe(atMin);
  });

  it("ignores explicit undefined config values and keeps defaults", async () => {
    const svg = await new QRCodeStyling({
      data: "test",
      foregroundColor: undefined,
    }).getSVG();
    expect(svg).toContain('fill="#000"');
    expect(svg).not.toContain("undefined");
  });

  it("rejects getSVG when data is empty", async () => {
    await expect(new QRCodeStyling({ data: "" }).getSVG()).rejects.toThrow();
  });

  it("rejects getSVG when data is only whitespace", async () => {
    await expect(new QRCodeStyling({ data: "   " }).getSVG()).rejects.toThrow();
  });

  it("returns a promise from update()", async () => {
    const qr = new QRCodeStyling({ data: "test" });
    const result = qr.update({ radius: 0 });
    expect(result).toBeInstanceOf(Promise);
    await result;
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
