"use client";

import { Check, Download } from "lucide-react";
import { useState, useMemo, useCallback, useRef } from "react";
import {
  BeautifulQRCode,
  type BeautifulQRCodeRef,
} from "@beautiful-qr-code/react";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createBackgroundColor } from "@/lib/utils/color";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface Color {
  hue: number;
  saturation: number;
  lightness: number;
  oklch: string;
}

interface SaturationLevel {
  sat: number;
  lightness: number;
  hue: number;
}

// ============================================================================
// CONSTANTS & UTILITIES
// ============================================================================

const GRID_SIZE = 4;
const COLORS_PER_ROW = 4;
const CHROMATIC_COLORS = 16;
const HUE_STEP = 360 / CHROMATIC_COLORS;

// Generate color palette with OKLCH colors
const generateColorPalette = (saturation: number): Color[] => {
  const colors: Color[] = [];
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < COLORS_PER_ROW; col++) {
      const hue = (row * COLORS_PER_ROW + col) * HUE_STEP;
      colors.push({
        hue,
        saturation,
        lightness: 0.65,
        oklch: `oklch(0.65 ${saturation} ${hue})`,
      });
    }
  }
  return colors;
};

// Generate saturation levels based on current hue
const generateSaturationLevels = (hue: number): SaturationLevel[] => [
  { sat: 0.25, lightness: 0.58, hue },
  { sat: 0.2, lightness: 0.6, hue },
  { sat: 0.15, lightness: 0.62, hue },
  { sat: 0.1, lightness: 0.65, hue },
  { sat: 0.05, lightness: 0.68, hue },
];

// Grayscale colors
const GRAYSCALE_LIGHTNESS_LEVELS = [0, 0.33, 0.66, 1.0] as const;

const generateGrayscaleRow = (): Color[] => {
  return GRAYSCALE_LIGHTNESS_LEVELS.map((lightness) => ({
    hue: 0,
    saturation: 0,
    lightness,
    oklch: `oklch(${lightness} 0 0)`,
  }));
};

// Helper to parse OKLCH string
const parseOklch = (
  oklchString: string
): { l: number; c: number; h: number } => {
  const match = oklchString.match(/oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)\)/);
  if (!match) {
    return { l: 0.65, c: 0.2, h: 0 };
  }
  return {
    l: parseFloat(match[1]),
    c: parseFloat(match[2]),
    h: parseFloat(match[3]),
  };
};

// Helper to format OKLCH string
const formatOklch = (
  lightness: number,
  chroma: number,
  hue: number
): string => {
  return `oklch(${lightness} ${chroma} ${hue})`;
};

// Helper to convert OKLCH to hex for QR code
const oklchToHex = (oklchString: string): string => {
  // Guard against SSR - return black if document is not available
  if (typeof document === "undefined") return "#000000";

  // For now, we'll use a simplified conversion
  // In production, you'd want to use a proper color conversion library
  const { l, c, h } = parseOklch(oklchString);

  // Convert OKLCH to RGB (simplified - this is approximate)
  // For a proper implementation, use a library like culori
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 1;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "#000000";

  ctx.fillStyle = oklchString;
  ctx.fillRect(0, 0, 1, 1);
  const imageData = ctx.getImageData(0, 0, 1, 1).data;

  const r = imageData[0].toString(16).padStart(2, "0");
  const g = imageData[1].toString(16).padStart(2, "0");
  const b = imageData[2].toString(16).padStart(2, "0");

  return `#${r}${g}${b}`;
};

