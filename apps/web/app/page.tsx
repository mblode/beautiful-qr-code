import { CodeSnippet } from "@/components/code-snippet";
import { SimpleQRPlayground } from "@/components/simple-qr-playground";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
      {/* Header */}
      <header>
        <div className="container mx-auto p-4">
          <div className="flex items-center justify-between">
            <div>
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

      {/* Footer */}
      <footer className="border-border border-t py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center text-muted-foreground">
            <p>
              MIT License © {new Date().getFullYear()}{" "}
              <a
                className="transition-colors hover:underline"
                href="https://mblode.com"
                rel="noopener noreferrer"
                target="_blank"
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
      </footer>
    </div>
  );
}
