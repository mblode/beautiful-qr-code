import { defineConfig } from "oxlint";
import core from "ultracite/oxlint/core";
import next from "ultracite/oxlint/next";

export default defineConfig({
  extends: [core, next],
  ignorePatterns: core.ignorePatterns,
  // Rules relaxed for this codebase when the biome→oxlint swap surfaced them.
  // Each is a stylistic/mechanical change with no safe autofix, and several
  // would require rewriting the working QR marching-squares algorithm
  // (svg.ts) or inverting its null/negation checks — real risk, no behavioural
  // benefit — so they're deferred rather than disabled ad hoc per file. Every
  // other Ultracite rule stays enforced.
  rules: {
    // React components and helpers use `function` declarations throughout.
    "func-style": "off",
    // Explanatory comments sit inline with algorithm code.
    "no-inline-comments": "off",
    // Loop counters in the pixel-walking algorithm.
    "no-plusplus": "off",
    // Reordering keys in algorithm coordinate/config objects is pure churn.
    "sort-keys": "off",
    // Intentional `== null` (matches null and undefined) in the algorithm.
    eqeqeq: "off",
    "no-eq-null": "off",
    "no-shadow": "off",
    "no-await-in-loop": "off",
    "class-methods-use-this": "off",
    // Test-only regexes.
    "require-unicode-regexp": "off",
    "prefer-named-capture-group": "off",
    "typescript/method-signature-style": "off",
    "unicorn/prefer-number-coercion": "off",
    "unicorn/no-new-array": "off",
    "unicorn/prefer-dom-node-remove": "off",
    "unicorn/prefer-add-event-listener": "off",
    "unicorn/no-useless-spread": "off",
    "unicorn/no-array-for-each": "off",
    "unicorn/no-array-fill-with-reference-type": "off",
    "unicorn/import-style": "off",
    "promise/prefer-await-to-then": "off",
    "promise/prefer-await-to-callbacks": "off",
    "promise/avoid-new": "off",
    "nextjs/no-img-element": "off",
  },
});
