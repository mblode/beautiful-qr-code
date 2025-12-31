<div align="center">
  <img src="example-qr-code.svg" alt="Beautiful QR Code" width="200" />
  <h1>beautiful-qr-code</h1>
  <p>QR codes for web, React, and the CLI</p>
</div>

<div align="center">

[![npm version][npm-version-badge]][npm-version-link]
[![License: MIT][license-badge]][license-link]

[Try it out][demo-link]

</div>

## Packages

- `beautiful-qr-code` (core)
- `@beautiful-qr-code/react`
- `@beautiful-qr-code/cli`

## Install

```bash
# core
npm install beautiful-qr-code

# react
npm install @beautiful-qr-code/react

# cli (global)
npm install -g @beautiful-qr-code/cli

# one-off cli usage
npx @beautiful-qr-code/cli "https://example.com"
```

## Quick Start

### Core

```typescript
import { QRCodeStyling } from "beautiful-qr-code";

const qrCode = new QRCodeStyling({
  data: "https://github.com/mblode/beautiful-qr-code",
  foregroundColor: "#1a73e8",
  backgroundColor: "#ffffff",
  radius: 1,
});

await qrCode.append(document.getElementById("qr-container"));
await qrCode.download({ name: "qr-code", extension: "png" });
```

### React

```tsx
import { BeautifulQRCode } from "@beautiful-qr-code/react";

export function App() {
  return (
    <BeautifulQRCode
      data="https://github.com/mblode/beautiful-qr-code"
      foregroundColor="#1a73e8"
      backgroundColor="#ffffff"
      radius={1}
    />
  );
}
```

### CLI

```bash
beautiful-qr-code "https://example.com" -o qr.svg -f svg
```

## Configuration

Shared options: `data`, `type`, `foregroundColor`, `backgroundColor`, `radius`,
`padding`, `logoUrl`, `hasLogo`.

Package docs:

- `packages/core/README.md`
- `packages/react/README.md`
- `packages/cli/README.md`

## Contributing

We welcome contributions. See [CONTRIBUTING.md][contrib-link].

## License

[MIT][license-file] © [Matthew Blode][author-link]

[npm-version-badge]: https://img.shields.io/npm/v/beautiful-qr-code
[npm-version-link]: https://www.npmjs.com/package/beautiful-qr-code
[license-badge]: https://img.shields.io/badge/License-MIT-yellow
[license-link]: https://opensource.org/licenses/MIT
[demo-link]: https://beautiful-qr-code.blode.co
[contrib-link]: CONTRIBUTING.md
[license-file]: LICENSE
[author-link]: https://mblode.com
