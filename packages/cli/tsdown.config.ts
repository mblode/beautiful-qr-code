import { defineConfig } from "tsdown";

export default defineConfig({
  dts: true,
  entry: ["src/index.ts"],
  external: ["beautiful-qr-code", "cac", "node:fs", "node:path"],
  format: ["esm"],
});
