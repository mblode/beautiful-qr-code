---
"beautiful-qr-code": patch
"@beautiful-qr-code/react": patch
"@beautiful-qr-code/cli": patch
---

Fix bugs and clean up code across core, React, and CLI packages.

- Core: stop emitting a literal `null` text node in logo-less SVGs; strip explicit `undefined` config values so they no longer clobber defaults (e.g. `fill="undefined"`); make `imageUrlToDataUrl` work in Node (fetch + `response.ok` check + chunked base64) so `--logo` and SSR no longer crash; `update()` now awaits `render()` and returns a `Promise`; warn when a logo is combined with error-correction level `L`.
- React: remove the `@ts-expect-error` config-copy loop now that core strips `undefined`, and handle async render rejections.
- CLI: default invocation now writes a valid `qr-code.svg` and exits 0, infers format from the output extension, reports the real package version, and guards `--radius`/`--padding` against `NaN`.
