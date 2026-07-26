import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      changeFrequency: "monthly",
      lastModified: new Date(),
      priority: 1,
      url: "https://blode.co/beautiful-qr-code",
    },
  ];
}
