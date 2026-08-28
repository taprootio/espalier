/**
 * Dependency-free compiler for first-paint, site-specific font plans.
 *
 * Hosts load the checked-in fallback profile catalog at build time, collect
 * the exact requested faces, resolve only those WOFF2 sources, and embed the
 * resulting CSS in the document head before `<esp-root>` can paint.
 */
import type { EspalierTheme } from "./theme.js";
export type FontPlanTheme = Pick<EspalierTheme, "fontBody" | "fontHeadings" | "fontBrand" | "fontMonospace" | "fontWeightBody" | "fontWeightHeadings" | "fontWeightBrand" | "fontWeightMonospace">;
export type FontPlanSlot = "body" | "headings" | "brand" | "monospace";
export type FontPlanScheme = "light" | "dark";
export type FontPlanStyle = "normal" | "italic";
export type FontFaceRequest = {
    key: string;
    family: string;
    weight: number;
    style: FontPlanStyle;
};
export type ResolvedFontSource = {
    /** Absolute or root-relative URL for one WOFF2 face or subset. */
    url: string;
    /** Optional CSS unicode-range for this source's subset. */
    unicodeRange?: string;
};
export type FontFallbackProfile = readonly [
    fallbackIndex: number,
    fallbackVariant: string,
    sizeAdjust: number | null,
    ascentOverride: number | null,
    descentOverride: number | null,
    lineGapOverride: number | null
];
export type FontFallbackCatalog = {
    version: 1;
    metadata: {
        subset: string;
        percentScale: number;
        familyCount: number;
        variantCount: number;
        [key: string]: unknown;
    };
    bases: ReadonlyArray<readonly [family: string, variants: Readonly<Record<string, readonly string[]>>]>;
    profiles: Readonly<Record<string, Readonly<Record<string, readonly FontFallbackProfile[]>>>>;
};
export type FontPlanProfileMiss = {
    family: string;
    weight: number | null;
    style: FontPlanStyle;
    schemes: FontPlanScheme[];
    slots: FontPlanSlot[];
};
export type CompileFontPlanOptions = {
    lightTheme: FontPlanTheme;
    darkTheme: FontPlanTheme;
    catalog: FontFallbackCatalog;
    /** Sources keyed with {@link fontFaceRequestKey}. Unselected keys are ignored. */
    sources?: Readonly<Record<string, ResolvedFontSource | readonly ResolvedFontSource[]>>;
    /** Optional unique root id selector, for example `#site-shell`. Defaults to every `esp-root`. */
    rootSelector?: string;
};
export type CompiledFontPlan = {
    /** Minified CSS suitable for the existing inline page-head style block. */
    css: string;
    /** Exact, deduplicated faces that the host must resolve. */
    requests: FontFaceRequest[];
    /** Requested faces for which no source was supplied. */
    missingSources: FontFaceRequest[];
    /** Catalog families that lacked the requested weight/style profile. */
    missingProfiles: FontPlanProfileMiss[];
    /** Scheme/slot stacks represented by the emitted private effective tokens. */
    effectiveStacks: Record<FontPlanScheme, Record<FontPlanSlot, string>>;
    /** UTF-8 byte size of `css`, convenient for static-site budget checks. */
    byteLength: number;
};
/** Return the stable source-map key for a requested target face. */
export declare function fontFaceRequestKey(family: string, weight: number, style?: FontPlanStyle): string;
/** Return the fallback base indexes used for one Google Fonts category. */
export declare function fontFallbackBaseIndexes(category: string): readonly number[];
/**
 * Return the deterministic profile aliases a runtime font stack may reference
 * without loading the build-time profile catalog in the browser.
 */
export declare function fontFallbackAliases(family: string, weight: string | number, category: string, style?: FontPlanStyle): string[];
/**
 * Compile a complete, first-paint font plan from two resolved themes.
 *
 * Call once without `sources` to discover `requests`, resolve those assets in
 * the host build, then call again with the keyed source map for final CSS.
 */
export declare function compileFontPlan(options: CompileFontPlanOptions): CompiledFontPlan;
