// OKLCH Color Utilities

/**
 * Format an OKLCH color string from lightness, chroma, and hue values
 * @param lightness - Lightness value (0-1)
 * @param chroma - Chroma value (0-0.4 typical range)
 * @param hue - Hue value (0-360)
 * @returns OKLCH color string
 */
export function formatOklch(lightness: number, chroma: number, hue: number): string {
  return `oklch(${lightness} ${chroma} ${hue})`
}

/**
 * Parse an OKLCH color string into its components
 * @param oklchString - OKLCH color string (e.g., "oklch(0.65 0.2 180)")
 * @returns Object with l, c, h properties
 */
export function parseOklch(oklchString: string): { l: number; c: number; h: number } {
  const match = oklchString.match(/oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)\)/)

  if (!match) {
    // Return fallback values if parsing fails
    return { l: 0.65, c: 0.2, h: 0 }
  }

  return {
    l: parseFloat(match[1]),
    c: parseFloat(match[2]),
    h: parseFloat(match[3]),
  }
}

/**
 * Create a contrasting background color from a foreground color
 * Dark foreground → light background
 * Light foreground → dark background
 * @param foregroundColor - OKLCH color string
 * @returns OKLCH background color string
 */
export function createBackgroundColor(foregroundColor: string): string {
  const { l, c, h } = parseOklch(foregroundColor)

  // If foreground is light (>= 0.8), use a dark background
  if (l >= 0.8) {
    return formatOklch(0.15, c * 0.5, h) // Dark background with subtle hue
  }

  // If foreground is dark, use a light background
  return formatOklch(0.98, c * 0.3, h) // Light background with very subtle hue
}

/**
 * Get appropriate text color (black or white) based on background color
 * Uses lightness to determine contrast
 * @param backgroundColor - OKLCH color string
 * @returns Black or white color string
 */
export function getContrastTextColor(backgroundColor: string): string {
  const { l } = parseOklch(backgroundColor)

  // If background is light (> 0.5), use dark text
  if (l > 0.5) {
    return 'oklch(0 0 0)' // Black
  }

  // If background is dark, use light text
  return 'oklch(1 0 0)' // White
}
