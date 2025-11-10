# Contributing to beautiful-qr-code

Thank you for your interest in contributing to beautiful-qr-code! We welcome contributions from the community.

## Code of Conduct

Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md).

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue on GitHub with:

- A clear, descriptive title
- Steps to reproduce the issue
- Expected behavior
- Actual behavior
- Your environment (browser, Node.js version, etc.)
- Code sample or repository demonstrating the issue (if possible)

### Suggesting Enhancements

We love to hear your ideas! Please create an issue with:

- A clear, descriptive title
- Detailed description of the proposed enhancement
- Why this enhancement would be useful
- Examples of how it would be used

### Pull Requests

1. **Fork the repository** and create your branch from `main`

   ```bash
   git clone https://github.com/YOUR-USERNAME/beautiful-qr-code.git
   cd beautiful-qr-code
   git checkout -b feature/my-new-feature
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Make your changes**

   - Write clear, readable code
   - Follow the existing code style
   - Add tests for new features
   - Update documentation as needed

4. **Run the checks**

   ```bash
   # Format and lint code
   pnpm check

   # Run type checking
   pnpm typecheck

   # Run tests
   pnpm test

   # Build the project
   pnpm build
   ```

5. **Commit your changes**

   We follow [Conventional Commits](https://www.conventionalcommits.org/):

   ```bash
   git commit -m "feat: add new feature"
   git commit -m "fix: resolve issue with..."
   git commit -m "docs: update README"
   git commit -m "test: add tests for..."
   ```

   Types:
   - `feat`: New feature
   - `fix`: Bug fix
   - `docs`: Documentation changes
   - `style`: Code style changes (formatting, etc.)
   - `refactor`: Code refactoring
   - `test`: Adding or updating tests
   - `chore`: Maintenance tasks

6. **Push to your fork**

   ```bash
   git push origin feature/my-new-feature
   ```

7. **Create a Pull Request**

   - Go to the original repository
   - Click "New Pull Request"
   - Select your branch
   - Fill in the PR template with:
     - Description of changes
     - Related issues
     - Screenshots (if applicable)
     - Breaking changes (if any)

## Development Setup

### Prerequisites

- Node.js 18+ or 20+
- pnpm (recommended) or npm

### Local Development

```bash
# Install dependencies
pnpm install

# Run tests in watch mode
pnpm test

# Build the library
pnpm build

# Run linting
pnpm lint

# Format code
pnpm format

# Run all checks (format, lint, typecheck)
pnpm check
```

## Testing Guidelines

- Write tests for all new features
- Ensure existing tests pass
- Aim for high code coverage (>80%)
- Test edge cases and error conditions
- Use descriptive test names

```typescript
describe("QRCodeStyling", () => {
  it("should generate QR code with custom colors", async () => {
    const qr = new QRCodeStyling({
      data: "test",
      foregroundColor: "#ff0000",
    });
    const svg = await qr.getSVG();
    expect(svg).toContain('fill="#ff0000"');
  });
});
```

## Code Style

We use [Biome](https://biomejs.dev/) for linting and formatting:

- 2 spaces for indentation
- Double quotes for strings
- Semicolons required
- Trailing commas in multi-line structures
- Arrow functions use parentheses
- Line width: 80 characters

Run `pnpm check` to automatically format and lint your code.

## Documentation

When adding new features:

- Update the README.md with examples
- Add JSDoc comments to public APIs
- Update TypeScript types
- Add entries to CHANGELOG.md

Example:

```typescript
/**
 * Downloads the QR code as a file
 * @param options - Download options
 * @param options.name - Filename without extension (default: "qr")
 * @param options.extension - File format: "svg" or "png" (default: "svg")
 * @returns Promise that resolves when download is complete
 */
async download(options?: { name?: string; extension?: FileExtension }): Promise<void> {
  // ...
}
```

## Project Structure

```
beautiful-qr-code/
├── src/
│   ├── index.ts         # Main export
│   ├── types.ts         # TypeScript types
│   ├── constants.ts     # Default options
│   ├── svg.ts           # SVG generation
│   ├── canvas.ts        # Canvas rendering
│   └── utils.ts         # Utility functions
├── tests/
│   └── index.test.ts    # Test suite
├── dist/                # Built files (generated)
└── docs/                # Additional documentation
```

## Release Process

(For maintainers only)

1. Update version in `package.json`
2. Update `CHANGELOG.md` with release date
3. Run `pnpm build` and `pnpm test`
4. Commit: `git commit -m "chore: release v1.x.x"`
5. Tag: `git tag v1.x.x`
6. Push: `git push && git push --tags`
7. Publish: `npm publish`
8. Create GitHub release

## Questions?

Feel free to:

- Open an issue for questions
- Start a discussion on GitHub Discussions
- Reach out to @mblode on Twitter

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

Thank you for making beautiful-qr-code better! 🎉
