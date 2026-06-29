import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://beautiful-qr-code.blode.co/sitemap.xml",
    host: "https://beautiful-qr-code.blode.co",
  };
}
