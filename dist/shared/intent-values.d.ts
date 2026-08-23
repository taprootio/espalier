export type EspalierIntentVariant = "neutral" | "success" | "warning" | "danger" | "info";
export declare const DEFAULT_ICON_SPRITE_URL = "/assets/icons.svg";
export declare const DEFAULT_ICON_VIEW_BOX = "0 0 24 24";
export declare const INTENT_VARIANTS: readonly EspalierIntentVariant[];
export declare function normalizeIntentVariant(value: string | null | undefined): EspalierIntentVariant;
export declare function getIconHrefForHost(icon: string | null | undefined, host?: Element | null | undefined): string;
/**
 * Former name of `getIconHrefForHost`.
 *
 * @deprecated Use `getIconHrefForHost`. This alias is retained for one release
 * so existing consumers keep compiling; it will be removed after that.
 *
 * NOTE: do not use an inline `{@link}` tag in this comment. On an exported
 * `const` alias the custom-elements-manifest analyzer tries to resolve the link
 * target and serializes the TypeScript AST node, which fails `build-cem` with
 * "Converting circular structure to JSON". A plain backticked name is safe.
 */
export declare const getIconHref: typeof getIconHrefForHost;
/**
 * The configured sprite, classified (ESP0176).
 *
 * - `url` — an ordinary sprite location; hrefs become `url#name`.
 * - `document` — the same-document form: a value that IS a fragment
 *   (`#sprite-id`) names an inline `<svg>` sprite already in the
 *   document — Espalier's own `ICON_SPRITE`, or any sprite the site
 *   provides. Hrefs become bare `#name` and components adopt the
 *   referenced symbols into their shadow roots.
 * - `none` — the empty value; generated sprite icons are disabled.
 */
export type IconSpriteReference = {
    kind: "url";
    url: string;
} | {
    kind: "document";
    spriteId: string;
} | {
    kind: "none";
};
export declare function getIconSpriteReference(host: Element | null | undefined): IconSpriteReference;
/** Classify a raw `icon-sprite-url` value. */
export declare function classifyIconSpriteValue(value: string | null | undefined): IconSpriteReference;
/**
 * The configured sprite URL with any fragment stripped, or `""` when
 * generated icons are off — including the same-document form, which
 * has no URL. Prefer {@link getIconSpriteReference}, which the
 * same-document mode of ESP0176 made the complete answer.
 */
export declare function getIconSpriteUrl(host: Element | null | undefined): string;
/**
 * Reset the per-process record of which invalid icon names have
 * already produced a `console.warn`. Tests should call this in a
 * `beforeEach` (or equivalent) so assertions on warning counts are
 * not order-dependent across the worker's module-cached state.
 */
export declare function resetWarnedInvalidIconNames(): void;
