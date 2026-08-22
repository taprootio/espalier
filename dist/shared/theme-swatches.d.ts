/**
 * @module theme-swatches
 *
 * Brand book in, reviewable theme out (ESP0175).
 *
 * The lightness-ramps guide documents the fitting procedure by hand:
 * convert every swatch to OKLCH, seat each on the ramp stop whose job
 * matches its lightness (set the stop to the swatch's *exact* L so the
 * anchor lands on its swatch instead of a relative of it), interpolate
 * the unseated stops between their seated neighbors, and repeat against
 * the dark scheme's inverted expectations. This module automates those
 * mechanical steps — {@link deriveLightnessRamp} — and wraps them in
 * {@link themeFromSwatches}, which returns a paired partial-theme
 * **starter**: anchors, seated ramps, and the two role guesses that are
 * safe to make from lightness alone. Everything else — the remaining
 * roles, contexts, intents — is the design work the guide walks through,
 * and the output is meant to be hand-tuned and reviewed, not shipped
 * as-is. Verify the result the way the guide says to: a fit report per
 * scheme (a seated anchor shows a near-zero ΔE), then `validateThemePair`.
 */
import { type LightnessMap, type PartialTheme } from "./theme.js";
/**
 * Derive a full lightness ramp by seating brand swatches on the scheme's
 * default ramp — the guide's procedure, steps 1–4, automated.
 *
 * The stops that carry a token identity — `surface` (the canvas) and
 * `text` (body copy) — seat first, each taking the nearest swatch within
 * tolerance: those are the two seats where "the anchor lands on its
 * swatch" matters most, and a numerically closer neighboring stop must
 * not steal their swatch (the guide seats cream on `surface`, not on
 * the fractionally closer `raised1`). The remaining seating is greedy
 * by closeness: the (stop, swatch) pair with the smallest lightness
 * distance seats first, each stop and each swatch seat at most once, a
 * pair further than the seating tolerance never seats, and a seat that
 * would invert the ramp's ordering (relative to the stops already
 * seated) is skipped. Unseated stops interpolate between their seated
 * neighbors along the default ramp; stops outside the seated span shift
 * parallel to their nearest seated neighbor, so the ramp keeps the
 * default's shape wherever the brand is silent.
 *
 * @param swatches Brand swatches, name → CSS color (any accepted form).
 * @param scheme   Which scheme's default ramp to seat against.
 */
export declare function deriveLightnessRamp(swatches: Record<string, string>, scheme: "light" | "dark"): LightnessMap;
/** Options for {@link themeFromSwatches}. */
export interface ThemeFromSwatchesOptions {
    /** Brand swatches, name → CSS color in any accepted form. */
    swatches: Record<string, string>;
    /** Seed override; defaults to the most chromatic swatch's color. */
    seedColor?: string;
}
/** The paired starter {@link themeFromSwatches} returns. */
export interface ThemeFromSwatchesResult {
    light: PartialTheme;
    dark: PartialTheme;
}
/**
 * Turn a brand book's swatches into a paired partial-theme starter.
 *
 * What it derives, and why only this much:
 *
 * - **anchors** — every swatch, keyed by its normalized slug: names are
 *   lowercased with non-alphanumeric runs collapsed to single hyphens
 *   ("Rose Gold" → `rose-gold`); unnormalizable or colliding names
 *   throw rather than silently renaming past each other.
 * - **seedColor** — the most chromatic swatch unless overridden; the
 *   seed drives every derived family, and the brand's most saturated
 *   color is where that identity lives.
 * - **lightness** — both schemes' ramps via {@link deriveLightnessRamp}.
 * - **roles** — only the two guesses lightness alone justifies: a
 *   near-white swatch (L ≥ 0.9) becomes the light scheme's `canvas`, a
 *   near-black one (L ≤ 0.3) the dark scheme's; the most chromatic
 *   mid-band swatch (0.3 ≤ L ≤ 0.65) becomes `action` in both.
 *
 * Every other decision — ink, accent, contexts, intents — is design, not
 * derivation: make them in the theming guide's order, and verify with a
 * fit report per scheme.
 */
export declare function themeFromSwatches(options: ThemeFromSwatchesOptions): ThemeFromSwatchesResult;
