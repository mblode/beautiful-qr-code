import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Keep the non-canonical hostnames out of the index.
   *
   * This app canonicalises to blode.co/beautiful-qr-code, but it also answers on the
   * origin blode.co proxies to and on its *.vercel.app aliases. Those sit
   * inside the sc-domain:blode.co Search Console property, so left alone they
   * are a crawlable duplicate of the whole site.
   *
   * The discriminator is x-forwarded-host, NOT host: the multi-zone rewrite
   * proxies to the origin, so `host` is the origin for real blode.co traffic
   * too. x-forwarded-host keeps the hostname the client actually asked for,
   * which is blode.co when proxied. Matching on `host` would noindex the
   * live site.
   */
  headers() {
    return Promise.resolve([
      {
        headers: [{ key: "X-Robots-Tag", value: "noindex" }],
        has: [
          {
            key: "x-forwarded-host",
            type: "header" as const,
            value: String.raw`.*\.zone\.blode\.co|.*\.vercel\.app`,
          },
        ],
        source: "/:path*",
      },
    ]);
  },
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
