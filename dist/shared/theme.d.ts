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
import { type DataPalette, type DataRamps, type PartialDataRamps } from "./data-colors.js";
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
/**
 * The object form of an anchor: a required base `color` plus named
 * sub-slots — per-family variants the way designers already specify
 * them (`rose.text` for the deepened rose that may carry copy).
 */
export type ThemeAnchorSlots = {
    color: string;
} & Record<string, string>;
/**
 * A named brand color in a **resolved** theme.
 *
 * Either a color string, or the slot object — which always carries its
 * base `color`, because a partial that names only slots refines an
 * anchor rather than replacing it. Like `seedColor`, this type states
 * the contract `validateTheme` enforces: a theme assembled from an
 * unvalidated partial that never declared a base color reports an error
 * there, and degrades to the seed at runtime.
 *
 * Every value accepts any CSS color form (ESP0161) and is normalized to
 * OKLCH at the merge boundary.
 */
export type ThemeAnchor = string | ThemeAnchorSlots;
/**
 * A named brand color in a **partial** theme, where an object form may
 * name slots alone — `{ rose: { hover: "#88404c" } }` refines the rose
 * anchor a base theme already declared.
 */
export type PartialThemeAnchor = string | Record<string, string>;
/** Anchors as they appear in a partial theme. */
export type PartialThemeAnchors = Record<string, PartialThemeAnchor>;
/**
 * Named brand colors, keyed by slug.
 *
 * Anchors are free-standing color sources for semantic mappings —
 * `source: "anchor:<name>"` — so a multi-color brand is declared as the
 * swatches the designer handed over instead of being bent through hue
 * geometry and per-token chroma clamps. See ADR-015.
 */
export type ThemeAnchors = Record<string, ThemeAnchor>;
/**
 * A semantic mapping's color source: a geometric or status family from
 * {@link ColorSource}, or a declared anchor — `anchor:<name>` for its
 * base color, `anchor:<name>.<slot>` for a sub-slot.
 *
 * An anchor source contributes its own hue **and chroma**; lightness
 * always comes from the mapping's ramp stop, and APCA enforcement
 * applies unchanged. Under an element variant, anchor sources stay
 * absolute — a brand color is a color, not a relationship to the seed,
 * so variant re-seeding does not rotate it.
 */
export type MappingSource = ColorSource | `anchor:${string}`;
/** Anchor names and slot names share one slug grammar. */
export declare const ANCHOR_SLUG_PATTERN: RegExp;
/** A parsed `anchor:` mapping source. */
export interface AnchorReference {
    name: string;
    slot?: string;
}
/**
 * Parse an `anchor:` mapping source into its reference, or return
 * `null` for anything that is not anchor syntax at all. (A reference
 * with an invalid or undeclared name parses fine here — declaration
 * checks belong to validateTheme and resolution.)
 */
export declare function parseAnchorSource(source: string): AnchorReference | null;
/**
 * Resolve an anchor reference to its declared color string.
 *
 * `anchor:<name>` on an object-form anchor resolves the `color` key; a
 * slot reference into a string-form anchor has nowhere to point and
 * resolves `null`, as do unknown names and slots.
 */
export declare function resolveAnchorColor(anchors: ThemeAnchors, reference: AnchorReference): string | null;
/**
 * Resolve a data color source to a concrete CSS color.
 *
 * Data palettes and ramps accept either a CSS color directly or the same
 * `anchor:<name>[.<slot>]` references as semantic mappings. The returned color
 * is parseable and opaque; invalid or unresolved sources return `null`.
 */
export declare function resolveDataColorSource(source: string, anchors: ThemeAnchors): string | null;
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
    /**
     * The color source to sample: a geometric/status family, or a
     * declared anchor as `anchor:<name>` / `anchor:<name>.<slot>`.
     */
    source: MappingSource;
    /** The lightness ramp position to apply. */
    lightness: LightnessKey;
}
/** Full mapping table — one entry per semantic color token. */
export type SemanticMappings = Record<SemanticColorName, SemanticMapping>;
/**
 * The designer-facing color roles.
 *
 * `semantic-groups.md` has always described these groups and then warned
 * that exposing the nineteen raw tokens is "handing users the engine
 * room instead of the dashboard" — but the groups were documentation
 * only. Roles make them addressable: a sentence a designer would say
 * becomes a line of theme.
 *
 * - `canvas` — the page and its raised surfaces
 * - `ink` — body copy, with a `heading` slot for titles
 * - `accent` — decoration (rules, icons, hover washes), with a `text`
 *   slot for the deepened variant that may carry copy
 * - `action` — filled action surfaces; its paired ink derives
 *   automatically (see {@link ROLE_PAIRED_INK})
 * - `structure` — borders and shadows
 *
 * `status` is deliberately absent: the danger/success/warning families
 * carry meaning through fixed hues (ADR-004) and are not a brand
 * decision.
 */
export type RoleName = "canvas" | "ink" | "accent" | "action" | "structure";
/**
 * A role binding: a color source, or an object with the base `color`
 * plus role-specific slots.
 *
 * Sources are the same vocabulary mappings use — a geometric family, a
 * status family, or an `anchor:<name>` reference (ADR-015).
 */
export type RoleSlotName = {
    canvas: never;
    ink: "heading";
    accent: "text";
    action: "ink";
    structure: never;
};
export type RoleBinding<R extends RoleName = RoleName> = MappingSource | ({
    color: MappingSource;
} & Partial<Record<RoleSlotName[R], MappingSource>>);
/**
 * The roles a theme declares. Every role is optional, and each one
 * admits only its own slots — `ink.heading`, `accent.text`,
 * `action.ink` — so the structural claims the roles layer makes are
 * checked by the type system, not only by validateTheme.
 */
