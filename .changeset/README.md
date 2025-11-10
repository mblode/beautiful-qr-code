# Changesets

This directory contains changesets for versioning and publishing packages to npm.

## What are changesets?

Changesets are a way to manage versions and changelogs with a focus on monorepos. They help track which packages need to be released and ensure proper version bumps.

## Creating a changeset

When you make changes that should be released, create a changeset:

```bash
npm run changeset
```

This will:
1. Ask which packages have changed
2. Ask whether it's a major, minor, or patch change
3. Ask for a summary of the changes
4. Create a markdown file in `.changeset/` with your changeset

### Version types

- **Patch** (0.0.x): Bug fixes, documentation updates, internal changes
- **Minor** (0.x.0): New features, non-breaking changes
- **Major** (x.0.0): Breaking changes

## Publishing workflow

### Automated (Recommended)

1. Merge PRs with changesets to `main`
2. Create a git tag: `git tag v1.0.1 && git push --tags`
3. GitHub Actions will automatically:
   - Run tests
   - Build packages
   - Publish to npm
   - Create a GitHub release

### Manual

You can also trigger publishing manually from GitHub Actions UI or run locally:

```bash
# Bump versions based on changesets
npm run version-packages

# Publish to npm (requires NPM_TOKEN)
npm run release
```

## Important notes

- All three packages (core, react, cli) are **linked** - they version together
- The web app is **ignored** - it won't be published to npm
- Always create a changeset for user-facing changes
- Don't commit the changeset files - the CI/CD process consumes them

## GitHub Secret Required

For automated publishing to work, add `NPM_TOKEN` to repository secrets:

1. Generate a token at https://www.npmjs.com/settings/tokens (Automation token)
2. Add to GitHub: Settings → Secrets and variables → Actions → New repository secret
3. Name: `NPM_TOKEN`, Value: your token
