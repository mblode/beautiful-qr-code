import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  assetPrefix: "/beautiful-qr-code",
  basePath: "/beautiful-qr-code",
  redirects() {
    return Promise.resolve([
      {
        basePath: false,
        destination: "https://blode.co/beautiful-qr-code",
        has: [{ type: "host" as const, value: "beautiful-qr-code.blode.co" }],
        permanent: true,
        source: "/",
      },
      {
        basePath: false,
        destination: "https://blode.co/beautiful-qr-code/:path*",
        has: [{ type: "host" as const, value: "beautiful-qr-code.blode.co" }],
        permanent: true,
        source: "/:path*",
      },
    ]);
  },
  transpilePackages: ["@beautiful-qr-code/react", "beautiful-qr-code"],
  // TypeScript 7's compiler API is CLI-first; Next's inline type check can't
  // load it. `tsc --noEmit` (check-types) remains the real type gate.
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
