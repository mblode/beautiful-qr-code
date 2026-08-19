import { defineConfig } from "oxfmt";
import ultracite from "ultracite/oxfmt";

export default defineConfig({
  ...ultracite,
  ignorePatterns: [
    ...ultracite.ignorePatterns,
    // Written by `changeset version` in CI on every release. The generated
    // markdown does not match oxfmt, so the release commit itself turned the
    // lint job red, and formatting them by hand just gets overwritten by the
    // next release. Ultracite's preset covers a lot of generated output but
    // not this one.
    "**/CHANGELOG.md",
  ],
});
