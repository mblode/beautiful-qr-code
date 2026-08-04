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
};

export default nextConfig;
