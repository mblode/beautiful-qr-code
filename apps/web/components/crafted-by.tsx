/*
 * blode.co and blode.co/projects are this same origin behind a rewrite, so both
 * are internal links: same tab, and no rel="noopener noreferrer", which only
 * means something cross-origin. The projects link is the edge back to the hub,
 * without which this zone is a dead end for crawlers and readers. See
 * blode-co/apps/web/.claude/knowledge/zone-conventions.md.
 */
export function CraftedBy() {
  return (
    <span className="inline-flex flex-wrap items-center gap-x-2">
      <a
        className="inline-flex items-center gap-2 text-muted-foreground text-sm transition-colors hover:text-foreground"
        href="https://blode.co"
        rel="author"
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
      <span aria-hidden="true" className="text-muted-foreground">
        &middot;
      </span>
      <a
        className="inline-flex items-center gap-2 text-muted-foreground text-sm transition-colors hover:text-foreground"
        href="https://blode.co/projects"
      >
        All projects
      </a>
    </span>
  );
}
