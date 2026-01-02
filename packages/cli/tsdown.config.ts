import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true,
  external: ["beautiful-qr-code", "cac", "node:fs", "node:path"],
});
