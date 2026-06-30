/**
 * @module theme
 *
 * Data-layer for the Espalier theming system.
 *
 * Defines the {@link EspalierTheme} interface, default light and dark
 * themes, and utilities for encoding, decoding, merging, and
 * validating theme objects.
 *
 * A theme encapsulates **every** tuneable parameter of the design
 * system — from the OKLCH seed color to spacing ratios, lightness
 * curves, chroma clamps, and semantic color mappings.  Two theme
 * objects (`light-theme` and `dark-theme`) are passed to `<esp-root>`
 * as Base64-encoded JSON attributes; the active `scheme` attribute
 * selects which one is applied.
 *
 * @example
 * ```ts
 * import {
 *   DEFAULT_LIGHT_THEME,
 *   mergeTheme,
 *   parseTheme,
 *   validateTheme,
 * } from './theme.js';
 *
 * const result = validateTheme(atob(JSON.stringify({ seedColor: 'oklch(0.6 0.2 30)' })));
 * if (result.valid) {
 *   const partial = parseTheme(myBase64String)!;
 *   const theme   = mergeTheme(DEFAULT_LIGHT_THEME, partial);
 * }
 * ```
 */
/** A key in the lightness ramp.  Each maps to a perceptual role. */
export type LightnessKey = "surface" | "raised1" | "raised2" | "raised3" | "raised4" | "accent" | "muted" | "text" | "border" | "ink" | "shadow";
/** Lightness values (0–1) for every ramp position. */
export type LightnessMap = Record<LightnessKey, number>;
/**
 * A geometric color-theory variant **or** a fixed semantic hue.
 *
 * Geometric variants are derived by rotating the seed hue; semantic
 * hues (`danger`, `success`, `warning`) use fixed angles defined
 * in `semanticHues`.
 */
export type ColorSource = "primary" | "analogous-left" | "analogous-right" | "complementary" | "split-complementary-left" | "split-complementary-right" | "triadic-left" | "triadic-right" | "danger" | "success" | "warning";
/**
 * Non-primary color sources — the ten variants that can carry
 * independent chroma overrides.
 *
 * Primary is excluded because its chroma is always the seed
 * color's chroma.
 */
export type VariantColorSource = Exclude<ColorSource, "primary">;
/** Every semantic color token the system computes. */
export type SemanticColorName = "background" | "layer1" | "layer2" | "layer3" | "layer4" | "actionBackground" | "actionText" | "border" | "shadow" | "text" | "dangerText" | "headings" | "headingsHover" | "link" | "linkHover" | "linkHoverBg" | "inputCaret" | "inputSelection" | "inputSelectionBg";
/** Chroma range enforced on a semantic token before gamut mapping. */
export interface ChromaRange {
    /** Minimum chroma (≥ 0). */
    min: number;
    /** Maximum chroma (≤ 0.4). */
    max: number;
}
/**
 * Describes how a single semantic color is derived:
 * which color source provides the hue + chroma, and which
 * lightness ramp position sets the perceived brightness.
 */
