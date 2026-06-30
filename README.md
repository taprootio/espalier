# Espalier

Espalier is Taproot's enterprise-grade web component design system. It ships as
standard ES modules built on Lit, custom elements, Shadow DOM, CSS custom
properties, and native form participation.

This npm package contains compiled Espalier artifacts only. Source code, tests,
architecture records, build tooling, and private development materials are not
included in this package or in the public artifact repository.

> **License:** Espalier is proprietary software, not open source. A public npm
> install grants a **30-day Evaluation** license only; production use requires a
> paid Order Form. See [`LICENSE`](./LICENSE) for the full terms and `licenses/`
> for third-party notices. Licensing questions: legal@taproot.io

## Installation

```bash
npm install @taprootio/espalier
```

## Basic Usage

Import the root element and the components you use:

```js
import "@taprootio/espalier/root";
import "@taprootio/espalier/button";
```

Then render Espalier components inside `<esp-root>`:

```html
<esp-root>
  <esp-button label="Save" collapsed></esp-button>
</esp-root>
```

You can also import the full component bundle:

```js
import "@taprootio/espalier";
```

## Public Metadata

The package includes machine-readable public API metadata:

- `custom-elements.json` for custom element APIs
- `espalier.token-manifest.json` for public CSS custom properties
- `espalier.css-data.json` for CSS language tooling

## License

Espalier is proprietary software. See `LICENSE` for the package license and
`licenses/` for third-party notices and asset provenance.

Production use requires a paid order form or another written agreement with
Taproot unless the license expressly allows the use case.

## Source Access

No source code rights are granted by this package. Source access, source escrow,
or source snapshot transactions require a separate written agreement.
