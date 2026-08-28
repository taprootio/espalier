/**
 * @module theme-fit-report
 *
 * Dev-mode explanation of what the theme pipeline did to a theme
 * (ESP0163).
 *
 * Two pipeline mechanisms move a token away from the value a designer
 * wrote down, and both are silent:
 *
 * - **APCA enforcement** (ADR-002) shifts the lightness of a text token
 *   until it clears its Lc target against its background pair. Fitting
 *   the SHY brand moved three tokens and reported none of them.
 * - **Brand anchors** (ADR-015) resolve a `anchor:<name>[.<slot>]`
 *   source to a declared swatch, then re-light it from the mapping's
 *   ramp stop — so the emitted color is a relative of the swatch, not
 *   the swatch.
 *
 * The result is a mock that says one color and a render that says
 * another, with no record of the step in between. This module produces
 * that record.
 *
 * ## Sharing the derivation, not repeating it
 *
 * The report **cannot** disagree with the pipeline, because it does not
 * compute any token value:
 *
 * - `resolved` is read back out of the property record
 *   `computeThemeProperties` returns — it is the emitted custom
 *   property's value, not a re-derivation of it.
 * - `requested` is the pre-enforcement binding `deriveSemanticWithContrast`
 *   hands to its `onRequested` observer, i.e. the exact value
 *   `ensureContrast` then consumed.
 *
 * Only the *descriptive* numbers are computed here — the achieved Lc
 * scores and the ΔE to a declared anchor — and each of those calls the
 * same engine function the pipeline uses.
 *
 * Nothing runs unless a report is asked for: `computeThemeProperties`
 * takes the trace sink as an optional argument and does no reporting
 * work when it is absent.
 *
 * @example
 * ```ts
 * import { themeFitReport, printThemeFitReport } from './theme-fit-report.js';
 *
 * const report = themeFitReport(mergeTheme(DEFAULT_LIGHT_THEME, brand), 'light');
 * printThemeFitReport(report);          // console.table
 * report.adjustedTokens;                // ['linkHover']
 * ```
 */
import { type ColorVisionSimulation, type DataPalette, type DataSeriesKey } from "./data-colors.js";
import { type EspalierTheme, type LightnessReference, type MappingSource, type PartialTheme, type SemanticColorName } from "./theme.js";
/** What APCA enforcement did to one token. */
export interface ThemeFitApcaAction {
    /** The requested value, as an `oklch()` string. */
    from: string;
    /** The emitted value. */
    to: string;
    /** The minimum |Lc| the pairing requires. */
    targetLc: number;
    /** The semantic token supplying the background. */
    against: SemanticColorName;
    /** That background's value. */
    againstColor: string;
    /** |Lc| the requested value achieved against that background. */
    fromLc: number;
    /** |Lc| the emitted value achieves against that background. */
    toLc: number;
}
/** How far the emitted token landed from the brand swatch it names. */
export interface ThemeFitAnchor {
    /** The declared reference — `rose` or `rose.hover`. */
    reference: string;
    /** The anchor's declared color, as an `oklch()` string. */
    color: string;
    /**
     * ΔE-OK between the declared anchor and the emitted token. Expect a
     * non-zero number even on a perfect fit: lightness always comes from
     * the mapping's built-in stop or custom tone, so a swatch used as a
     * source is re-lit by design (ADR-015, ADR-020).
     */
    deltaE: number;
}
/** One semantic token's trip through the pipeline. */
export interface ThemeFitToken {
    /** The semantic token name. */
    token: SemanticColorName;
    /** The custom property it is emitted as. */
    property: string;
    /** The mapping's declared source. */
    source: MappingSource;
    /** The built-in ramp stop or custom tone reference the mapping selected. */
    lightness: LightnessReference;
    /** The value the mapping asked for, before contrast enforcement. */
    requested: string;
    /** The value actually emitted. */
    resolved: string;
    /** `true` when enforcement moved the token — `requested !== resolved`. */
    adjusted: boolean;
    /**
     * `false` when the source could not be resolved and the seed stood in.
     * A theme that passes `validateTheme` never reports this.
     */
    sourceResolved: boolean;
    /** Present when the source is a resolved anchor reference. */
    anchor?: ThemeFitAnchor;
    /** Present for the text tokens APCA enforcement guards. */
    apca?: ThemeFitApcaAction;
    /**
     * Present when the mapping was pinned token-level rather than compiled
     * from roles (ESP0175). `"declared"` means this surface's own
     * declaration pinned it; `"inherited"` means a root-level pin survived
     * into this context — the silent case this marker exists to surface,
     * since a zone's unexpected value then traces to a root theme line.
     */
    explicit?: "declared" | "inherited";
}
/**
 * A theme's fit report — the stable JSON shape the docs site renders.
 */
