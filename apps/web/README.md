# Beautiful QR Code - Demo Website

Interactive playground and documentation for [beautiful-qr-code](https://github.com/mblode/beautiful-qr-code).

## Features

- 🎨 Interactive QR code playground
- 📝 Live code examples
- 📦 Package documentation
- 💾 Download QR codes (SVG/PNG)
- 🎯 Real-time preview

## Development

```bash
# Install dependencies (from root)
pnpm install

# Start dev server
pnpm dev:web

# Build for production
cd apps/web && pnpm build

# Start production server
pnpm start
```

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Vercel will auto-detect Next.js in `apps/web`
3. Deploy with zero configuration

Or use the Vercel CLI:

```bash
vercel --prod
```

### Environment Variables

No environment variables required for basic functionality.

## Tech Stack

- **Next.js 16** - React framework with App Router
- **Tailwind CSS v4** - Utility-first styling
- **TypeScript** - Type safety
- **@beautiful-qr-code/react** - QR code component

## Project Structure

```
apps/web/
├── app/
│   ├── page.tsx          # Homepage
│   ├── layout.tsx        # Root layout
│   └── globals.css       # Tailwind v4 styles
├── components/
│   ├── QRPlayground.tsx  # Interactive playground
│   └── CodeSnippet.tsx   # Code display with copy
├── public/               # Static assets
└── package.json
```

## License

MIT © [Matthew Blode](https://blode.co)
