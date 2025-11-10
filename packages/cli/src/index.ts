#!/usr/bin/env node

import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { cac } from "cac";
import { QRCodeStyling } from "beautiful-qr-code";

const cli = cac("beautiful-qr-code");

cli
  .command("<data>", "Generate a QR code")
  .option("-o, --output <path>", "Output file path", { default: "qr-code.png" })
  .option("-f, --format <type>", "Output format: svg or png", { default: "png" })
  .option("--color <hex>", "Foreground color", { default: "#000000" })
  .option("--bg <hex>", "Background color", { default: "transparent" })
  .option("--radius <number>", "Corner radius (0-1)", { default: 1 })
  .option("--padding <number>", "Padding in modules", { default: 1 })
  .option("--logo <path>", "Logo image URL or path")
  .action(async (data, options) => {
    try {
      const qr = new QRCodeStyling({
        data,
        type: options.format === "png" ? "canvas" : "svg",
        foregroundColor: options.color,
        backgroundColor: options.bg,
        radius: Number.parseFloat(options.radius),
        padding: Number.parseInt(options.padding, 10),
        logoUrl: options.logo,
        hasLogo: !!options.logo,
      });

      const outputPath = resolve(process.cwd(), options.output);

      if (options.format === "png") {
        // For PNG, we need to get canvas and convert to buffer
        // Note: This requires node-canvas which we'll handle with proper error message
        console.error(
          "PNG export in Node.js requires additional setup. Use SVG format instead:",
        );
        console.error(
          `  beautiful-qr-code "${data}" -o qr-code.svg -f svg`,
        );
        process.exit(1);
      } else {
        // SVG export
        const svg = await qr.getSVG();
        writeFileSync(outputPath, svg, "utf-8");
        console.log(`✓ QR code saved to: ${outputPath}`);
      }
    } catch (error) {
      console.error("Error generating QR code:", error);
      process.exit(1);
    }
  });

cli.help();
cli.version("1.0.0");

cli.parse();