export interface ThemeFitReport {
    /** The scheme the theme was computed for. */
    scheme: "light" | "dark";
    /** The theme's seed color, as declared. */
    seedColor: string;
    /**
     * The theme's declared anchors, flattened to the reference strings a
     * mapping uses: `{ "rose": "oklch(…)", "rose.hover": "oklch(…)" }`.
     */
    anchors: Record<string, string>;
    /** Every semantic token, in the pipeline's derivation order. */
    tokens: ThemeFitToken[];
    /** The tokens APCA enforcement moved — the headline of the report. */
    adjustedTokens: SemanticColorName[];
}
/** One `console.table` row. */
export interface ThemeFitRow {
    token: string;
    source: string;
    requested: string;
    resolved: string;
    /** The APCA pairing and what it did; empty for unenforced tokens. */
    apca: string;
    /** The anchor reference and its ΔE; empty for non-anchor sources. */
    anchor: string;
}
/** Options for {@link themeFitReport}. */
export interface ThemeFitReportOptions {
    /**
     * Report a named context's surface instead of the root (ESP0175). The
     * context compiles through the exact zone path a `context` attribute
     * uses — `resolveContextTheme` — so the report cannot drift from what
     * a zone host renders. Unknown names throw, mirroring the zone host's
     * warning for an undefined context.
     */
    context?: string;
}
/**
 * Build the fit report for a resolved theme.
 *
 * Runs the real pipeline once with a trace sink attached and describes
 * what it did. An unparseable seed produces an empty token list, exactly
 * as it produces an empty property record.
 *
 * @param theme   A resolved theme (as `mergeTheme` returns).
 * @param scheme  The scheme to compute.
 * @param options Surface selection; omit for the root surface.
 */
export declare function themeFitReport(theme: EspalierTheme, scheme: "light" | "dark", options?: ThemeFitReportOptions): ThemeFitReport;
/**
 * Render a report as `console.table` rows.
 *
 * Exposed separately from {@link printThemeFitReport} so a host can put
 * the same rows somewhere other than the console.
 */
export declare function themeFitRows(report: ThemeFitReport): ThemeFitRow[];
/**
 * Print a fit report to the console — the common case.
 *
 * One summary line naming the scheme and the tokens enforcement moved,
 * then a `console.table` of every token.
 */
export declare function printThemeFitReport(report: ThemeFitReport): void;
/** One cross-token finding over a single surface's emitted values. */
export interface ThemeFitLint {
    /** Stable lint identifier. */
    id: "action-canvas-separation" | "link-hover-ordering";
    /** Lints describe design-quality hazards, not validation failures. */
    severity: "warning";
    /** The tokens the finding is about, recommended retune target first. */
    tokens: SemanticColorName[];
    /** The measured number the lint fired on (ΔE-OK, or an Lc deficit). */
    measured: number;
    /** Human-readable finding, with the remedy phrased as a retune. */
    message: string;
}
/** One scheme-level categorical-palette collision. */
export interface ThemeFitDataPaletteLint {
    /** Stable lint identifier. */
    id: "data-palette-cvd-collision";
    /** The metric is advisory, but the named theme-check lint is gated. */
    severity: "warning";
    /** The two stable palette slots whose simulated colors are too close. */
    series: readonly [DataSeriesKey, DataSeriesKey];
    /** The simulated color-vision deficiency under which they collide. */
    simulation: ColorVisionSimulation;
    /** The measured OKLab distance, rounded for stable JSON. */
    measured: number;
    /** The minimum distance the pair was checked against. */
    threshold: number;
    /** Human-readable finding with the redundant-coding remedy. */
    message: string;
}
/** Runtime validation/comparison vocabulary used by the exported field descriptors. */
export type ThemeFitFieldKind = "anchor" | "anchor-record" | "apca" | "boolean" | "data-palette-record" | "explicit" | "fit-lint-id" | "lint-array" | "message" | "number" | "palette-lint-id" | "palette-lint-record" | "report-array" | "scheme" | "semantic" | "semantic-array" | "series-pair" | "simulation" | "string" | "string-array" | "token-array" | "warning";
/** One runtime field descriptor used by fit-suite validation and comparison. */
export interface ThemeFitFieldDescriptor<Field extends PropertyKey = PropertyKey> {
    readonly field: Field;
    readonly kind: ThemeFitFieldKind;
    /** Whether drift is already reported by comparison, validation, or an identity key. */
    readonly compared: boolean;
}
/** Every stable surface-lint id, exhaustively checked against {@link ThemeFitLint}. */
export declare const THEME_FIT_LINT_IDS: readonly ThemeFitLint["id"][];
/** Every stable palette-lint id, exhaustively checked against the lint interface. */
export declare const THEME_FIT_DATA_PALETTE_LINT_IDS: readonly ThemeFitDataPaletteLint["id"][];
/** Every stable explicit-pin provenance value. */
export declare const THEME_FIT_EXPLICIT_VALUES: readonly NonNullable<ThemeFitToken["explicit"]>[];
type ThemeFitLintSeverity = ThemeFitLint["severity"] | ThemeFitDataPaletteLint["severity"];
/** Every stable fit-suite lint severity. */
export declare const THEME_FIT_LINT_SEVERITIES: readonly ThemeFitLintSeverity[];
/** Runtime schema for every token field; adding an interface field requires a descriptor. */
export declare const THEME_FIT_TOKEN_FIELDS: readonly ThemeFitFieldDescriptor<keyof ThemeFitToken>[];
/** Runtime schema for every anchor-detail field. */
export declare const THEME_FIT_ANCHOR_FIELDS: readonly ThemeFitFieldDescriptor<keyof ThemeFitAnchor>[];
/** Runtime schema for every APCA-detail field. */
export declare const THEME_FIT_APCA_FIELDS: readonly ThemeFitFieldDescriptor<keyof ThemeFitApcaAction>[];
/** Runtime schema for every surface-lint field. */
export declare const THEME_FIT_LINT_FIELDS: readonly ThemeFitFieldDescriptor<keyof ThemeFitLint>[];
/** Runtime schema for every categorical-palette lint field. */
export declare const THEME_FIT_DATA_PALETTE_LINT_FIELDS: readonly ThemeFitFieldDescriptor<keyof ThemeFitDataPaletteLint>[];
/**
 * Cross-token lints over one surface's report (ESP0175).
 *
 * Both checks consume only the report's `resolved` strings — the emitted
 * custom-property values — so the lints, like the report, cannot
 * disagree with the pipeline:
 *
 * - **action-canvas-separation** — a filled action within ΔE-OK 0.045 of
 *   the surface's own background vanishes into it. The stop placement
 *   avoids this when any viable stop exists; the lint reports the
 *   residue (explicit pins, ramps with no separated stop).
 * - **link-hover-ordering** — measured on the surfaces the states
 *   actually render: resting `link` on `background`, hovered `linkHover`
 *   on the `linkHoverBg` wash. When the theme paints a real wash, the
 *   wash itself signals the state and the ink must clear the text tier
 *   there; when the wash equals the background (no visible wash), hover
 *   must not read weaker than rest — a dimming hover feels disabled.
 */
