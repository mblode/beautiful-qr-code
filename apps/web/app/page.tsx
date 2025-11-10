import { SimpleQRPlayground } from "@/components/simple-qr-playground";
import { CodeSnippet } from "@/components/code-snippet";
import Link from "next/link";
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
              <h1 className="text-3xl font-bold">Beautiful QR Code</h1>
            </div>
            <nav className="flex gap-6">
              <Link
                href="#playground"
                className="hover:underline transition-colors"
              >
                Playground
              </Link>
              <Link href="#docs" className="hover:underline transition-colors">
                Docs
              </Link>
              <a
                href="https://github.com/mblode/beautiful-qr-code"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline transition-colors"
              >
                GitHub
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Playground */}
      <section id="playground" className="bg-surface">
        <SimpleQRPlayground />
      </section>

      {/* Documentation */}
      <section id="docs" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Quick Start</h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Installation</h3>
                <CodeSnippet code={installCode} language="bash" />
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Usage</h3>
                <CodeSnippet code={usageCode} language="typescript" />
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Packages</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Core Library</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <code className="text-sm bg-muted px-2 py-1 rounded">
                        beautiful-qr-code
                      </code>
                      <p className="text-sm text-muted-foreground mt-2">
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
                      <code className="text-sm bg-muted px-2 py-1 rounded">
                        @beautiful-qr-code/react
                      </code>
                      <p className="text-sm text-muted-foreground mt-2">
                        React wrapper component
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">CLI Tool</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <code className="text-sm bg-muted px-2 py-1 rounded">
                        @beautiful-qr-code/cli
                      </code>
                      <p className="text-sm text-muted-foreground mt-2">
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
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-muted-foreground">
            <p>
              MIT License © {new Date().getFullYear()}{" "}
              <a
                href="https://mblode.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline transition-colors"
              >
                Matthew Blode
              </a>
            </p>
            <p className="mt-2">
              <a
                href="https://github.com/mblode/beautiful-qr-code"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline transition-colors"
              >
                GitHub
              </a>
              {" · "}
              <a
                href="https://www.npmjs.com/package/beautiful-qr-code"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline transition-colors"
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
