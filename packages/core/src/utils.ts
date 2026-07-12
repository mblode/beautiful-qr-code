import type { ErrorCorrectionLevel, QRCodeOptions } from "./types";

// Encode bytes to base64 in chunks to avoid a call-stack overflow from
// spreading a large byte array into String.fromCharCode at once.
const BASE64_CHUNK_SIZE = 8192;

export const imageUrlToDataUrl = async (url: string): Promise<string> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch logo image from ${url}: ${response.status} ${response.statusText}`
    );
  }

  const buffer = await response.arrayBuffer();
  const bytes = new Uint8Array(buffer);

  let binary = "";
  for (let i = 0; i < bytes.length; i += BASE64_CHUNK_SIZE) {
    const chunk = bytes.subarray(i, i + BASE64_CHUNK_SIZE);
    binary += String.fromCodePoint(...chunk);
  }

  const base64 = btoa(binary);
  const contentType = response.headers.get("content-type") ?? "image/png";

  return `data:${contentType};base64,${base64}`;
};

export const getErrorCorrectionLevel = (
  hasLogo: boolean,
  provided?: ErrorCorrectionLevel
): ErrorCorrectionLevel => {
  if (provided) {
    if (hasLogo && provided === "L") {
      console.warn(
        'A logo blanks the center of the QR code; error correction level "L" may produce an unscannable code. Consider "H".'
      );
    }
    return provided;
  }
  return hasLogo ? "H" : "M";
};

export const generateMoves = (
  options: QRCodeOptions
): Record<string, string> => {
  const radius = options.radius == null ? 1 : options.radius;
  const moves: Record<string, string> = {
    d: "v2",
    l: "h-2",
    r: "h2",
    u: "v-2",
  };

  ["ld", "ul", "ru", "dr", "ur", "rd", "dl", "lu"].forEach((i, j) => {
    const sides = [
      { d: [0, 1], l: [-1, 0], r: [1, 0], u: [0, -1] }[i[0]],
      { d: [0, 1], l: [-1, 0], r: [1, 0], u: [0, -1] }[i[1]],
    ] as [number, number][];

    moves[i] = `${
      radius < 1
        ? `${{ d: "v", l: "h-", u: "v-", r: "h" }[i[0]]}${1 - radius}`
        : ""
    }a${radius},${radius} 0 0,${j > 3 ? 1 : 0} ${
      (sides[0][0] + sides[1][0]) * radius
    },${(sides[0][1] + sides[1][1]) * radius}${
      radius < 1
        ? `${{ u: "v-", r: "h", d: "v", l: "h-" }[i[1]]}${1 - radius}`
        : ""
    }`;
  });

  return moves;
};

export const downloadPNG = (canvas: HTMLCanvasElement, filename: string) => {
  const link = document.createElement("a");
  link.download = `${filename}.png`;
  link.href = canvas.toDataURL("image/png");
  document.body.append(link);
  link.click();
  document.body.removeChild(link);
};

export const downloadSVG = (svg: string, filename: string) => {
  // Add XML declaration if not present
  let svgContent = svg;
  if (!svgContent.startsWith("<?xml")) {
    svgContent = `<?xml version="1.0" standalone="no"?>\r\n${svgContent}`;
  }

  const blob = new Blob([svgContent], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = `${filename}.svg`;
  link.href = url;
  document.body.append(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
