import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";
import { generateSVG } from "../src/svg";
import type { QRCodeOptions } from "../src/types";

const PATH_REGEX =
  /<path d="([^"]+)" fill-rule="evenodd" fill="[^"]+" id="svg_1"/;

describe("generateSVG", () => {
  const defaultOptions: QRCodeOptions = {
    typeNumber: 0,
    mode: "Byte",
    errorCorrectionLevel: "M",
    radius: 1,
    padding: 1,
    foregroundColor: "#000000",
    backgroundColor: "transparent",
    hasLogo: false,
  };

  it("should generate valid SVG markup", () => {
    const svg = generateSVG("https://example.com", defaultOptions);
    expect(svg).toContain('<?xml version="1.0"?>');
    expect(svg).toContain("<svg");
    expect(svg).toContain("</svg>");
    expect(svg).toContain("xmlns");
  });

  it("should include data in QR code", () => {
    const svg = generateSVG("test-data", defaultOptions);
    expect(svg).toContain("<path");
    expect(svg).toBeTruthy();
  });

  it("should generate stable main path for example.com", () => {
    const svg = generateSVG("https://example.com", defaultOptions);
    const match = svg.match(PATH_REGEX);
    expect(match).toBeTruthy();
    const d = match?.[1] ?? "";
    expect(d.length).toBe(5548);
    const digest = createHash("sha256").update(d).digest("hex");
    expect(digest).toBe(
      "9d444200301b4b0cfc21832bfbfe47d8e9e4bc3588a24512b238a38933f6f493",
    );
  });

  it("should use custom foreground color", () => {
    const svg = generateSVG("test", {
      ...defaultOptions,
      foregroundColor: "#ff0000",
    });
    expect(svg).toContain('fill="#ff0000"');
  });

  it("should add background rectangle when background is not transparent", () => {
    const svg = generateSVG("test", {
      ...defaultOptions,
      backgroundColor: "#ffffff",
    });
    expect(svg).toContain("<rect");
    expect(svg).toContain('fill="#ffffff"');
  });

  it("should not add background rectangle when transparent", () => {
    const svg = generateSVG("test", {
      ...defaultOptions,
      backgroundColor: "transparent",
    });
    const rectCount = (svg.match(/<rect/g) || []).length;
    expect(rectCount).toBe(0);
  });

  it("should handle different radius values", () => {
    const svgSharp = generateSVG("test", { ...defaultOptions, radius: 0 });
    const svgRounded = generateSVG("test", { ...defaultOptions, radius: 1 });

    expect(svgSharp).toBeTruthy();
    expect(svgRounded).toBeTruthy();
    expect(svgSharp).not.toBe(svgRounded);
  });

  it("should handle different padding values", () => {
    const svgNoPadding = generateSVG("test", { ...defaultOptions, padding: 0 });
    const svgWithPadding = generateSVG("test", {
      ...defaultOptions,
      padding: 2,
    });

    expect(svgNoPadding).toContain("viewBox");
    expect(svgWithPadding).toContain("viewBox");
    expect(svgNoPadding).not.toBe(svgWithPadding);
  });

  it("should include eyes (corner squares)", () => {
    const svg = generateSVG("test", defaultOptions);
    // Should have 3 eye paths
    const pathMatches = svg.match(/fill-rule="evenodd"/g);
    expect(pathMatches).toBeTruthy();
    expect(pathMatches?.length).toBeGreaterThanOrEqual(3);
  });

  it("should handle logo URL", () => {
    const svg = generateSVG("test", {
      ...defaultOptions,
      hasLogo: true,
      logoUrl: "https://example.com/logo.png",
    });
    expect(svg).toContain("<image");
    expect(svg).toContain('href="https://example.com/logo.png"');
  });

  it("should clear center space when hasLogo is true", () => {
    const svgWithLogo = generateSVG("test", {
      ...defaultOptions,
      hasLogo: true,
    });
    const svgWithoutLogo = generateSVG("test", {
      ...defaultOptions,
      hasLogo: false,
    });

    expect(svgWithLogo).toBeTruthy();
    expect(svgWithoutLogo).toBeTruthy();
    // With logo should have less path data (center cleared)
    expect(svgWithLogo.length).not.toBe(svgWithoutLogo.length);
  });

  it("should handle different error correction levels", () => {
    const svgL = generateSVG("test", {
      ...defaultOptions,
      errorCorrectionLevel: "L",
    });
    const svgH = generateSVG("test", {
      ...defaultOptions,
      errorCorrectionLevel: "H",
    });

    expect(svgL).toBeTruthy();
    expect(svgH).toBeTruthy();
  });
});
