# @beautiful-qr-code/react

## 1.0.10

### Patch Changes

- a966141: Fix bugs and clean up code across core, React, and CLI packages.

  - Core: stop emitting a literal `null` text node in logo-less SVGs; strip explicit `undefined` config values so they no longer clobber defaults (e.g. `fill="undefined"`); make `imageUrlToDataUrl` work in Node (fetch + `response.ok` check + chunked base64) so `--logo` and SSR no longer crash; `update()` now awaits `render()` and returns a `Promise`; warn when a logo is combined with error-correction level `L`.
  - React: remove the `@ts-expect-error` config-copy loop now that core strips `undefined`, and handle async render rejections.
  - CLI: default invocation now writes a valid `qr-code.svg` and exits 0, infers format from the output extension, reports the real package version, and guards `--radius`/`--padding` against `NaN`.

- Updated dependencies [a966141]
  - beautiful-qr-code@1.0.10

## 1.0.9

### Patch Changes

- b6eb96e: Improved CI/CD workflows with streamlined npm publishing using changesets action and added pre-commit formatting hooks with Ultracite
- Updated dependencies [b6eb96e]
  - beautiful-qr-code@1.0.9

## 1.0.8

### Patch Changes

- 03139dd: Improved CI/CD workflows with streamlined npm publishing using changesets action and added pre-commit formatting hooks with Ultracite. Updated documentation including new AGENTS.md guidelines and refreshed the web demo app with improved UI components and playground experience.
- Updated dependencies [03139dd]
  - beautiful-qr-code@1.0.8

## 1.0.7

### Patch Changes

- 4d048bb: chore: update npm publish workflow for trusted publishing
- Updated dependencies [4d048bb]
  - beautiful-qr-code@1.0.7
