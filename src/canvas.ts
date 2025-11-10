import { CANVAS_SIZE } from "./constants";
import { generateSVG } from "./svg";
import type { QRCodeOptions } from "./types";

const renderCompleteSVGToCanvas = async (
  ctx: CanvasRenderingContext2D,
  svgString: string,
  canvasSize: number,
) => {
  const parser = new DOMParser();
  const svgDoc = parser.parseFromString(svgString, "image/svg+xml");
  const svgElement = svgDoc.documentElement;

  const viewBox = svgElement.getAttribute("viewBox");
  if (!viewBox) return;

  const [vbX, vbY, vbWidth, vbHeight] = viewBox.split(" ").map(Number);
  const scale = canvasSize / Math.max(vbWidth, vbHeight);

  ctx.save();
  ctx.scale(scale, scale);
  ctx.translate(-vbX, -vbY);

  // Render all paths in order (main QR code + eyes)
  const paths = svgElement.querySelectorAll("path");
  paths.forEach((pathElement) => {
    const d = pathElement.getAttribute("d");
    const fill = pathElement.getAttribute("fill") || pathElement.style.fill;
    const transform = pathElement.getAttribute("transform");

    if (d && fill) {
      ctx.save();

      // Handle SVG transforms
      if (transform) {
        const translateMatch = transform.match(/translate\(([^)]+)\)/);
        if (translateMatch) {
          const coords = translateMatch[1].split(",").map(Number);
          if (coords.length === 2) {
            ctx.translate(coords[0], coords[1]);
          } else if (coords.length === 1) {
            ctx.translate(coords[0], 0);
          }
        }
      }

      const path = new Path2D(d);
      ctx.fillStyle = fill;
      ctx.fill(path);

      ctx.restore();
    }
  });

  // Note: Eyes are now rendered as paths above, no need for separate rectangle handling

  // Handle nested SVG elements
  const nestedSvgs = svgElement.querySelectorAll("svg");
  nestedSvgs.forEach((nestedSvg) => {
    const x = Number(nestedSvg.getAttribute("x") || 0);
    const y = Number(nestedSvg.getAttribute("y") || 0);
    const width = Number(nestedSvg.getAttribute("width") || 0);
    const height = Number(nestedSvg.getAttribute("height") || 0);
    const viewBox = nestedSvg.getAttribute("viewBox");

    if (viewBox) {
      const [vbX, vbY, vbWidth, vbHeight] = viewBox.split(" ").map(Number);
      const scaleX = width / vbWidth;
      const scaleY = height / vbHeight;

      ctx.save();
      ctx.translate(x, y);
      ctx.scale(scaleX, scaleY);
      ctx.translate(-vbX, -vbY);

      const nestedPaths = nestedSvg.querySelectorAll("path");
      nestedPaths.forEach((pathElement) => {
        const d = pathElement.getAttribute("d");
        const fill = pathElement.getAttribute("fill") || pathElement.style.fill;

        if (d && fill) {
          const path = new Path2D(d);
          ctx.fillStyle = fill;
          ctx.fill(path);
        }
      });

      ctx.restore();
    }
  });

  // Render images (custom logos)
  const images = svgElement.querySelectorAll("image");
  for (const imageElement of images) {
    const href = imageElement.getAttribute("href");
    const x = Number(imageElement.getAttribute("x") || 0);
    const y = Number(imageElement.getAttribute("y") || 0);
    const width = Number(imageElement.getAttribute("width") || 0);
    const height = Number(imageElement.getAttribute("height") || 0);

    if (href) {
      try {
        const img = new Image();
        img.crossOrigin = "anonymous";

        await new Promise<void>((resolve, reject) => {
          img.onload = () => resolve();
          img.onerror = reject;
          img.src = href;
        });

        ctx.drawImage(img, x, y, width, height);
      } catch (error) {
        console.error("Failed to load logo:", error);
      }
    }
  }

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
  if (!ctx) throw new Error("Failed to get canvas context");

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
