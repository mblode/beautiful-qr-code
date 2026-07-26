import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    host: "https://blode.co",
    rules: {
      allow: "/",
      userAgent: "*",
    },
    sitemap: "https://blode.co/beautiful-qr-code/sitemap.xml",
  };
}
