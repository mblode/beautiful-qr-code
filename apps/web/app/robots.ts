import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    host: "https://beautiful-qr-code.blode.co",
    rules: {
      allow: "/",
      userAgent: "*",
    },
    sitemap: "https://beautiful-qr-code.blode.co/sitemap.xml",
  };
}