export interface SemanticMapping {
    /** The color variant or semantic hue to sample. */
    source: ColorSource;
    /** The lightness ramp position to apply. */
    lightness: LightnessKey;
}
/** Full mapping table — one entry per semantic color token. */
export type SemanticMappings = Record<SemanticColorName, SemanticMapping>;
/** The complete, resolved Espalier theme. */
export interface EspalierTheme {
    /** OKLCH seed color string — drives the entire palette. */
    seedColor: string;
    /** CSS `font-family` for body / UI text. */
    fontBody: string;
    /** CSS `font-family` for headings. */
    fontHeadings: string;
    /** CSS `font-family` for brand marks and product names. */
    fontBrand: string;
    /** CSS `font-family` for code / monospace text. */
    fontMonospace: string;
    /**
     * CSS `font-weight` for body / UI text.
     *
     * Accepts any valid CSS font-weight value: numeric (`"400"`,
     * `"700"`, range 1–1000), keyword (`"normal"`, `"bold"`,
     * `"lighter"`, `"bolder"`), or CSS-wide keyword (`"inherit"`,
     * `"initial"`, `"unset"`, `"revert"`, `"revert-layer"`).
     *
     * Emitted as `--esp-font-weight-body`.
     *
     * @default "normal"
     */
    fontWeightBody: string;
    /**
     * CSS `font-weight` for headings.
     *
     * Accepts the same values as {@link fontWeightBody}.
     *
     * Emitted as `--esp-font-weight-headings`.
     *
     * @default "bold"
     */
    fontWeightHeadings: string;
    /**
     * CSS `font-weight` for brand marks and product names.
     *
     * Accepts the same values as {@link fontWeightBody}.
     *
     * Emitted as `--esp-font-weight-brand`.
     *
     * @default "bold"
     */
    fontWeightBrand: string;
    /**
     * CSS `font-weight` for code / monospace text.
     *
     * Accepts the same values as {@link fontWeightBody}.
     *
     * Emitted as `--esp-font-weight-monospace`.
     *
     * @default "normal"
     */
    fontWeightMonospace: string;
    /** External stylesheets injected into `document.head`. */
    stylesheets: string[];
    /** Root font size in px (sets the HTML root `font-size`). */
    rootFontSize: number;
    /** Modular ratio for the type scale (Major Third = 1.25). */
    typeRatio: number;
    /** Modular ratio for the spacing scale (Golden Ratio ≈ 1.618). */
    spaceRatio: number;
    /** Global border-radius in rem. */
    borderRadius: number;
    /** Minimum viewport width (px) for fluid interpolation. */
    viewportMin: number;
    /** Maximum viewport width (px) for fluid interpolation. */
    viewportMax: number;
    /** Hue-rotation angles for geometric color variants. */
    angles: {
        /** Analogous offset from seed (default 30). */
        analogous: number;
        /** Complementary offset from seed (default 180). */
        complementary: number;
        /**
         * Split-complementary offset **from the complement**.
         * The mirror is computed automatically (default 30).
         */
        splitComplementary: number;
        /** Triadic offset from seed (default 120). */
        triadic: number;
    };
    /** Fixed hue angles for danger / success / warning colors. */
    semanticHues: {
        /** Danger hue angle (default 27, red-orange). */
        danger: number;
        /** Success hue angle (default 150, green). */
        success: number;
        /** Warning hue angle (default 90, yellow-green). */
        warning: number;
    };
    /**
     * Per-variant chroma overrides (OKLCH chroma, 0–0.4).
     *
     * Each entry sets the **base chroma** for the corresponding
     * color variant, overriding the seed color's chroma for that
     * variant only.  Omitted entries inherit the seed color's
     * chroma at compute time.
     *
     * This is independent of the per-semantic-token `chroma` ranges
     * which clamp chroma *after* derivation.  `variantChroma` controls
     * the input chroma of the variant itself, while `chroma` controls
     * the output range of each semantic token.
     *
     * @example
     * ```ts
     * // Make complementary colors more vivid, mute triadic colors
     * variantChroma: {
     *   "complementary": 0.22,
     *   "triadic-left": 0.06,
     *   "triadic-right": 0.06,
     * }
     * ```
     */
    variantChroma: Partial<Record<VariantColorSource, number>>;
    /** Lightness values (0–1) for the eleven ramp positions. */
    lightness: LightnessMap;
    /** Per-semantic-token chroma min / max. */
    chroma: Record<SemanticColorName, ChromaRange>;
    /** Maps each semantic token to its color source + lightness. */
    semanticMappings: SemanticMappings;
    /** Optional CSS `background-image` for the page surface. */
    pageBackgroundImage?: string;
    /** Opacity (0–1) for the page background image. */
    pageBackgroundImageOpacity?: number;
    /** Optional CSS `background-image` for `esp-box` surfaces. */
    boxBackgroundImage?: string;
    /** Opacity (0–1) for the box background image. */
    boxBackgroundImageOpacity?: number;
    /** Opacity (0–1) for the vellum (modal overlay) backdrop. */
    vellumOpacity?: number;
    /** Optional CSS `background-image` for vellum overlays. */
    vellumBackgroundImage?: string;
    /** Opacity (0–1) for the vellum background image layer. */
    vellumBackgroundImageOpacity?: number;
}
/** Recursively-partial version of {@link EspalierTheme}. */
export type PartialTheme = DeepPartial<EspalierTheme>;
/** Validation result returned by {@link validateTheme}. */
export interface ThemeValidationResult {
    /** `true` when there are zero errors (warnings are allowed). */
    valid: boolean;
    /** Hard failures — the theme should not be applied. */
    errors: string[];
    /** Soft issues — the theme will work but values are unusual. */
    warnings: string[];
}
/** Ordered list of all semantic color token names. */
export declare const SEMANTIC_COLOR_NAMES: readonly SemanticColorName[];
/** Valid color-source identifiers for {@link SemanticMapping.source}. */
export declare const COLOR_SOURCES: readonly ColorSource[];
/**
 * Non-primary color sources that support independent chroma overrides.
 *
 * Matches the ten entries in {@link VariantColorSource}.
 */
