# beautiful-qr-code

[![npm version](https://img.shields.io/npm/v/beautiful-qr-code)](https://www.npmjs.com/package/beautiful-qr-code)
[![npm downloads](https://img.shields.io/npm/dm/beautiful-qr-code)](https://www.npmjs.com/package/beautiful-qr-code)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)](https://www.typescriptlang.org/)

Beautiful, customizable QR code generator with support for rounded corners, custom colors, and logos

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
npm install beautiful-qr-code
```

```bash
pnpm add beautiful-qr-code
```

```bash
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

| Option            | Type                | Default         | Description                    |
| ----------------- | ------------------- | --------------- | ------------------------------ |
| `data`            | `string`            | **Required**    | Data to encode in the QR code  |
| `type`            | `"svg" \| "canvas"` | `"svg"`         | Rendering mode                 |
| `foregroundColor` | `string`            | `"#000"`        | QR code color                  |
| `backgroundColor` | `string`            | `"transparent"` | Background color               |
| `radius`          | `number`            | `1`             | Corner radius (0-1, 0 = sharp) |
| `padding`         | `number`            | `1`             | Padding in modules             |
| `logoUrl`         | `string`            | `undefined`     | Logo image URL                 |
| `hasLogo`         | `boolean`           | `false`         | Clear center space for logo    |

### Methods

#### `append(container: HTMLElement)`

Append QR code to DOM element.

```typescript
await qrCode.append(document.getElementById("qr-container"));
```

#### `download(options?)`

Download as PNG or SVG.

```typescript
await qrCode.download({
  name: "my-qr-code",
  extension: "png" // or "svg"
});
```

#### `update(config)`

Update configuration dynamically.

```typescript
qrCode.update({
  foregroundColor: "#ff0000",
  radius: 0.5,
});
```

#### `getSVG()`

Get SVG string.

```typescript
const svg = await qrCode.getSVG();
```

#### `getCanvas()`

Get Canvas element.

```typescript
const canvas = await qrCode.getCanvas();
```

## Examples

### Custom Colors

```typescript
const qrCode = new QRCodeStyling({
  data: "https://example.com",
  foregroundColor: "#1a73e8",
  backgroundColor: "#f0f8ff",
});
```

### Rounded Corners

```typescript
const qrCode = new QRCodeStyling({
  data: "https://example.com",
  radius: 1, // 0 = sharp, 1 = fully rounded
});
```

### With Logo

```typescript
const qrCode = new QRCodeStyling({
  data: "https://example.com",
  logoUrl: "https://example.com/logo.png",
  hasLogo: true,
});
```

### Canvas Mode

```typescript
const qrCode = new QRCodeStyling({
  data: "https://example.com",
  type: "canvas",
});
```

## Ecosystem

- **[@beautiful-qr-code/react](https://www.npmjs.com/package/@beautiful-qr-code/react)** - React component with hooks
- **[@beautiful-qr-code/cli](https://www.npmjs.com/package/@beautiful-qr-code/cli)** - Generate QR codes from the terminal

## License

[MIT](https://opensource.org/licenses/MIT) © [Matthew Blode](https://mblode.com)
