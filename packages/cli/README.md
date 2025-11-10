# @beautiful-qr-code/cli

Command-line interface for [beautiful-qr-code](https://github.com/mblode/beautiful-qr-code)

## Installation

```bash
# Global installation
npm install -g @beautiful-qr-code/cli

# Or use with npx (no installation required)
npx @beautiful-qr-code/cli "https://example.com"
```

## Usage

### Basic Usage

```bash
# Generate QR code (default: PNG format)
beautiful-qr-code "https://github.com/mblode/beautiful-qr-code"

# Short alias
bqr "https://example.com"
```

### Options

```bash
beautiful-qr-code <data> [options]
```

| Option              | Alias | Description                     | Default         |
| ------------------- | ----- | ------------------------------- | --------------- |
| `--output <path>`   | `-o`  | Output file path                | `qr-code.png`   |
| `--format <type>`   | `-f`  | Output format (svg or png)      | `png`           |
| `--color <hex>`     |       | Foreground color                | `#000000`       |
| `--bg <hex>`        |       | Background color                | `transparent`   |
| `--radius <number>` |       | Corner radius (0-1)             | `1`             |
| `--padding <number>`|       | Padding in modules              | `1`             |
| `--logo <path>`     |       | Logo image URL or path          | -               |

### Examples

#### Save as SVG

```bash
beautiful-qr-code "https://example.com" -o qr.svg -f svg
```

#### Custom colors

```bash
beautiful-qr-code "https://example.com" --color "#1a73e8" --bg "#f0f8ff"
```

#### Rounded corners

```bash
beautiful-qr-code "https://example.com" --radius 0.5
```

#### With logo

```bash
beautiful-qr-code "https://example.com" --logo "./logo.png"
```

#### Sharp corners with padding

```bash
beautiful-qr-code "https://example.com" --radius 0 --padding 2
```

#### Complete example

```bash
beautiful-qr-code "https://mblode.com" \
  -o my-qr.svg \
  -f svg \
  --color "#ff0000" \
  --bg "#ffffff" \
  --radius 1 \
  --padding 2
```

## Help

```bash
beautiful-qr-code --help
```

## Version

```bash
beautiful-qr-code --version
```

## Notes

- **PNG Export**: PNG format currently requires browser environment. Use SVG format for Node.js CLI.
- **Logo Images**: Logo URLs should be accessible or use local file paths.
- **Color Format**: Use hex format for colors (e.g., `#ff0000`).

## License

MIT © [Matthew Blode](https://mblode.com)
