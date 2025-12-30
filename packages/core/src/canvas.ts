import { CANVAS_SIZE } from "./constants";
import { generateSVG } from "./svg";
import type { QRCodeOptions } from "./types";

const TRANSLATE_REGEX = /translate\(([^)]+)\)/;

const applyTransform = (
  ctx: CanvasRenderingContext2D,
  transform: string | null,
): void => {
  if (!transform) {
    return;
  }

  const translateMatch = transform.match(TRANSLATE_REGEX);
  if (translateMatch) {
    const coords = translateMatch[1].split(",").map(Number);
    if (coords.length === 2) {
      ctx.translate(coords[0], coords[1]);
    } else if (coords.length === 1) {
      ctx.translate(coords[0], 0);
    }
  }
};

const renderPath = (
  ctx: CanvasRenderingContext2D,
  pathElement: Element,
): void => {
  const d = pathElement.getAttribute("d");
  const fill = pathElement.getAttribute("fill") || pathElement.style.fill;
  const transform = pathElement.getAttribute("transform");

  if (d && fill) {
    ctx.save();
    applyTransform(ctx, transform);
    const path = new Path2D(d);
    ctx.fillStyle = fill;
    ctx.fill(path);
    ctx.restore();
  }
};

const renderPaths = (
  ctx: CanvasRenderingContext2D,
  svgElement: Element,
): void => {
  const paths = svgElement.querySelectorAll("path");
  for (const pathElement of Array.from(paths)) {
    renderPath(ctx, pathElement);
  }
};

const renderNestedSvg = (
  ctx: CanvasRenderingContext2D,
  nestedSvg: Element,
): void => {
  const x = Number(nestedSvg.getAttribute("x") || 0);
  const y = Number(nestedSvg.getAttribute("y") || 0);
  const width = Number(nestedSvg.getAttribute("width") || 0);
  const height = Number(nestedSvg.getAttribute("height") || 0);
  const viewBox = nestedSvg.getAttribute("viewBox");

  if (!viewBox) {
    return;
  }

  const [vbX, vbY, vbWidth, vbHeight] = viewBox.split(" ").map(Number);
  const scaleX = width / vbWidth;
  const scaleY = height / vbHeight;

  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scaleX, scaleY);
  ctx.translate(-vbX, -vbY);

  const nestedPaths = nestedSvg.querySelectorAll("path");
  for (const pathElement of Array.from(nestedPaths)) {
    const d = pathElement.getAttribute("d");
    const fill = pathElement.getAttribute("fill") || pathElement.style.fill;

    if (d && fill) {
      const path = new Path2D(d);
      ctx.fillStyle = fill;
      ctx.fill(path);
    }
  }

  ctx.restore();
};

const renderNestedSvgs = (
  ctx: CanvasRenderingContext2D,
  svgElement: Element,
): void => {
  const nestedSvgs = svgElement.querySelectorAll("svg");
  for (const nestedSvg of Array.from(nestedSvgs)) {
    renderNestedSvg(ctx, nestedSvg);
  }
};

const loadImage = async (href: string): Promise<HTMLImageElement> => {
  const img = new Image();
  img.crossOrigin = "anonymous";

  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = href;
  });

  return img;
};

const renderImage = async (
  ctx: CanvasRenderingContext2D,
  imageElement: Element,
): Promise<void> => {
  const href = imageElement.getAttribute("href");
  if (!href) {
    return;
  }

  const x = Number(imageElement.getAttribute("x") || 0);
  const y = Number(imageElement.getAttribute("y") || 0);
  const width = Number(imageElement.getAttribute("width") || 0);
  const height = Number(imageElement.getAttribute("height") || 0);

  try {
    const img = await loadImage(href);
    ctx.drawImage(img, x, y, width, height);
  } catch (error) {
    console.error("Failed to load logo:", error);
  }
};

const renderImages = async (
  ctx: CanvasRenderingContext2D,
  svgElement: Element,
): Promise<void> => {
  const images = Array.from(svgElement.querySelectorAll("image"));
  for (const imageElement of images) {
    await renderImage(ctx, imageElement);
  }
};

const renderCompleteSVGToCanvas = async (
  ctx: CanvasRenderingContext2D,
  svgString: string,
  canvasSize: number,
) => {
  const parser = new DOMParser();
  const svgDoc = parser.parseFromString(svgString, "image/svg+xml");
  const svgElement = svgDoc.documentElement;

  const viewBox = svgElement.getAttribute("viewBox");
  if (!viewBox) {
    return;
  }

  const [vbX, vbY, vbWidth, vbHeight] = viewBox.split(" ").map(Number);
  const scale = canvasSize / Math.max(vbWidth, vbHeight);

  ctx.save();
  ctx.scale(scale, scale);
  ctx.translate(-vbX, -vbY);

  renderPaths(ctx, svgElement);
  renderNestedSvgs(ctx, svgElement);
  await renderImages(ctx, svgElement);

  ctx.restore();
};

export const generateCanvas = async (
  data: string,
  options: QRCodeOptions,
): Promise<HTMLCanvasElement> => {
  const svgString = generateSVG(data, options);

  const canvas = document.createElement("canvas");
  canvas.width = CANVAS_SIZE;
  canvas.height = CANVAS_SIZE;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Failed to get canvas context");
  }

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  // Set background color
  if (options.backgroundColor !== "transparent") {
    ctx.fillStyle = options.backgroundColor;
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  } else {
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }

  await renderCompleteSVGToCanvas(ctx, svgString, CANVAS_SIZE);

  return canvas;
};
