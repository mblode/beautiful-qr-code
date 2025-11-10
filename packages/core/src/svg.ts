import QRCodeModel from "qrcode-generator";
import type { QRCodeOptions } from "./types";
import { generateMoves } from "./utils";

interface QRCodeInstance {
  addData(data: string, mode?: string): void;
  make(): void;
  getModuleCount(): number;
  isDark(row: number, col: number): boolean;
}

// Cache for generateMoves() results to avoid regenerating on every SVG render
// Key: radius value (0-1), Value: moves object with path strings
const movesCache = new Map<number, Record<string, string>>();

const generateSvgPath = (
  matrix: boolean[][],
  options: QRCodeOptions,
): string => {
  const size = matrix.length;
  const radius = options.radius != null ? options.radius : 1;

  // Check cache first, generate and cache if not found
  let moves = movesCache.get(radius);
  if (!moves) {
    moves = generateMoves(options);
    movesCache.set(radius, moves);
  }

  const d /*drawn*/ = Array(size * 2 + 3)
    .fill(0)
    .map(() => Array(size + 1).fill(false) as boolean[]);
  const f /*filled*/ = [
    Array(size).fill(false) as boolean[],
    ...matrix,
    Array(size).fill(false) as boolean[],
  ].map((a) => [false, ...a, false] as boolean[]);

  const paths = [];
  for (let x = 0; x < size; x++)
    for (let y = 0; y < size * 2; y += 2)
      if (!d[y][x] && !f[y / 2][1 + x] && f[y / 2 + 1][1 + x]) {
        const lpaths = [`M${x * 2 + 1} ${y}`];
        let dir = 0;
        while (!d[y][x]) {
          d[y][x] = true;
          switch ((y % 2) * 2 + dir) {
            case 0b00: // Path going right
              x++;
              if (f[y / 2 + 1][1 + x]) {
                if (f[y / 2][1 + x]) {
                  lpaths.push(moves.ru);
                  dir = 0;
                  y--;
                } else {
                  lpaths.push(moves.r);
                }
              } else {
                lpaths.push(moves.rd);
                dir = 1;
                y++;
              }
              break;
            case 0b01: // Path going left
              if (f[y / 2][x]) {
                if (f[y / 2 + 1][x]) {
                  lpaths.push(moves.ld);
                  dir = 1;
                  y++;
                } else {
                  lpaths.push(moves.l);
                  x--;
                }
              } else {
                lpaths.push(moves.lu);
                dir = 0;
                y--;
              }
              break;
            case 0b10: // Path going up
              if (f[(y - 1) / 2][1 + x]) {
                if (f[(y - 1) / 2][1 + x - 1]) {
                  lpaths.push(moves.ul);
                  dir = 1;
                  x--;
                } else {
                  lpaths.push(moves.u);
                  y--;
                }
              } else {
                lpaths.push(moves.ur);
                dir = 0;
              }
              y--;
              break;
            case 0b11: // Path going down
              if (f[(y + 3) / 2][1 + x - 1]) {
                if (f[(y + 3) / 2][1 + x]) {
                  lpaths.push(moves.dr);
                  dir = 0;
                } else {
                  lpaths.push(moves.d);
                  y++;
                }
              } else {
                lpaths.push(moves.dl);
                dir = 1;
                x--;
              }
              y++;
              break;
          }
        }
        paths.push(lpaths.join(""));
      }
  return paths.join("");
};

const generateLogo = (size: number, logoUrl?: string): string => {
  const logoSize = size / 2;
  const logoOffset = size - logoSize / 2;

  const logoPos = {
    x: logoOffset.toFixed(2),
    y: logoOffset.toFixed(2),
    w: logoSize.toFixed(2),
    h: logoSize.toFixed(2),
  };

  if (logoUrl) {
    return `<g>
      <image href="${logoUrl}" x="${logoPos.x}" y="${logoPos.y}" width="${logoPos.w}" height="${logoPos.h}" preserveAspectRatio="xMidYMid meet" />
    </g>`;
  }

  // No default logo - return empty string
  return "";
};

