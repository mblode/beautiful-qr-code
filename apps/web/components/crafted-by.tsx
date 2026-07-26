export function CraftedBy() {
  return (
    <a
      className="inline-flex items-center gap-2 text-muted-foreground text-sm transition-colors hover:text-foreground"
      href="https://blode.co"
      rel="author noopener"
      target="_blank"
    >
      <span>Crafted by</span>
      {/* biome-ignore lint/performance/noImgElement: self-hosted 20px avatar, plain img avoids next/image overhead */}
      <img
        alt="Matthew Blode"
        className="rounded-full"
        height={20}
        loading="lazy"
        src="/beautiful-qr-code/avatar-sm.png"
        width={20}
      />
      <span>Matthew Blode</span>
    </a>
  );
}
