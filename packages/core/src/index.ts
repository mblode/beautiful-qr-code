import { generateCanvas } from "./canvas";
import { DEFAULT_OPTIONS } from "./constants";
import { generateSVG } from "./svg";
import type { FileExtension, QRCodeConfig, QRCodeOptions } from "./types";
import {
  downloadPNG,
  downloadSVG,
  getErrorCorrectionLevel,
  imageUrlToDataUrl,
} from "./utils";

export class QRCodeStyling {
  private config: QRCodeConfig;
  private element: HTMLElement | null = null;

  constructor(config: QRCodeConfig) {
    // Validate that data is provided and not empty
    if (!config.data || config.data.trim().length === 0) {
      throw new Error("QR code data is required and cannot be empty");
    }

    // Clamp radius between 0 and 1
    const clampedRadius =
      config.radius !== undefined
        ? Math.max(0, Math.min(1, config.radius))
        : DEFAULT_OPTIONS.radius;

    this.config = {
      ...DEFAULT_OPTIONS,
      type: "svg",
      ...config,
      radius: clampedRadius,
    };
  }

  async append(container: HTMLElement | null): Promise<void> {
    if (!container) return;

    this.element = container;
    await this.render();
  }

  private async render(): Promise<void> {
    if (!this.element) return;

    const { type } = this.config;

    if (type === "canvas") {
      const canvas = await this.getCanvas();

      this.element.innerHTML = "";
      this.element.appendChild(canvas);
    } else {
      const svg = await this.getSVG();

      this.element.innerHTML = "";
      this.element.innerHTML = svg;
    }
  }

  async download(
    options: { name?: string; extension?: FileExtension } = {},
  ): Promise<void> {
    const { name = "qr", extension = "svg" } = options;

    if (extension === "png") {
      const canvas = await this.getCanvas();
      downloadPNG(canvas, name);
    } else {
      const svg = await this.getSVG();
      downloadSVG(svg, name);
    }
  }

  async getSVG(): Promise<string> {
    const options = this.buildOptions();

    // Generate SVG with base64 images
    let logoUrl = options.logoUrl;
    if (logoUrl && !logoUrl.startsWith("data:")) {
      try {
        logoUrl = await imageUrlToDataUrl(logoUrl);
      } catch (error) {
        console.error("Failed to load logo:", error);
      }
    }

    return generateSVG(this.config.data, {
      ...options,
      logoUrl,
    });
  }

  async getCanvas(): Promise<HTMLCanvasElement> {
    const options = this.buildOptions();
    return await generateCanvas(this.config.data, options);
  }

  update(newConfig: Partial<QRCodeConfig>): void {
    // Validate data if it's being updated
    if (newConfig.data !== undefined && (!newConfig.data || newConfig.data.trim().length === 0)) {
      throw new Error("QR code data cannot be empty");
    }

    // Clamp radius between 0 and 1 if provided
    const clampedRadius =
      newConfig.radius !== undefined
        ? Math.max(0, Math.min(1, newConfig.radius))
        : this.config.radius;

    this.config = { ...this.config, ...newConfig, radius: clampedRadius };
    if (this.element) {
      void this.render();
    }
  }

  private buildOptions(): QRCodeOptions {
    const hasLogo = this.config.hasLogo === true || !!this.config.logoUrl;

    return {
      ...DEFAULT_OPTIONS,
      ...this.config,
      hasLogo,
      errorCorrectionLevel: getErrorCorrectionLevel(
        hasLogo,
        this.config.errorCorrectionLevel,
      ),
    };
  }
}

// Legacy functional API (deprecated)
export const createQRCode = async (
  config: QRCodeConfig,
): Promise<string | HTMLCanvasElement> => {
  const qr = new QRCodeStyling(config);

  if (config.type === "canvas") {
    return await qr.getCanvas();
  }

  return await qr.getSVG();
};

// Re-export types and constants for external use
export { DEFAULT_OPTIONS } from "./constants";
export type { FileExtension, QRCodeConfig, QRCodeOptions } from "./types";
