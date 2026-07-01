#!/usr/bin/env node

import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { QRCodeStyling } from "beautiful-qr-code";
import { cac } from "cac";
import pkg from "../package.json" with { type: "json" };

const DEFAULT_RADIUS = 1;
const DEFAULT_PADDING = 1;

const cli = cac("beautiful-qr-code");

cli
  .command("<data>", "Generate a QR code")
  .option("-o, --output <path>", "Output file path", { default: "qr-code.svg" })
  .option(
    "-f, --format <type>",
    "Output format: svg or png (inferred from output extension by default)"
  )
  .option("--color <hex>", "Foreground color", { default: "#000000" })
  .option("--bg <hex>", "Background color", { default: "transparent" })
  .option("--radius <number>", "Corner radius (0-1)", {
    default: DEFAULT_RADIUS,
  })
  .option("--padding <number>", "Padding in modules", {
    default: DEFAULT_PADDING,
  })
  .option("--logo <path>", "Logo image URL or path")
  .action(async (data, options) => {
    try {
      const outputPath = resolve(process.cwd(), options.output);

      const format: string =
        options.format ??
        (String(options.output).toLowerCase().endsWith(".png") ? "png" : "svg");

      if (format === "png") {
        // PNG export in Node.js requires node-canvas and is not supported here.
        console.error(
          "PNG export in Node.js requires additional setup. Use SVG format instead:"
        );
        console.error(`  beautiful-qr-code "${data}" -o qr-code.svg -f svg`);
        process.exit(1);
      }

      const parsedRadius = Number.parseFloat(options.radius);
      const radius = Number.isFinite(parsedRadius)
        ? parsedRadius
        : DEFAULT_RADIUS;

      const parsedPadding = Number.parseInt(options.padding, 10);
      const padding = Number.isFinite(parsedPadding)
        ? parsedPadding
        : DEFAULT_PADDING;

      const qr = new QRCodeStyling({
        data,
        foregroundColor: options.color,
        backgroundColor: options.bg,
        radius,
        padding,
        logoUrl: options.logo,
        hasLogo: !!options.logo,
      });

      const svg = await qr.getSVG();
      writeFileSync(outputPath, svg, "utf-8");
      console.log(`✓ QR code saved to: ${outputPath}`);
    } catch (error) {
      console.error("Error generating QR code:", error);
      process.exit(1);
    }
  });

cli.help();
cli.version(pkg.version);

cli.parse();
