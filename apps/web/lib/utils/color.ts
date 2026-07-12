// OKLCH Color Utilities

import { formatHex, oklch } from "culori";

export const OKLCH_REGEX = /oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)\)/;

/**
 * Format an OKLCH color string from lightness, chroma, and hue values
 * @param lightness - Lightness value (0-1)
 * @param chroma - Chroma value (0-0.4 typical range)
 * @param hue - Hue value (0-360)
 * @returns OKLCH color string
 */
export function formatOklch(
  lightness: number,
  chroma: number,
  hue: number
): string {
  return `oklch(${lightness} ${chroma} ${hue})`;
}

/**
 * Parse an OKLCH color string into its components
 * @param oklchString - OKLCH color string (e.g., "oklch(0.65 0.2 180)")
 * @returns Object with l, c, h properties
 */
export function parseOklch(oklchString: string): {
  l: number;
  c: number;
  h: number;
} {
  const match = oklchString.match(OKLCH_REGEX);

  if (!match) {
    // Return fallback values if parsing fails
    return { c: 0.2, h: 0, l: 0.65 };
  }

  return {
    c: Number.parseFloat(match[2]),
    h: Number.parseFloat(match[3]),
    l: Number.parseFloat(match[1]),
  };
}

/**
 * Create a contrasting background color from a foreground color
 * Dark foreground → light background
 * Light foreground → dark background
 * @param foregroundColor - OKLCH color string
 * @returns OKLCH background color string
 */
export function createBackgroundColor(foregroundColor: string): string {
  const { l, c, h } = parseOklch(foregroundColor);

  // If foreground is light (>= 0.8), use a dark background
  if (l >= 0.8) {
    return formatOklch(0.15, c * 0.5, h); // Dark background with subtle hue
  }

  // If foreground is dark, use a light background
  return formatOklch(0.98, c * 0.3, h); // Light background with very subtle hue
}

/**
 * Convert an OKLCH color to a hex string for use in the QR code
 * @param l - Lightness value (0-1)
 * @param c - Chroma value
 * @param h - Hue value (0-360)
 * @returns Hex color string
 */
export function oklchToHex(l: number, c: number, h: number): string {
  try {
    const color = oklch({ c, h, l, mode: "oklch" });
    return formatHex(color) || "#000000";
  } catch (error) {
    console.error("Error converting OKLCH to HEX:", error);
    return "#000000";
  }
}
