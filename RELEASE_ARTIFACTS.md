# Release Artifacts

This repository should contain only audited Espalier release artifacts.

Allowed package artifacts:

- `dist/` compiled JavaScript and public `.d.ts` declarations
- `css/` runtime CSS and generated font preview assets
- `custom-elements.json`
- `espalier.token-manifest.json`
- `espalier.css-data.json`
- `README.md`
- `LICENSE`
- `package.json`
- public license, notice, and provenance files under `license/`

Forbidden artifacts:

- `src/`
- `__tests__/`
- `architecture/`
- `trellis/`
- `docs/`
- `scripts/`
- `.github/`
- source maps and declaration maps
- build configs and TypeScript caches
- private legal/deal documents
- private `taproot-controls` git history

The release pipeline must fail closed if an unexpected file appears.