export function SimpleQRPlayground() {
  const [url, setUrl] = useState("https://example.com");
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [rememberedSaturationIndex, setRememberedSaturationIndex] = useState(2); // Start at middle saturation
  const [radius, setRadius] = useState<0 | 0.5 | 1>(0.5);
  const [isAnimating, setIsAnimating] = useState(false);

  // Ref for QR code component to access download methods
  const qrRef = useRef<BeautifulQRCodeRef>(null);

  // Generate color palette based on remembered saturation index
  const selectedSaturation = useMemo(() => {
    // Get a reference hue from selected color index (use default if grayscale)
    const isGrayscale = selectedColorIndex >= CHROMATIC_COLORS;
    const tempHue = isGrayscale ? 0 : selectedColorIndex * HUE_STEP;
    const levels = generateSaturationLevels(tempHue);
    return levels[rememberedSaturationIndex].sat;
  }, [rememberedSaturationIndex, selectedColorIndex]);

  const colorPalette = useMemo(
    () => [
      ...generateColorPalette(selectedSaturation),
      ...generateGrayscaleRow(),
    ],
    [selectedSaturation]
  );

  const selectedColor = colorPalette[selectedColorIndex];

  // Get current color's OKLCH values from the dynamic palette
  const currentOklch = useMemo(() => {
    return selectedColor
      ? parseOklch(selectedColor.oklch)
      : { l: 0.65, c: 0.15, h: 0 };
  }, [selectedColor]);

  const saturationLevels = useMemo(
    () => generateSaturationLevels(currentOklch.h),
    [currentOklch.h]
  );

  const saturationIndex = rememberedSaturationIndex;

  // Safety check - don't render QR if color is undefined
  const hasValidColor =
    selectedColor && selectedColor.oklch && selectedColor.oklch.length > 0;

  const handleColorSelect = useCallback((index: number) => {
    setSelectedColorIndex(index);
  }, []);

  const handleSaturationClick = useCallback(() => {
    const maxIndex = saturationLevels.length - 1;
    const isCycling = saturationIndex === maxIndex;

    // Only trigger animation when cycling from last to first
    if (isCycling) {
      setIsAnimating(true);
      // Reset animation flag after animation completes
      // Animation duration: 150ms + (4 bars * 150ms stagger) = 750ms total
      setTimeout(() => setIsAnimating(false), 750);
    }

    // Cycle through saturation levels, wrapping back to 0
    const nextIndex = isCycling ? 0 : saturationIndex + 1;

    // Update the remembered saturation index, which will trigger palette regeneration
    // The same selectedColorIndex will now point to a color with the new saturation
    setRememberedSaturationIndex(nextIndex);
  }, [saturationIndex, saturationLevels]);

  // Download handlers
  const handleDownloadPNG = useCallback(() => {
    qrRef.current?.download({ name: "qr-code", extension: "png" });
  }, []);

  const handleDownloadSVG = useCallback(() => {
    qrRef.current?.download({ name: "qr-code", extension: "svg" });
  }, []);

  // Ensure URL is valid for QR code rendering
  const validUrl = url.trim() || "https://example.com";

  // Convert OKLCH to hex for the QR code
  const qrColor = hasValidColor ? oklchToHex(selectedColor.oklch) : "#000000";

  // Generate contrasting background color
  const backgroundColor = useMemo(() => {
    if (!hasValidColor) return "#ffffff";
    const bgOklch = createBackgroundColor(selectedColor.oklch);
    return oklchToHex(bgOklch);
  }, [hasValidColor, selectedColor]);

  return (
    <div className="grid gap-1 lg:grid-cols-2 p-1">
      {/* Left: QR Preview */}
      <div
        className="rounded-3xl p-12 flex items-center justify-center relative lg:min-h-[calc(100dvh-8px)]"
        style={{ background: backgroundColor }}
      >
        <div className="flex aspect-square w-full max-w-[200px] lg:max-w-[300px] items-center justify-center relative">
          {hasValidColor ? (
            <div>
              <BeautifulQRCode
                ref={qrRef}
                data={validUrl}
                foregroundColor={qrColor}
                backgroundColor={backgroundColor}
                radius={radius}
                padding={5}
                className="w-full aspect-square flex items-center justify-center [&>svg]:w-full [&>svg]:h-full"
              />
            </div>
          ) : (
            <div className="w-full max-w-sm aspect-square flex items-center justify-center text-gray-400">
              Enter data to generate QR code
            </div>
          )}
        </div>
      </div>

      {/* Right: Controls */}
      <div className="bg-gray-100 rounded-3xl px-4 py-12 lg:px-12 lg:min-h-[calc(100dvh-8px)] flex items-center justify-center">
        <div className="w-full max-w-[600px] mx-auto space-y-1">
          {/* URL Input */}
          <Field
            orientation="horizontal"
            className="bg-white rounded-full min-h-14 gap-0"
          >
            <FieldLabel className="px-6 py-2 min-w-[200px] cursor-pointer">
              URL
            </FieldLabel>
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="h-14 rounded-full border-0 focus-visible:ring-0"
            />
          </Field>

          {/* Hue and Saturation Picker */}
          <div className="rounded-3xl bg-white p-2 flex flex-row flex-wrap items-start justify-between gap-2">
            <Label className="p-4">Hue and saturation</Label>

            <div className="flex size-full min-w-[276px] sm:max-w-[276px] gap-2">
              {/* Color grid */}
              <div className="flex flex-col flex-1 min-w-0 gap-2">
                {[0, 1, 2, 3].map((row) => {
                  const selectedRow = Math.floor(selectedColorIndex / 4);
                  const selectedCol = selectedColorIndex % 4;
                  const isSelectedRow = row === selectedRow;
                  const rowHeight = isSelectedRow ? 72 : 36;

                  return (
                    <div
                      key={row}
                      className="flex gap-2 transition-all duration-300 ease-out"
                      style={{ height: rowHeight }}
                    >
                      {[0, 1, 2, 3].map((col) => {
                        const index = row * 4 + col;
                        const color = colorPalette[index];
                        const isSelected = selectedColorIndex === index;
                        const isSelectedCol = col === selectedCol;

                        const widthFraction = isSelectedCol ? 2 : 1;
                        const totalFractions = 5;
                        const widthPercent =
                          (widthFraction / totalFractions) * 100;

                        return (
                          <button
                            key={index}
                            className="relative overflow-hidden cursor-pointer transition-all duration-300 ease-out active:scale-95"
                            style={{
                              backgroundColor: color.oklch,
                              borderRadius: 20,
                              border: "none",
                              height: "100%",
                              width: `${widthPercent}%`,
                            }}
                            onClick={() => handleColorSelect(index)}
                            aria-label={`Hue ${color.hue}`}
                          >
                            {isSelected && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Check
                                  className="text-white relative z-10 size-4"
                                  strokeWidth={4}
                                />
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  );
                })}

                {/* Grayscale row */}
                {(() => {
                  const selectedRow = Math.floor(
                    selectedColorIndex / COLORS_PER_ROW
                  );
                  const selectedCol = selectedColorIndex % COLORS_PER_ROW;
                  const grayscaleRow = GRID_SIZE;
                  const isSelectedRow = selectedRow === grayscaleRow;
                  const rowHeight = isSelectedRow ? 72 : 36;

                  return (
                    <div
                      className="flex gap-2 transition-all duration-300 ease-out"
                      style={{ height: rowHeight }}
                    >
                      {generateGrayscaleRow().map((color, col) => {
                        const grayscaleIndex = CHROMATIC_COLORS + col;
                        const isSelected =
                          selectedColorIndex === grayscaleIndex;
                        const isSelectedCol = col === selectedCol;

                        const widthFraction = isSelectedCol ? 2 : 1;
                        const totalFractions = 5;
                        const widthPercent =
                          (widthFraction / totalFractions) * 100;

                        const isWhite = color.lightness >= 0.95;
                        const boxShadow = isWhite
                          ? "inset 0 0 0 1px rgba(0, 0, 0, 0.1)"
                          : "none";

                        return (
                          <button
                            key={grayscaleIndex}
                            className="relative overflow-hidden cursor-pointer transition-all duration-300 ease-out active:scale-95"
                            style={{
                              backgroundColor: color.oklch,
                              borderRadius: 20,
                              boxShadow,
                              height: "100%",
                              width: `${widthPercent}%`,
                            }}
                            onClick={() => handleColorSelect(grayscaleIndex)}
                            aria-label={`Grayscale ${Math.round(
                              color.lightness * 100
                            )}%`}
                          >
                            {isSelected && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Check
                                  className={`relative z-10 size-4 ${
                                    color.lightness < 0.5
                                      ? "text-white"
                                      : "text-black"
                                  }`}
                                  strokeWidth={4}
                                />
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  );
                })()}
              </div>

              {/* Saturation selector */}
              <button
                type="button"
                className="bg-gray-100 cursor-pointer p-2 transition-transform duration-200 ease-out active:scale-[0.97]"
                style={{
                  borderRadius: 20,
                  width: 64,
                }}
                onClick={handleSaturationClick}
                aria-label="Cycle saturation levels"
              >
                <div className="flex flex-col justify-end h-full gap-2">
                  {saturationLevels.map((level, index) => {
                    if (index < saturationIndex) return null;

                    // Calculate stagger delay: top bar appears first, bottom bar last
                    const totalBars = saturationLevels.length - saturationIndex;
                    const distanceFromTop = index - saturationIndex;
                    const staggerDelay =
                      (totalBars - distanceFromTop - 1) * 150; // 150ms between each

                    return (
                      <div
                        key={index}
                        className="relative [@media(hover:hover)]:hover:scale-[1.03] transition-transform duration-200 ease-out"
                        style={{
                          backgroundColor: `oklch(${level.lightness} ${level.sat} ${level.hue})`,
                          borderRadius: 12,
                          height: 40,
                          border: "none",
                          transformOrigin: "bottom",
                          animation: isAnimating
                            ? `scaleIn 150ms cubic-bezier(0.34, 1.56, 0.64, 1) ${staggerDelay}ms backwards`
                            : "none",
                        }}
                      />
                    );
                  })}
                </div>
              </button>
            </div>
          </div>

          {/* Corner Radius */}
          <div className="flex flex-row bg-white rounded-3xl w-full min-h-14">
            <Label className="pl-6 pr-4 py-4 min-w-[200px]">Corners</Label>

            <div className="flex w-full flex-row items-center justify-end">
              {([0, 0.5, 1] as const).map((value) => {
                const SIZE = 40;
                const isSelected = radius === value;
                const isWhite =
                  hasValidColor && selectedColor.lightness >= 0.95;
                const boxShadow = isWhite
                  ? "inset 0 0 0 1px rgba(0, 0, 0, 0.1)"
                  : "none";
                const colorOklch = hasValidColor
                  ? selectedColor.oklch
                  : "oklch(0 0 0)";

                return (
                  <button
                    key={value}
                    className="cursor-pointer py-2 pr-2"
                    onClick={() => setRadius(value)}
                  >
                    <div
                      className="relative cursor-pointer transition-transform duration-200 ease-out [@media(hover:hover)]:hover:scale-105 active:scale-95"
                      style={{
                        borderRadius: (value * SIZE) / 2,
                        background: colorOklch,
                        boxShadow,
                        width: SIZE,
                        height: SIZE,
                      }}
                    >
                      {isSelected && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Check
                            className={`relative z-10 size-4 ${
                              hasValidColor && selectedColor.lightness < 0.5
                                ? "text-white"
                                : "text-black"
                            }`}
                            strokeWidth={4}
                          />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Download Buttons */}
          <div className="flex flex-row bg-white rounded-3xl w-full min-h-14">
            <Label className="pl-6 pr-4 py-4 min-w-[200px]">Download</Label>

            <div className="flex w-full flex-row items-center justify-end gap-2 pr-2">
              <button
                onClick={handleDownloadSVG}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 rounded-full cursor-pointer transition-all duration-200 ease-out [@media(hover:hover)]:hover:bg-gray-200 active:scale-95"
                aria-label="Download SVG"
              >
                <Download className="size-4" />
                <span className="text-sm font-medium">SVG</span>
              </button>

              <button
                onClick={handleDownloadPNG}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 rounded-full cursor-pointer transition-all duration-200 ease-out [@media(hover:hover)]:hover:bg-gray-200 active:scale-95"
                aria-label="Download PNG"
              >
                <Download className="size-4" />
                <span className="text-sm font-medium">PNG</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