export declare function themeFitLints(report: ThemeFitReport): ThemeFitLint[];
/**
 * The root surface's identifier in a suite. Deliberately not a valid
 * context slug (slugs are letter-first), so no theme-declared context
 * name — `root` included, which has been a legal name since contexts
 * shipped — can ever collide with it.
 */
export declare const ROOT_SURFACE = ":root";
/** One surface's report inside a {@link ThemeFitSuite}. */
export interface ThemeFitSurfaceReport extends ThemeFitReport {
    /** {@link ROOT_SURFACE}, or the context name a zone would set. */
    surface: string;
    /** Cross-token lints over this surface's emitted values. */
    lints: ThemeFitLint[];
}
/**
 * Every surface a themed site has, both schemes, in one stable shape.
 */
export interface ThemeFitSuite {
    /** Surface names in report order: {@link ROOT_SURFACE}, then contexts, sorted. */
    surfaces: string[];
    /** Fully resolved categorical slots, once per scheme rather than per context. */
    dataPalette: Record<"light" | "dark", DataPalette>;
    /** Scheme-level CVD findings over {@link dataPalette}. */
    paletteLints: Record<"light" | "dark", ThemeFitDataPaletteLint[]>;
    /** One report per surface the light theme defines. */
    light: ThemeFitSurfaceReport[];
    /** One report per surface the dark theme defines. */
    dark: ThemeFitSurfaceReport[];
}
/** Runtime schema for every surface-report field. */
export declare const THEME_FIT_REPORT_FIELDS: readonly ThemeFitFieldDescriptor<keyof ThemeFitSurfaceReport>[];
/** Runtime schema for every fit-suite field. */
export declare const THEME_FIT_SUITE_FIELDS: readonly ThemeFitFieldDescriptor<keyof ThemeFitSuite>[];
/**
 * Fit-report every surface a themed site has (ESP0175): for each scheme,
 * the root plus every declared context, each with its cross-token lints.
 *
 * Takes the partials an `esp-root` would take (they merge over the same
 * scheme defaults the root uses), so the suite describes exactly the
 * site the partials produce — the 448-line hand-rolled check script,
 * minus the client-specific lines. Surfaces are the union of both
 * schemes' context names so an asymmetric pair still reports every
 * surface it can; `validateThemePair` is the gate that rejects the
 * asymmetry itself.
 *
 * @throws When a merged scheme emits no root properties (for example, its
 * seed color is unparseable), because the required palette snapshot cannot be
 * produced. {@link themeFitReport} retains its narrower empty-report behavior.
 */
export declare function themeFitReportSuite(lightPartial: PartialTheme, darkPartial: PartialTheme): ThemeFitSuite;
export {};
