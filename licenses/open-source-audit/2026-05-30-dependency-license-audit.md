# Espalier Dependency and License Audit

**Audit date:** 2026-05-30
**Repository:** `taproot-controls`
**Package version audited:** `@taprootio/espalier@1.162.0`
**Audit status:** Engineering draft for legal/commercial diligence

This audit preserves the open-source dependency/license position for Espalier's
commercial licensing work. It is not legal advice.

## Executive Summary

Espalier has a zero-runtime-dependency package footprint for an enterprise
front-end framework, with one required peer supplied by consumers:

- 0 direct runtime dependencies
- 1 required peer dependency: `lit`
- Runtime/peer dependency graph licenses found: BSD-3-Clause and MIT
- No GPL, LGPL, AGPL, SSPL, source-available, noncommercial, or unknown
  licenses were found in the runtime/peer graph
- Espalier vendors BSD-3-Clause source from `@lit-labs/virtualizer@2.1.1`;
  the required notice is preserved in `licenses/THIRD_PARTY_NOTICES.md`
- Direct dev dependencies are also permissively licensed
- Espalier also includes SVG icon paths adapted from Tabler Icons, which is MIT
  licensed; the required notice is preserved in `licenses/THIRD_PARTY_NOTICES.md`
- Installed package snapshot contained 421 unique third-party packages
  excluding Espalier itself, with no unknown licenses found

This strengthens Espalier's strategic-license position. A small runtime graph
reduces procurement friction, security-review surface area, third-party notice
complexity, and license-contamination concerns. For enterprise buyers, the
runtime story is the commercial headline; the dev/build graph still belongs in
diligence.

## Do Dev Dependencies Count?

Yes, but they count differently.

Dev dependencies usually do not create customer runtime redistribution
obligations unless their code, assets, generated text, or bundled output are
copied into the shipped package. They do count for:

- build-chain and supply-chain diligence
- security scanning and vulnerability management
- SBOM generation for the build environment
- reproducibility and provenance of release artifacts
- license review of generated assets, docs, codegen output, bundled helpers,
  and distributed CLI/build artifacts

Recommendation: lead with Espalier's tiny runtime/peer dependency graph in
commercial conversations, and preserve the dev dependency graph in the
diligence room for procurement and counsel.

## Audit Inputs

The audit was generated from:

- `package.json`
- installed package metadata under `node_modules/**/package.json`
- `npm ls --omit=dev --all --json`
- `npm ls --all --depth=0 --json`
- `bun pm ls --all`
- targeted Node metadata scans for declared direct dependencies, runtime
  transitive dependencies, and installed package license counts

The workspace currently has no `package-lock.json`; `bun.lock` is the lockfile
present in the repository. Run the final SBOM/audit from a clean install before
external delivery.

## Copied Asset Notices

Espalier includes source and asset material copied or adapted from permissively
licensed third-party projects.

| Material | Upstream | License | Notice file |
|----------|----------|---------|-------------|
| Lit Virtualizer source | https://github.com/lit/lit/tree/main/packages/labs/virtualizer | BSD-3-Clause | `licenses/THIRD_PARTY_NOTICES.md` |
| Tabler Icons SVG paths | https://github.com/tabler/tabler-icons | MIT | `licenses/THIRD_PARTY_NOTICES.md` |

BSD-3-Clause and MIT do not require visible in-product attribution, but they do
require preserving the upstream copyright notice and permission/license notice
in source copies or binary redistribution materials. Because Espalier
redistributes vendored source-derived JavaScript and copied SVG path data, the
notice file should ship with the package.

## Published Package Dependency Surface

| Role | Package | Version observed | License | Notes |
|------|---------|------------------|---------|-------|
| Peer dependency | `lit` | `3.3.2` | BSD-3-Clause | Required framework peer for consumers. |
| Vendored source | `@lit-labs/virtualizer` | `2.1.1` | BSD-3-Clause | Compiled into Espalier for virtualized picker/repeater/grid behavior; not an npm dependency. |

## Runtime / Peer Dependency Graph