const generateEyePath = (x: number, y: number, r: number): string => {
  // Outer ring (14x14) with inner hole (10x10 at offset 2,2)
  const outer = `M${x + r},${y}h${14 - 2 * r}a${r},${r} 0 0,1 ${r},${r}v${
    14 - 2 * r
  }a${r},${r} 0 0,1 -${r},${r}h-${14 - 2 * r}a${r},${r} 0 0,1 -${r},-${r}v-${
    14 - 2 * r
  }a${r},${r} 0 0,1 ${r},-${r}z`;
  const innerR = r * 0.7;
  const inner = `M${x + 2 + innerR},${
    y + 2
  }a${innerR},${innerR} 0 0,0 -${innerR},${innerR}v${
    10 - 2 * innerR
  }a${innerR},${innerR} 0 0,0 ${innerR},${innerR}h${
    10 - 2 * innerR
  }a${innerR},${innerR} 0 0,0 ${innerR},-${innerR}v-${
    10 - 2 * innerR
  }a${innerR},${innerR} 0 0,0 -${innerR},-${innerR}h-${10 - 2 * innerR}z`;

  // Center dot (6x6 at offset 4,4)
  const centerR = r * 0.5;
  const center = `M${x + 4 + centerR},${y + 4}h${
    6 - 2 * centerR
  }a${centerR},${centerR} 0 0,1 ${centerR},${centerR}v${
    6 - 2 * centerR
  }a${centerR},${centerR} 0 0,1 -${centerR},${centerR}h-${
    6 - 2 * centerR
  }a${centerR},${centerR} 0 0,1 -${centerR},-${centerR}v-${
    6 - 2 * centerR
  }a${centerR},${centerR} 0 0,1 ${centerR},-${centerR}z`;

  return `${outer}${inner}${center}`;
};

const generateEyes = (size: number, color: string, radius: number): string => {
  const r = Math.max(0.5, radius * 3);
  const positions = [
    [0, 0], // top-left
    [size * 2 - 14, 0], // top-right
    [0, size * 2 - 14], // bottom-left
  ];

  return positions
    .map(
      ([x, y]) =>
        `<path d="${generateEyePath(
          x,
          y,
          r,
        )}" fill="${color}" fill-rule="evenodd"/>`,
    )
    .join("\n");
};

const getMatrix = (data: string, options: QRCodeOptions): boolean[][] => {
  // Validate input data
  if (!data || data.trim().length === 0) {
    throw new Error("QR code data cannot be empty");
  }

  // Validate typeNumber is within valid range (0-40)
  if (options.typeNumber < 0 || options.typeNumber > 40) {
    throw new Error("TypeNumber must be between 0 and 40");
  }

  const qr = QRCodeModel(
    options.typeNumber,
    options.errorCorrectionLevel || "M",
  ) as QRCodeInstance;
  qr.addData(data, options.mode);
  qr.make();

  const size = qr.getModuleCount();
  const centerSpaceStart = Math.round(size / 3);
  const centerSpaceEnd = Math.round((size * 2) / 3);

  const matrix: boolean[][] = [];

  for (let i = 0; i < size; i++) {
    matrix[i] = [];
    for (let j = 0; j < size; j++) {
      // Add center space condition for logo
      if (
        options.hasLogo &&
        i >= centerSpaceStart &&
        i < centerSpaceEnd &&
        j >= centerSpaceStart &&
        j < centerSpaceEnd
      ) {
        matrix[i][j] = false;
      }
      // Check for "eyes" in the corners and avoid filling them
      else if (
        // top-left corner
        (i < 7 && j < 7) ||
        // top-right corner
        (i < 7 && j >= size - 7) ||
        // bottom-left corner
        (i >= size - 7 && j < 7)
      ) {
        matrix[i][j] = false;
      } else {
        matrix[i][j] = qr.isDark(i, j);
      }
    }
  }

  return matrix;
};

export const generateSVG = (data: string, options: QRCodeOptions): string => {
  const matrix = getMatrix(data, options);
  const size = matrix.length;
  const svgPath = generateSvgPath(matrix, options);
  const padding = 2 * options.padding;

  const viewBox = `${0 - padding} ${0 - padding} ${(size + padding) * 2} ${
    (size + padding) * 2
  }`;

  const logo = options.hasLogo ? generateLogo(size, options.logoUrl) : null;

  const eyes = generateEyes(size, options.foregroundColor, options.radius);

  // Add background rectangle if backgroundColor is not transparent
  const background =
    options.backgroundColor !== "transparent"
      ? `<rect x="${0 - padding}" y="${0 - padding}" width="${
          (size + padding) * 2
        }" height="${(size + padding) * 2}" fill="${options.backgroundColor}"/>`
      : "";

  return `<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" version="1.1" viewBox="${viewBox}">${background}<g class="layer">
  <title>Layer 1</title><path d="${svgPath}" fill-rule="evenodd" fill="${options.foregroundColor}" id="svg_1" /></g>${eyes}${logo}</svg>`;
};
