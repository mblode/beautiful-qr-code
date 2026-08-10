import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// blode.co deliberately excludes zone paths from its own headers, because two
// CSP headers on one response are intersected by the browser rather than
// overridden. So this zone owns its response headers.
//
// - 'unsafe-inline' scripts: Next's hydration bootstrap and the JSON-LD block
//   are inline; a nonce would need middleware on an otherwise static page.
// - 'unsafe-eval' in dev only: Turbopack's HMR runtime evals module code.
// - img-src data: blob:: the playground draws QR codes to a canvas and exports
//   them through `canvas.toDataURL` (PNG) and an object URL (SVG).
// - worker-src blob:: posthog-js lazy-loads session replay into a blob worker.
// - us.posthog.com is the PostHog toolbar calling back, not ingestion.
//
// HSTS is deliberately absent: the blode.co edge already sends it, and setting
// includeSubDomains/preload from a zone would apply to every blode.co
// subdomain irreversibly.
const PH_PROXY = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "";
const CSP = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} ${PH_PROXY}`,
  `style-src 'self' 'unsafe-inline' ${PH_PROXY}`,
  `img-src 'self' data: blob: ${PH_PROXY}`,
  "worker-src 'self' blob:",
  `font-src 'self' ${PH_PROXY}`,
  `connect-src 'self' ${PH_PROXY} https://us.posthog.com`,
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
].join("; ");

const nextConfig: NextConfig = {
  assetPrefix: "/beautiful-qr-code",
  basePath: "/beautiful-qr-code",
  headers() {
    // Every matching rule applies in array order and a later one wins per
    // header key, so the catch-all comes first and per-route overrides after.
    return Promise.resolve([
      {
        headers: [
          { key: "Content-Security-Policy", value: CSP },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
        ],
        source: "/:path*",
      },
    ]);
  },
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
