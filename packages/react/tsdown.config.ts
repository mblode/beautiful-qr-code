import { defineConfig } from "tsdown";

export default defineConfig({
	entry: ["src/index.tsx"],
	format: ["esm"],
	dts: true,
	external: ["react", "react-dom", "beautiful-qr-code"],
});
