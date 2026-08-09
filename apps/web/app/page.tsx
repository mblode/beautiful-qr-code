import { CodeSnippet } from "@/components/code-snippet";
import { SimpleQRPlayground } from "@/components/simple-qr-playground";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ZoneBreadcrumb } from "@/components/zone-breadcrumb";

/*
 * The host graph. blode.co/beautiful-qr-code is a path on blode.co behind a
 * rewrite, not a site of its own, so the Person, Organization and WebSite nodes
 * are referenced by @id and never redefined here: a zone-scoped `#person` would
 * publish a second Matthew Blode on the same domain. Contract:
 * blode-co/apps/web/.claude/knowledge/zone-conventions.md
 */
const HOST = "https://blode.co";
const SITE_URL = `${HOST}/beautiful-qr-code`;
const REPO_URL = "https://github.com/mblode/beautiful-qr-code";

const DESCRIPTION =
  "Create stunning, customizable QR codes with rounded corners, custom colors, and embedded logos. A free, open-source QR code generator, no signup required.";

/*
 * One script, one @graph. Disconnected nodes cannot be merged into a single
 * entity, so six separate blocks would describe six unrelated things.
 *
 * SoftwareSourceCode, not SoftwareApplication: what this page documents is a
 * published npm library, and its own claim is about source code. Any
 * SoftwareApplication node would be held to Google's Software App rich result,
 * which needs aggregateRating or review on top of offers. The only ratings
 * available here are ones we would write about our own work, and Google's
 * review guidelines forbid exactly that, so the type could never pass.
 */
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: "Beautiful QR Code",
      description: DESCRIPTION,
      inLanguage: "en",
      isPartOf: { "@id": `${HOST}/#website` },
      about: { "@id": `${SITE_URL}/#source` },
      author: { "@id": `${HOST}/#person` },
      publisher: { "@id": `${HOST}/#organization` },
      breadcrumb: { "@id": `${SITE_URL}/#breadcrumb` },
    },
    {
      "@type": "SoftwareSourceCode",
      "@id": `${SITE_URL}/#source`,
      name: "beautiful-qr-code",
      description: DESCRIPTION,
      url: SITE_URL,
      codeRepository: REPO_URL,
      programmingLanguage: "TypeScript",
      runtimePlatform: "Node.js",
      license: "https://opensource.org/licenses/MIT",
      isAccessibleForFree: true,
      author: { "@id": `${HOST}/#person` },
      publisher: { "@id": `${HOST}/#organization` },
    },
    // Starts at the blode.co root, not at this zone. The root crumb is named
    // for the person rather than "Home", and ZoneBreadcrumb below renders the
    // same trail visibly: Google treats a mismatch as a markup error, so the
    // two change together.
    {
      "@type": "BreadcrumbList",
      "@id": `${SITE_URL}/#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Matthew Blode",
          item: `${HOST}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Projects",
          item: `${HOST}/projects`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Beautiful QR Code",
          item: SITE_URL,
        },
      ],
    },
  ],
};

export default function Home() {
  const installCode = `npm install beautiful-qr-code
# or
pnpm add beautiful-qr-code`;

  const usageCode = `import { QRCodeStyling } from "beautiful-qr-code";

const qr = new QRCodeStyling({
  data: "https://example.com",
  foregroundColor: "#000000",
  backgroundColor: "#ffffff",
  radius: 1,
  padding: 1,
});

await qr.append(document.getElementById("container"));`;

  return (
    <div className="min-h-screen">
      {/* Static object literal, no user input. */}
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: static schema.org data */}
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        type="application/ld+json"
      />

      {/* Header */}
      <header>
        <div className="container mx-auto p-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1.5">
              {/* Root page only, and it has to match the BreadcrumbList above
                  exactly. */}
              <ZoneBreadcrumb product="Beautiful QR Code" />
              <h1 className="font-bold text-xl">Beautiful QR Code</h1>
            </div>
            <nav className="flex gap-6">
              <a
                className="transition-colors hover:underline"
                href="https://github.com/mblode/beautiful-qr-code"
                rel="noopener noreferrer"
                target="_blank"
              >
                GitHub
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Playground */}
      <section className="bg-surface" id="playground">
        <SimpleQRPlayground />
      </section>

      {/* Documentation */}
      <section className="py-20" id="docs">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 font-bold text-3xl">Quick Start</h2>

            <div className="space-y-8">
              <div>
                <h3 className="mb-4 font-semibold text-xl">Installation</h3>
                <CodeSnippet code={installCode} language="bash" />
              </div>

              <div>
                <h3 className="mb-4 font-semibold text-xl">Usage</h3>
                <CodeSnippet code={usageCode} language="typescript" />
              </div>

              <div>
                <h3 className="mb-4 font-semibold text-xl">Packages</h3>
                <div className="grid gap-4 md:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Core Library</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <code className="rounded bg-muted px-2 py-1 text-sm">
                        beautiful-qr-code
                      </code>
                      <p className="mt-2 text-muted-foreground text-sm">
                        Main QR code generator
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">
                        React Component
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <code className="rounded bg-muted px-2 py-1 text-sm">
                        @beautiful-qr-code/react
                      </code>
                      <p className="mt-2 text-muted-foreground text-sm">
                        React wrapper component
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">CLI Tool</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <code className="rounded bg-muted px-2 py-1 text-sm">
                        @beautiful-qr-code/cli
                      </code>
                      <p className="mt-2 text-muted-foreground text-sm">
                        Command-line interface
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*
        A plain section, not a second <footer>: app/layout.tsx already wraps the
        CraftedBy credit in the page's one contentinfo landmark, and two of them
        is two landmarks claiming the same role.
      */}
      <div className="border-border border-t py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center text-muted-foreground">
            <p>
              MIT License © {new Date().getFullYear()}{" "}
              {/* blode.co is this same origin behind a rewrite, so it stays in
                  the tab with no noopener, and carries rel="author". */}
              <a
                className="transition-colors hover:underline"
                href="https://blode.co"
                rel="author"
              >
                Matthew Blode
              </a>
            </p>
            <p className="mt-2">
              <a
                className="transition-colors hover:underline"
                href="https://github.com/mblode/beautiful-qr-code"
                rel="noopener noreferrer"
                target="_blank"
              >
                GitHub
              </a>
              {" · "}
              <a
                className="transition-colors hover:underline"
                href="https://www.npmjs.com/package/beautiful-qr-code"
                rel="noopener noreferrer"
                target="_blank"
              >
                npm
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
