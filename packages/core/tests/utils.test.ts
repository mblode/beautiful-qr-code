import { afterEach, describe, expect, it, vi } from "vitest";

import type { QRCodeOptions } from "../src/types";
import {
  generateMoves,
  getErrorCorrectionLevel,
  imageUrlToDataUrl,
} from "../src/utils";

const NOT_FOUND_STATUS_REGEX = /404/;

describe("imageUrlToDataUrl", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("rejects when the response is not ok", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
        statusText: "Not Found",
      })
    );

    await expect(
      imageUrlToDataUrl("https://example.com/missing.png")
    ).rejects.toThrow(NOT_FOUND_STATUS_REGEX);
  });

  it("returns a data URL using the response content-type", async () => {
    const bytes = new Uint8Array([1, 2, 3]);
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        arrayBuffer: () => Promise.resolve(bytes.buffer),
        headers: { get: () => "image/jpeg" },
        ok: true,
      })
    );

    const result = await imageUrlToDataUrl("https://example.com/logo.jpg");
    expect(result).toBe("data:image/jpeg;base64,AQID");
  });

  it("falls back to image/png when no content-type header is present", async () => {
    const bytes = new Uint8Array([1, 2, 3]);
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        arrayBuffer: () => Promise.resolve(bytes.buffer),
        headers: { get: () => null },
        ok: true,
      })
    );

    const result = await imageUrlToDataUrl("https://example.com/logo");
    expect(result).toBe("data:image/png;base64,AQID");
  });
});

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
    backgroundColor: "transparent",
    errorCorrectionLevel: "M",
    foregroundColor: "#000",
    hasLogo: false,
    mode: "Byte",
    padding: 1,
    radius: 1,
    typeNumber: 0,
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
