# @beautiful-qr-code/react

React component for [beautiful-qr-code](https://github.com/mblode/beautiful-qr-code)

## Installation

```bash
npm install @beautiful-qr-code/react
# or
pnpm add @beautiful-qr-code/react
# or
yarn add @beautiful-qr-code/react
```

## Usage

### Basic Usage

```tsx
import { BeautifulQRCode } from "@beautiful-qr-code/react";

function App() {
  return (
    <BeautifulQRCode
      data="https://github.com/mblode/beautiful-qr-code"
      foregroundColor="#000000"
      backgroundColor="#ffffff"
      radius={1}
    />
  );
}
```

### With Ref (for downloads and methods)

```tsx
import { useRef } from "react";
import { BeautifulQRCode, type BeautifulQRCodeRef } from "@beautiful-qr-code/react";

function App() {
  const qrRef = useRef<BeautifulQRCodeRef>(null);

  const handleDownload = async () => {
    await qrRef.current?.download({
      name: "my-qr-code",
      extension: "png",
    });
  };

  return (
    <>
      <BeautifulQRCode
        ref={qrRef}
        data="https://example.com"
        radius={1}
      />
      <button onClick={handleDownload}>Download QR Code</button>
    </>
  );
}
```

### Dynamic Updates

```tsx
import { useState } from "react";
import { BeautifulQRCode } from "@beautiful-qr-code/react";

function App() {
  const [url, setUrl] = useState("https://example.com");

  return (
    <>
      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter URL"
      />
      <BeautifulQRCode data={url} />
    </>
  );
}
```

### With Custom Styling

```tsx
import { BeautifulQRCode } from "@beautiful-qr-code/react";

function App() {
  return (
    <BeautifulQRCode
      data="https://example.com"
      foregroundColor="#1a73e8"
      backgroundColor="#f0f8ff"
      radius={1}
      className="qr-code-container"
      style={{ maxWidth: "300px" }}
    />
  );
}
```

## Props

All props from the core `QRCodeConfig` are supported:

| Prop               | Type                       | Default         | Description                        |
| ------------------ | -------------------------- | --------------- | ---------------------------------- |
| `data`             | `string`                   | **Required**    | Data to encode                     |
| `type`             | `"svg" \| "canvas"`        | `"svg"`         | Output type                        |
| `foregroundColor`  | `string`                   | `"#000"`        | QR code color                      |
| `backgroundColor`  | `string`                   | `"transparent"` | Background color                   |
| `radius`           | `number`                   | `1`             | Corner radius (0-1)                |
| `padding`          | `number`                   | `1`             | Padding (in modules)               |
| `hasLogo`          | `boolean`                  | `false`         | Clear center space                 |
| `logoUrl`          | `string`                   | `undefined`     | Logo image URL                     |
| `className`        | `string`                   | `undefined`     | CSS class name                     |
| `style`            | `React.CSSProperties`      | `undefined`     | Inline styles                      |

## Ref Methods

When using a ref, you have access to these methods:

### `download(options?)`

Download the QR code.

```tsx
await qrRef.current?.download({
  name: "qr-code",
  extension: "png", // or "svg"
});
```

### `getSVG()`

Get the SVG string.

```tsx
const svg = await qrRef.current?.getSVG();
```

### `getCanvas()`

Get the canvas element.

```tsx
const canvas = await qrRef.current?.getCanvas();
```

### `update(config)`

Programmatically update the QR code.

```tsx
qrRef.current?.update({
  foregroundColor: "#ff0000",
  radius: 0.5,
});
```

### `qrCode`

Access the underlying `QRCodeStyling` instance.

```tsx
const instance = qrRef.current?.qrCode;
```

## TypeScript

Full TypeScript support included:

```tsx
import type {
  BeautifulQRCodeProps,
  BeautifulQRCodeRef,
  QRCodeConfig,
} from "@beautiful-qr-code/react";
```

## License

MIT © [Matthew Blode](https://mblode.com)
