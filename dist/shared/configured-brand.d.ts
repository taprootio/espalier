import { nothing } from "lit";
export interface ConfiguredBrandOptions {
    brandLogo: string;
    brandText: string;
    brandHref: string;
    brandAlt: string;
}
export interface ConfiguredBrandConfiguration {
    scheme: "light" | "dark" | "";
    brandLogo: string;
    brandColor: string;
    lightBrandLogo: string;
    darkBrandLogo: string;
    lightBrandColor: string;
    darkBrandColor: string;
}
export interface ResolvedConfiguredBrand {
    brandLogo: string;
    brandColor: string;
}
/**
 * Resolve the configured-brand logo and color for the active scheme.
 * Non-empty scheme values take precedence over generic values. Empty
 * scheme values are treated as absent so generic configuration and the
 * consuming component's CSS-token defaults remain available.
 */
export declare function resolveConfiguredBrand({ scheme, brandLogo, brandColor, lightBrandLogo, darkBrandLogo, lightBrandColor, darkBrandColor, }: ConfiguredBrandConfiguration): ResolvedConfiguredBrand;
/**
 * Reserve a logo's width while its image is loading or has failed.
 *
 * The header and footer give logos a fixed block size, so an image without
 * intrinsic dimensions would otherwise have zero width or use its alt text's
 * width. `aspect-ratio: auto <ratio>` uses this fallback only until a natural
 * ratio is available, keeping loaded logos unchanged.
 *
 * The 3:1 fallback fits below both hosts' existing inline caps, so the initial
 * reservation is not clipped.
 */
export declare const CONFIGURED_BRAND_LOGO_ASPECT_RATIO: import("lit").CSSResult;
/**
 * Allow failed-image alt text to wrap within the reserved logo width.
 *
 * A failed image can take its automatic minimum width from its alt text.
 * Breaking long words prevents that minimum from overriding the reserved box.
 * The text remains visible and accessible. Loaded images are unaffected.
 */
export declare const configuredBrandLogoGeometry: import("lit").CSSResult;
/**
 * Render the shared configured-brand fallback used by header and footer.
 * Plain anchors and images are intentional: a brand identity should not gain
 * the interaction chrome of Espalier's application-navigation controls.
 */
export declare function renderConfiguredBrand({ brandLogo, brandText, brandHref, brandAlt, }: ConfiguredBrandOptions): import("lit-html").TemplateResult<1> | typeof nothing;
