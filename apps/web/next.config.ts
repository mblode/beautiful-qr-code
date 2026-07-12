import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@beautiful-qr-code/react", "beautiful-qr-code"],
  // TypeScript 7's compiler API is CLI-first; Next's inline type check can't
  // load it. `tsc --noEmit` (check-types) remains the real type gate.
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
