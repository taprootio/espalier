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
 * The ratio a configured-brand logo's box is reserved at before its bytes
 * arrive, shared by both consumers so they cannot drift apart.
 *
 * Both hosts give the logo a definite block size and leave the inline size to
 * the image, so until the image resolves there is no natural ratio to derive it
 * from: a pending request lays the element out at zero inline size and a failed
 * one at the width of its alt text. Either way the brand region resizes for a
 * reason that has nothing to do with the logo — on first paint, and again on
 * every scheme swap that fails, because both schemes exchange `src` at runtime.
 *
 * Each host spends it as the fallback of its own
 * `--esp-{header,footer}-brand-logo-aspect-ratio`, in an
 * `aspect-ratio: auto <ratio>` declaration. `auto` is what makes this one
 * declaration the whole fix: it keeps a replaced element's *natural* ratio
 * authoritative whenever it has one, so a logo that loads is laid out exactly
 * as it is today — including a very wide one, where the inline cap clamps the
 * used width without feeding back into the definite block size. The ratio
 * governs only the states with nothing to measure.
 *
 * `3 / 1` because the existing caps already imply a wordmark of about that
 * shape: the footer's `3rem` block size against a `12rem` inline cap clamps at
 * 4:1, and the header's `0.72 x --esp-header-height` against the same cap
 * clamps near 3.7:1. A 3:1 reservation is therefore never born clamped, so the
 * reserved box is always the full ratio box.
 */
export declare const CONFIGURED_BRAND_LOGO_ASPECT_RATIO: import("lit").CSSResult;
/**
 * Keep a failed logo's alt text from deciding how wide the logo's box is.
 *
 * The `alt` text is not suppressed — it still names the image for assistive
 * technology and still renders as the visible fallback. But a failed image is
 * no longer replaced content, so it takes an automatic minimum size from its
 * own text, and a minimum wider than the reserved box wins: measured in real
 * Chrome, a one-word alt of 37 characters pushed the header's logo back out to
 * its inline cap and swallowed the reservation whole. Allowing a break anywhere
 * makes that minimum one character wide, so the reserved ratio decides the box
 * and the alt text wraps inside it.
 *
 * The footer already had this by inheritance — it sets `overflow-wrap` on
 * `.configured-brand`, where the header sets it only on `.brand-text` — so this
 * makes the two consumers agree rather than changing the footer. It has no
 * effect at all on an image that loads, because replaced content has no text to
 * break.
 */
export declare const configuredBrandLogoGeometry: import("lit").CSSResult;
/**
 * Render the shared configured-brand fallback used by header and footer.
 * Plain anchors and images are intentional: a brand identity should not gain
 * the interaction chrome of Espalier's application-navigation controls.
 */
export declare function renderConfiguredBrand({ brandLogo, brandText, brandHref, brandAlt, }: ConfiguredBrandOptions): import("lit-html").TemplateResult<1> | typeof nothing;
