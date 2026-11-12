import { type CSSResult } from "lit";
/**
 * Style selected native blockquotes as themed panels with lead typography.
 * Use the result in Lit's `static styles`, or emit its `.cssText` into a
 * document stylesheet during server rendering. Importing this subpath needs
 * no DOM and does not register any components.
 *
 * The selector defaults to `blockquote` and is trimmed. Pass only trusted,
 * static developer CSS: this helper is not a user-input sanitizer. Comma lists
 * use the browser's forgiving `:where()` parsing; invalid branches do not match.
 * Explicitly empty quote or figure selectors throw `RangeError`.
 *
 * Pass `options.figureSelector` to style native figures and their direct
 * captions. This does not select their blockquotes. Attribution and safe URLs
 * remain the consumer's responsibility; cite identifies a work, not a person.
 * The empty decorative opening mark uses a local SVG mask: a document CSP
 * must allow `img-src data:` (or the corresponding default-src fallback).
 * A blocked/failed mask is transparent; forced colors hide the decoration.
 *
 * Base and child rules have zero specificity. A selected light-DOM paragraph
 * receives a color-only bridge over `esp-root`'s native paragraph ink. The
 * consumer keeps ownership of outer block rhythm, prose measure and font family.
 */
export declare function blockquoteStyles(selector?: string, options?: {
    figureSelector?: string;
}): CSSResult;
