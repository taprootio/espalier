/**
 * @module icons
 *
 * The offline story for Espalier icons (ESP0176).
 *
 * A fully self-contained page — an email attachment, an artifact, a
 * USB-stick deliverable — cannot fetch `/assets/icons.svg`, and the
 * browser blocks `data:` URLs as `<use>` targets. This module ships the
 * sprite as a string instead: inline it once, point the root at it with
 * the same-document form of `icon-sprite-url`, and every component
 * renders icons with zero network requests:
 *
 * ```js
 * import { installIconSprite } from "@taprootio/espalier/icons";
 *
 * document.querySelector("esp-root")
 *   .setAttribute("icon-sprite-url", installIconSprite());
 * ```
 *
 * The same-document form works for any sprite, not only this one: give
 * your own `<svg id="brand-icons"><symbol id="…">…</symbol></svg>` an
 * id, inline it, and set `icon-sprite-url="#brand-icons"` — components
 * adopt the referenced symbols into their shadow roots, which is what
 * makes same-document references work across shadow boundaries.
 */
import { ICON_SPRITE, ICON_SPRITE_ID } from "./icon-sprite.generated.js";
export { ICON_SPRITE, ICON_SPRITE_ID };
/**
 * Inline the Espalier sprite into a document (once — reruns are
 * no-ops) and return the `icon-sprite-url` value that references it.
 *
 * The sprite lands at the end of `<body>` (or the document element
 * before body exists), hidden and aria-hidden. Set the returned value
 * on the root *after* installing, so components adopt from a sprite
 * that is already present.
 *
 * @param target The document to install into; defaults to `document`.
 * @returns The same-document sprite reference, `"#esp-icons"`.
 */
export declare function installIconSprite(target?: Document): string;
