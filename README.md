<div align="center">
  <img src="example-qr-code.svg" alt="Beautiful QR Code" width="200" />
  <h1>beautiful-qr-code</h1>
  <p>Generate beautiful, customizable QR codes in JavaScript</p>
</div>

<div align="center">

[![npm version](https://img.shields.io/npm/v/beautiful-qr-code.svg)](https://www.npmjs.com/package/beautiful-qr-code)
[![npm downloads](https://img.shields.io/npm/dm/beautiful-qr-code.svg)](https://www.npmjs.com/package/beautiful-qr-code)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

[Try it out →](https://beautiful-qr.blode.co)

</div>

## Features

- 🎨 **Beautiful by default** - Rounded corners and smooth edges for modern designs
- 🖼️ **Logo embedding** - Add custom logos with automatic center space clearing
- 🎨 **Full customization** - Colors, padding, corner radius, and more
- 📦 **SVG + Canvas** - Dual rendering modes for any use case
- ⚡ **Lightweight** - Under 15KB minified, zero dependencies
- 🔒 **Type-safe** - Written in TypeScript with full type definitions
- 🌐 **Universal** - Works in browsers and Node.js environments

## Installation

```bash
# npm
npm install beautiful-qr-code

# pnpm
pnpm add beautiful-qr-code

# yarn
yarn add beautiful-qr-code
```

## Quick Start

```typescript
import { QRCodeStyling } from "beautiful-qr-code";

const qrCode = new QRCodeStyling({
  data: "https://github.com/mblode/beautiful-qr-code",
  foregroundColor: "#1a73e8",
  backgroundColor: "#ffffff",
  radius: 1,
  logoUrl: "https://example.com/logo.png",
});

// Append to DOM
await qrCode.append(document.getElementById("qr-container"));

// Or download directly
await qrCode.download({ name: "qr-code", extension: "png" });
```

## API

### Configuration Options

```typescript
new QRCodeStyling(config: QRCodeConfig)
```

| Option             | Type                       | Default         | Description                        |
| ------------------ | -------------------------- | --------------- | ---------------------------------- |
| `data`             | `string`                   | **Required**    | Data to encode in the QR code      |
| `type`             | `"svg" \| "canvas"`        | `"svg"`         | Rendering mode                     |
| `foregroundColor`  | `string`                   | `"#000"`        | QR code color                      |
| `backgroundColor`  | `string`                   | `"transparent"` | Background color                   |
| `radius`           | `number`                   | `1`             | Corner radius (0-1, 0 = sharp)     |
| `padding`          | `number`                   | `1`             | Padding in modules                 |
| `logoUrl`          | `string`                   | `undefined`     | Logo image URL                     |
| `hasLogo`          | `boolean`                  | `false`         | Clear center space for logo        |

### Methods

**`append(container: HTMLElement)`** - Append QR code to DOM element

**`download(options?)`** - Download as PNG or SVG

**`update(config)`** - Update configuration dynamically

**`getSVG()`** - Get SVG string

**`getCanvas()`** - Get Canvas element

## Ecosystem

**Core library** - Framework-agnostic, works with any JavaScript project

**[@beautiful-qr-code/react](https://github.com/mblode/beautiful-qr-code/tree/main/packages/react)** - React component with hooks

**[@beautiful-qr-code/cli](https://github.com/mblode/beautiful-qr-code/tree/main/packages/cli)** - Generate QR codes from the terminal

## Contributing

We welcome contributions! Check out [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

[MIT](LICENSE) © [Matthew Blode](https://mblode.com)