| Package | Version observed | License | Source in graph |
|---------|------------------|---------|-----------------|
| `lit` | `3.3.2` | BSD-3-Clause | Peer dependency |
| `@lit/reactive-element` | `2.1.2` | BSD-3-Clause | Transitive via `lit` |
| `lit-element` | `4.2.2` | BSD-3-Clause | Transitive via `lit` |
| `lit-html` | `3.3.2` | BSD-3-Clause | Transitive via `lit` / `lit-element` |
| `@lit-labs/ssr-dom-shim` | `1.5.1` | BSD-3-Clause | Transitive via Lit packages |
| `@types/trusted-types` | `2.0.7` | MIT | Transitive type support via `lit-html` |

Runtime finding: no copyleft or unknown licenses found.

## Direct Dev Dependency Licenses

| Package | Version observed | License |
|---------|------------------|---------|
| `@11ty/eleventy` | `3.1.5` | MIT |
| `@custom-elements-manifest/analyzer` | `0.10.10` | MIT |
| `@js-temporal/polyfill` | `0.5.1` | ISC |
| `@taprootio/wtfm` | `0.12.3` | ISC |
| `@types/node` | `25.5.2` | MIT |
| `@vitest/coverage-v8` | `4.1.2` | MIT |
| `@wc-toolkit/jsdoc-tags` | `1.1.0` | MIT |
| `concurrently` | `9.2.1` | MIT |
| `eleventy-plugin-vento` | `5.4.3` | MIT |
| `eslint` | `9.39.4` | MIT |
| `eslint-config-prettier` | `10.1.8` | MIT |
| `eslint-plugin-lit` | `2.2.1` | MIT |
| `eslint-plugin-wc` | `3.1.0` | MIT |
| `glob` | `11.1.0` | BlueOak-1.0.0 |
| `globals` | `17.4.0` | MIT |
| `happy-dom` | `20.8.9` | MIT |
| `lit` | `3.3.2` | BSD-3-Clause |
| `pagefind` | `1.4.0` | MIT |
| `prettier` | `3.8.1` | MIT |
| `rolldown` | `1.0.0-rc.13` | MIT |
| `tslib` | `2.8.1` | 0BSD |
| `typescript` | `6.0.2` | Apache-2.0 |
| `typescript-eslint` | `8.58.0` | MIT |
| `vite` | `6.4.1` | MIT |
| `vitest` | `4.1.2` | MIT |

Direct-dev finding: all direct dev dependencies are permissively licensed.

## Installed Package License Snapshot

Installed unique third-party packages scanned, excluding Espalier itself: 421.

| License expression | Package count |
|--------------------|---------------|
| MIT | 336 |
| ISC | 26 |
| BSD-2-Clause | 17 |
| Apache-2.0 | 16 |
| BSD-3-Clause | 15 |
| BlueOak-1.0.0 | 8 |
| 0BSD | 1 |
| (MIT OR CC0-1.0) | 1 |
| Python-2.0 | 1 |

Installed snapshot finding: no unknown licenses found.

## Review Notes

- `BlueOak-1.0.0` is permissive but less familiar to procurement teams than
  MIT/BSD/Apache. It appears only in the dev/build graph in this snapshot.
- `Python-2.0` appears for `argparse@2.0.1` in the dev/build graph. Counsel
  should confirm notice treatment, but this is not a runtime dependency.
- `npm ls --omit=dev --all --json` reported extraneous local packages in the
  current `node_modules` directory: `@taprootio/espalier@1.140.5`,
  `get-tsconfig@4.13.7`, `resolve-pkg-maps@1.0.0`, `tsx@4.21.0`, and nested
  `esbuild` platform packages. These are not declared in `package.json`; run
  the final audit/SBOM from a clean install before publishing diligence
  materials.
- The public package declares `lit` as a peer dependency and vendors the
  virtualizer source. Release packaging should confirm the staged public
  package has an empty `dependencies` object and retains the `lit` peer.

## Recommended Follow-Ups

- Generate a formal SBOM, preferably SPDX or CycloneDX, from a clean install as
  part of task 068.
- Include runtime third-party notices with the compiled public package.
- Add CI release gating that fails on GPL, LGPL, AGPL, SSPL, unknown,
  noncommercial, or source-available third-party licenses.
- Re-run this audit after tasks 044, 046, 065, and 066 because obfuscation,
  release packaging, React wrappers, and Blazor wrappers may add new
  dependencies.
