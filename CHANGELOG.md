# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-01-10

### Added

- Initial release of beautiful-qr-code
- `QRCodeStyling` class for creating beautiful QR codes
- Support for SVG and Canvas output formats
- Customizable foreground and background colors
- Rounded corners with configurable radius (0-1)
- Logo embedding with automatic center space clearing
- Configurable padding
- PNG and SVG download functionality
- Dynamic QR code updates via `update()` method
- TypeScript support with full type definitions
- Browser and Node.js compatibility
- Comprehensive API with `append()`, `getSVG()`, `getCanvas()`, and `download()` methods
- Legacy functional API with `createQRCode()` function
- Automatic error correction level selection (H for logos, M otherwise)
- Clean, modern API design

### Technical

- Built with TypeScript 5.9+
- Uses tsdown for fast, modern bundling
- Formatted and linted with biome.js
- Comprehensive test suite with vitest
- Under 15KB minified bundle size
- Tree-shakeable ESM exports
- Strict TypeScript mode enabled

[1.0.0]: https://github.com/mblode/beautiful-qr-code/releases/tag/v1.0.0
