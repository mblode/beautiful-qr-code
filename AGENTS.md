# Repository Guidelines

## Project Structure & Module Organization
This is a Turborepo monorepo with npm workspaces.
- `packages/core`: core library (`src/`, `tests/`, output in `dist/`).
- `packages/react`: React wrapper (`src/`, output in `dist/`).
- `packages/cli`: CLI (`src/`, output in `dist/`).
- `apps/web`: Next.js demo app (`app/`, `components/`, `lib/`, assets in `public/`).
- Root docs/assets: `README.md`, `CHANGELOG.md`, `example-qr-code.svg`.

## Build, Test, and Development Commands
Use npm (repo pins `npm@10.9.2`) and Node.js 18+.
- `npm install`: install workspace dependencies.
- `npm run dev`: run all dev tasks via Turbo.
- `npm run dev:web`: run the Next.js demo app only.
- `npm run build`: build all packages/apps (Turbo).
- `npm run build:core|build:react|build:cli`: build a single package.
- `npm run test` / `npm run test:core`: run tests (core uses Vitest).
- `npm run lint`, `npm run format`, `npm run typecheck`: quality checks.

## Coding Style & Naming Conventions
Formatting and linting are enforced by Biome (extends Ultracite).
- 2-space indentation, double quotes, semicolons, trailing commas, 80-char lines.
- Prefer `src/index.ts` as the public entry for each package.
- Tests are named `*.test.ts` under `packages/core/tests/`.

## Testing Guidelines
- Framework: Vitest (core package).
- Location: `packages/core/tests/*.test.ts`.
- Run with `npm run test` or `npm run test:core`.
- Coverage outputs to `coverage/`; no explicit minimum is configured, so keep new code well covered.

## Commit & Pull Request Guidelines
- Recent git history uses short, informal subjects (e.g., “Save”, “QR”) plus occasional descriptive sentences. For clarity, prefer concise, descriptive messages; Conventional Commits are recommended in `CONTRIBUTING.md`.
- PRs should include a clear summary, linked issues, screenshots for UI changes (`apps/web`), and call out breaking changes. Run lint, typecheck, tests, and build before opening.

## Releases & Versioning (Maintainers)
Changesets drive versioning and publishing.
- `npm run changeset`: add a changeset.
- `npm run version-packages`: bump versions.
- `npm run release`: build and publish.