export declare const VARIANT_COLOR_SOURCES: readonly VariantColorSource[];
/** Valid keys for the lightness ramp. */
export declare const LIGHTNESS_KEYS: readonly LightnessKey[];
/**
 * Default lightness ramp for the **light** scheme.
 *
 * High values for surfaces → low values for text, following the
 * natural top-to-bottom contrast gradient of a printed page.
 */
export declare const DEFAULT_LIGHT_LIGHTNESS: Readonly<LightnessMap>;
/**
 * Default lightness ramp for the **dark** scheme.
 *
 * Inverted: low values for surfaces, high values for text.
 */
export declare const DEFAULT_DARK_LIGHTNESS: Readonly<LightnessMap>;
/**
 * Default semantic color mappings that match the existing CSS.
 *
 * Each entry tells the color engine which variant supplies the
 * hue and which lightness key sets the perceived brightness.
 */
export declare const DEFAULT_SEMANTIC_MAPPINGS: Readonly<SemanticMappings>;
/**
 * The built-in **light** theme.
 *
 * Identical to the dark theme in every field except `lightness`,
 * which uses a high-surface / low-text ramp suited for bright
 * backgrounds.
 */
export declare const DEFAULT_LIGHT_THEME: Readonly<EspalierTheme>;
/**
 * The built-in **dark** theme.
 *
 * Identical to the light theme in every field except `lightness`,
 * which uses a low-surface / high-text ramp suited for dark
 * backgrounds.
 */
export declare const DEFAULT_DARK_THEME: Readonly<EspalierTheme>;
/**
 * Recursively-partial utility type.
 *
 * Arrays are left as-is (a partial array is still an array),
 * while plain objects are made deeply optional.
 */
type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends (infer U)[] ? U[] : T[P] extends Record<string, unknown> ? DeepPartial<T[P]> : T[P];
};
/**
 * Convert a {@link SemanticColorName} (camelCase) to its CSS
 * custom-property name (kebab-case with `--esp-color-` prefix).
 *
 * ```
 * linkHoverBg → --esp-color-link-hover-bg
 * layer1      → --esp-color-layer-1
 * ```
 */
export declare function semanticToCSS(name: SemanticColorName): string;
/**
 * Decode a Base64-encoded JSON string into a {@link PartialTheme}.
 *
 * Returns `null` if decoding or JSON parsing fails — never throws.
 *
 * Unsafe property names (`__proto__`, `constructor`, `prototype`)
 * are stripped during parsing via a JSON reviver to prevent
 * prototype pollution from untrusted encoded themes.
 *
 * @param base64 A Base64-encoded JSON string.
 * @returns The decoded partial theme, or `null` on failure.
 */
export declare function parseTheme(base64: string): PartialTheme | null;
/**
 * Encode a {@link PartialTheme} as a Base64 JSON string.
 *
 * The inverse of {@link parseTheme}.
 *
 * @param partial The partial theme to encode.
 * @returns A Base64-encoded JSON string.
 */