export type ThemeRoles = {
    [R in RoleName]?: RoleBinding<R>;
};
/** Ordered role names, for validation and iteration. */
export declare const ROLE_NAMES: readonly RoleName[];
/**
 * Which semantic tokens each role slot paints, and at which ramp stop.
 *
 * This is the compilation table: it turns five designer-facing roles
 * into the nineteen engine-room tokens. `dangerText` is absent by
 * design — the status family is reserved and keeps its own source.
 *
 * The `accent` role has no body-text slot on purpose. "Rose is
 * decorative only" is a structural guarantee here, not a comment: text
 * that must come from the accent family comes through `accent.text`,
 * the deepened variant a designer picked for legibility.
 */
export declare const ROLE_TOKEN_PLAN: Readonly<Record<RoleName, Readonly<Record<string, ReadonlyArray<[SemanticColorName, LightnessKey]>>>>>;
/**
 * Ink slots that derive from another role when the theme does not
 * declare them.
 *
 * A role that paints a surface must also answer "what writes on it".
 * `action.ink` defaults to the canvas color: the ink paired with a
 * filled action is the page ground, and APCA enforcement against
 * `actionBackground` then guarantees it is legible — which is exactly
 * how "white on plum for reversed sections" becomes one theme line
 * instead of a hand-picked hex.
 */
export declare const ROLE_PAIRED_INK: Readonly<Record<string, {
    role: RoleName;
    slot: string;
}>>;
interface CompileRoleOptions {
    /** Token mappings declared explicitly at this merge boundary. */
    explicitMappings?: Partial<SemanticMappings>;
    /** Exact maximum paired-ink contrast of an action surface candidate. */
    actionSurfaceContrast?: (source: MappingSource, stop: LightnessKey) => number;
}
/**
 * Compile roles into semantic mappings.
 *
 * Only the tokens a declared role owns are emitted, so a theme that
 * declares no roles compiles to nothing and every existing theme keeps
 * its exact output. Token-level `semanticMappings` layer over the
 * result — the engine room stays available for the cases roles do not
 * reach.
 */
export declare function compileRoles(roles: ThemeRoles, lightness: LightnessMap, baseMappings: SemanticMappings, options?: CompileRoleOptions): Partial<SemanticMappings>;
/** The complete, resolved Espalier theme. */
export interface EspalierTheme {
    /**
     * Seed color — drives the entire palette.
     *
     * A theme author may supply any common CSS color form (`#rrggbb`,
     * `#rgb`, `rgb()`, `hsl()`, or `oklch()`); non-OKLCH forms are
     * converted at the merge boundary, so a **resolved** theme always
     * carries an `oklch()` string here.
     */
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
    /**
     * Named brand colors available to semantic mappings as
     * `anchor:<name>` sources. Empty by default — a single-color brand
     * needs none; a multi-color brand declares its swatches here instead
     * of bending hue angles. See {@link ThemeAnchors} and ADR-015.
     */
    anchors: ThemeAnchors;
    /**
     * Designer-facing color roles, compiled into
     * {@link EspalierTheme.semanticMappings} at merge time. Empty by
     * default; token-level mappings layer over whatever roles produce.
     * See {@link ThemeRoles} and ADR-016.
     */
    roles: ThemeRoles;
    /**
     * Eight stable categorical data-series colors. Each value is a CSS color or
     * an `anchor:<name>[.<slot>]` reference. Emitted as
     * `--esp-color-series-1`–`--esp-color-series-8`.
     */
    dataPalette: DataPalette;
    /**
     * Named sequential and diverging data ramps. Empty by default; each
     * declaration emits `--esp-color-ramp-<name>-1…<steps>`.
     */
    dataRamps: DataRamps;
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
/**
 * Recursively-partial version of {@link EspalierTheme}.
 *
 * `anchors` is stated explicitly rather than derived: a partial may
 * carry slot-only anchor overrides, which the resolved
 * {@link ThemeAnchor} deliberately does not permit.
 */
export type PartialTheme = Omit<DeepPartial<EspalierTheme>, "anchors" | "dataRamps"> & {
    anchors?: PartialThemeAnchors;
    dataRamps?: PartialDataRamps;
};
/** Validation result returned by {@link validateTheme}. */
export interface ThemeValidationResult {
    /** `true` when there are zero errors (warnings are allowed). */
    valid: boolean;
    /** Hard failures — the theme should not be applied. */
    errors: string[];
    /** Soft issues — the theme will work but values are unusual. */
    warnings: string[];
}
/**
 * Which semantic tokens are ink, what surface each sits on, and the
 * APCA contrast each must clear.
 *
 * This pairing lived as an identical hardcoded table inside both
 * `compute-theme-properties.ts` and `esp-element-base.ts` — invisible to
 * themes and duplicated in exactly the way this repository's adoption
 * rules exist to prevent. It belongs to the model: every serious system
 * makes the surface/ink pair the unit designers see (Material's
 * `on-primary`, shadcn's `-foreground`), and the roles layer derives an
 * action's ink from it rather than asking a designer to hand-pick a
 * legible color.
 *
 * Lc targets follow the APCA guidelines (ADR-002):
 *   90 → body text at any size
 *   75 → 16 px+ text (UI labels, links, body)
 *   60 → 24 px+ bold / 28 px+ normal (headings, carets, decorative)
 */
type TokenPairing = Readonly<{
    bg: SemanticColorName;
    targetLc: number;
}>;
export declare const TOKEN_PAIRINGS: Readonly<Record<"actionText", TokenPairing> & Partial<Record<SemanticColorName, TokenPairing>>>;
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
export declare const NESTED_THEME_KEYS: readonly ["anchors", "angles", "dataPalette", "dataRamps", "roles", "chroma", "lightness", "semanticHues", "semanticMappings", "variantChroma"];
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
