import { renderZoneOgImage } from "@/app/og-image-shared";

export {
  OG_CONTENT_TYPE as contentType,
  OG_SIZE as size,
} from "@/app/og-image-shared";

export const alt = "Beautiful QR Code";

/**
 * The house card (Rule 12), replacing the static `opengraph-image.png`.
 *
 * Converting the PNG to a generated route is also the Rule 11 fix, which is
 * why `metadataBase` moves to the zone URL in the same commit. A static
 * metadata image already carries `basePath`, so pointing `metadataBase` at the
 * zone while the PNG is still there produces
 * `/beautiful-qr-code/beautiful-qr-code/opengraph-image.png`. A generated
 * route is not prefixed, so this form is the one that cannot double.
 *
 * The matching `twitter-image.png` is gone rather than converted: Next reuses
 * this route for `twitter:image`, and the old pair were the same file twice.
 */
export default function OpengraphImage() {
  return renderZoneOgImage({
    badge: "QR",
    eyebrow: "blode.co/beautiful-qr-code",
    // Shorter than the meta description, which runs long for the SERP. A card
    // is read in a feed, at a glance.
    subtitle: "Custom colors, rounded corners, and logos. Free, no signup.",
    title: "Beautiful QR Code",
  });
}