export declare function encodeTheme(partial: PartialTheme): string;
/**
 * Deep-merge a {@link PartialTheme} over a set of defaults.
 *
 * Primitive fields are replaced; nested objects (`angles`,
 * `semanticHues`, `lightness`, `chroma`, `semanticMappings`)
 * are merged key-by-key.  Arrays (`stylesheets`) are replaced
 * wholesale.
 *
 * @param defaults The fully-resolved base theme.
 * @param overrides User-supplied partial overrides.
 * @returns A new fully-resolved {@link EspalierTheme}.
 */
export declare function mergeTheme(defaults: EspalierTheme, overrides: PartialTheme): EspalierTheme;
/**
 * Validate a Base64-encoded theme string.
 *
 * Checks structure, types, and value ranges.  The function is
 * intentionally lenient on unknown keys (future-proofing) but
 * strict on the keys it recognises.
 *
 * @param base64 A Base64-encoded JSON string representing a
 *   partial or full theme.
 * @returns A {@link ThemeValidationResult} with `valid`, `errors`,
 *   and `warnings`.
 */
export declare function validateTheme(base64: string): ThemeValidationResult;
/**
 * Keys of {@link EspalierTheme} whose values are nested objects
 * and therefore need key-by-key merging instead of wholesale
 * replacement when combining two {@link PartialTheme} objects.
 */
export declare const NESTED_THEME_KEYS: readonly ["angles", "chroma", "lightness", "semanticHues", "semanticMappings", "variantChroma"];
/**
 * Deep-merge two {@link PartialTheme} objects.
 *
 * Top-level primitive fields are replaced by the override when the
 * override value is not `undefined`.  Override keys that are
 * explicitly `undefined` are skipped so they don't erase
 * previously-layered values.
 *
 * Nested-object fields listed in {@link NESTED_THEME_KEYS} are
 * merged key-by-key (also skipping `undefined` inner values) so
 * that the override adds to (rather than replaces) the base.
 *
 * This differs from {@link mergeTheme}, which merges a
 * {@link PartialTheme} over a fully-resolved {@link EspalierTheme}.
 * `mergePartials` keeps the result partial — useful when layering
 * multiple partial overrides before resolving against defaults.
 *
 * @param base   The base partial theme.
 * @param override Partial overrides to apply on top.
 * @returns A new {@link PartialTheme} with merged values.
 */
export declare function mergePartials(base: PartialTheme, override: PartialTheme): PartialTheme;
/**
 * Layer multiple encoded theme strings into a single encoded result.
 *
 * Each argument is a Base64-encoded JSON {@link PartialTheme} (as
 * produced by {@link encodeTheme}).  They are parsed, merged left
 * to right via {@link mergePartials}, and re-encoded.
 *
 * Entries that are `null`, `undefined`, empty strings, or strings
 * that fail to decode/parse are silently skipped, making it safe
 * to pass optional or potentially-invalid theme overrides without
 * conditional logic.
 *
 * @param encodedThemes Variadic encoded theme strings.
 * @returns A single Base64-encoded merged theme.
 */
export declare function layerThemes(...encodedThemes: Array<string | undefined | null>): string;
/**
 * Build the Taproot **light** default theme as an encoded string.
 *
 * @param backgroundImageUrl URL of the page background image
 *   (e.g. a manifest-hashed asset path or a static path).
 *   Wrapped in `url("…")` automatically — the URL is escaped
 *   so special characters cannot break the CSS context.
 * @returns A Base64-encoded {@link PartialTheme}.
 */
export declare function buildTaprootLightTheme(backgroundImageUrl: string): string;
/**
 * Build the Taproot **dark** default theme as an encoded string.
 *
 * @param backgroundImageUrl URL of the page background image
 *   (e.g. a manifest-hashed asset path or a static path).
 *   Wrapped in `url("…")` automatically — the URL is escaped
 *   so special characters cannot break the CSS context.
 * @returns A Base64-encoded {@link PartialTheme}.
 */
export declare function buildTaprootDarkTheme(backgroundImageUrl: string): string;
export {};
