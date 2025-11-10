import { describe, expect, it } from "vitest";
import { getErrorCorrectionLevel, generateMoves } from "../src/utils";
import type { QRCodeOptions } from "../src/types";

describe("getErrorCorrectionLevel", () => {
  it("should return H when hasLogo is true and no level specified", () => {
    const level = getErrorCorrectionLevel(true);
    expect(level).toBe("H");
  });

  it("should return M when hasLogo is false and no level specified", () => {
    const level = getErrorCorrectionLevel(false);
    expect(level).toBe("M");
  });

  it("should use provided level when specified", () => {
    const level = getErrorCorrectionLevel(true, "L");
    expect(level).toBe("L");
  });

  it("should use provided level even when hasLogo is true", () => {
    const level = getErrorCorrectionLevel(true, "Q");
    expect(level).toBe("Q");
  });
});

describe("generateMoves", () => {
  const defaultOptions: QRCodeOptions = {
    typeNumber: 0,
    mode: "Byte",
    errorCorrectionLevel: "M",
    radius: 1,
    padding: 1,
    foregroundColor: "#000",
    backgroundColor: "transparent",
    hasLogo: false,
  };

  it("should generate moves object with all directions", () => {
    const moves = generateMoves(defaultOptions);

    expect(moves).toHaveProperty("r");
    expect(moves).toHaveProperty("l");
    expect(moves).toHaveProperty("u");
    expect(moves).toHaveProperty("d");
    expect(moves).toHaveProperty("ru");
    expect(moves).toHaveProperty("rd");
    expect(moves).toHaveProperty("lu");
    expect(moves).toHaveProperty("ld");
    expect(moves).toHaveProperty("ur");
    expect(moves).toHaveProperty("ul");
    expect(moves).toHaveProperty("dr");
    expect(moves).toHaveProperty("dl");
  });

  it("should generate SVG path strings", () => {
    const moves = generateMoves(defaultOptions);

    // All moves should be strings
    expect(typeof moves.r).toBe("string");
    expect(typeof moves.l).toBe("string");
    expect(typeof moves.u).toBe("string");
    expect(typeof moves.d).toBe("string");

    // Should contain SVG path commands
    expect(moves.r.length).toBeGreaterThan(0);
  });

  it("should handle radius 0 (sharp corners)", () => {
    const moves = generateMoves({ ...defaultOptions, radius: 0 });
    expect(moves).toBeTruthy();
    expect(moves.r).toBeTruthy();
  });

  it("should handle radius 1 (fully rounded)", () => {
    const moves = generateMoves({ ...defaultOptions, radius: 1 });
    expect(moves).toBeTruthy();
    expect(moves.r).toBeTruthy();
  });

  it("should generate different moves for different radius values", () => {
    const movesSharp = generateMoves({ ...defaultOptions, radius: 0 });
    const movesRounded = generateMoves({ ...defaultOptions, radius: 1 });

    // Check corner moves which should differ based on radius
    expect(movesSharp.ru).not.toBe(movesRounded.ru);
    expect(movesSharp.rd).not.toBe(movesRounded.rd);
  });
});
