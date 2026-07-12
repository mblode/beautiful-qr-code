import { defineConfig } from "tsdown";

export default defineConfig({
  dts: true,
  entry: ["src/index.tsx"],
  external: ["react", "react-dom", "beautiful-qr-code"],
  format: ["esm"],
});
