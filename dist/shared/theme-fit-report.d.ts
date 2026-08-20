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
import { type EspalierTheme, type LightnessKey, type MappingSource, type SemanticColorName } from "./theme.js";
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
     * the mapping's ramp stop, so a swatch used as a source is re-lit by
     * design (ADR-015).
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
    /** The lightness ramp stop the mapping selected. */
    lightness: LightnessKey;
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
/**
 * Build the fit report for a resolved theme.
 *
 * Runs the real pipeline once with a trace sink attached and describes
 * what it did. An unparseable seed produces an empty token list, exactly
 * as it produces an empty property record.
 *
 * @param theme  A resolved theme (as `mergeTheme` returns).
 * @param scheme The scheme to compute.
 */
export declare function themeFitReport(theme: EspalierTheme, scheme: "light" | "dark"): ThemeFitReport;
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
