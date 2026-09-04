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
 * Render the shared configured-brand fallback used by header and footer.
 * Plain anchors and images are intentional: a brand identity should not gain
 * the interaction chrome of Espalier's application-navigation controls.
 */
export declare function renderConfiguredBrand({ brandLogo, brandText, brandHref, brandAlt, }: ConfiguredBrandOptions): typeof nothing | import("lit-html").TemplateResult<1>;
