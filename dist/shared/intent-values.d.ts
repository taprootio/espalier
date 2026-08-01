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
export declare function getIconSpriteUrl(host: Element | null | undefined): string;
/**
 * Reset the per-process record of which invalid icon names have
 * already produced a `console.warn`. Tests should call this in a
 * `beforeEach` (or equivalent) so assertions on warning counts are
 * not order-dependent across the worker's module-cached state.
 */
export declare function resetWarnedInvalidIconNames(): void;
