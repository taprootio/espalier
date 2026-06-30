export type EspalierIntentVariant = "neutral" | "success" | "warning" | "danger" | "info";
export declare const DEFAULT_ICON_SPRITE_URL = "/assets/icons.svg";
export declare const DEFAULT_ICON_VIEW_BOX = "0 0 24 24";
export declare const INTENT_VARIANTS: readonly EspalierIntentVariant[];
export declare function normalizeIntentVariant(value: string | null | undefined): EspalierIntentVariant;
export declare function getIconHref(icon: string | null | undefined, host?: Element | null | undefined): string;
export declare const getIconHrefForHost: typeof getIconHref;
export declare function getIconSpriteUrl(host: Element | null | undefined): string;
/**
 * Reset the per-process record of which invalid icon names have
 * already produced a `console.warn`. Tests should call this in a
 * `beforeEach` (or equivalent) so assertions on warning counts are
 * not order-dependent across the worker's module-cached state.
 */
export declare function resetWarnedInvalidIconNames(): void;
