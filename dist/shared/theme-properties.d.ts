/**
 * Public entry point for Espalier's theme → CSS custom property computation.
 *
 * `esp-root` hydrates a page by writing the result of this computation onto its
 * host. A generator or server that renders the same page's shell — Taproot
 * computes a published site's first-paint background this way — needs the same
 * answer before any element upgrades, and must get it without importing a
 * component module or a private package path.
 *
 * This module declares its own signature rather than re-exporting the internal
 * implementation, so the published type graph stays limited to `EspalierTheme`
 * from the already-public `./shared/theme` while the runtime still calls the
 * one implementation — a generator and `esp-root` cannot compute different
 * colors. The build-gate rationale for that shape is recorded in the
 * repository's public-type-surface record, which is not published.
 *
 * The module is side-effect free: importing it registers no custom element and
 * touches no DOM.
 */
import type { EspalierTheme } from "./theme.js";
/** The two color schemes a theme resolves for. */
export type ThemeScheme = "light" | "dark";
/**
 * Compute every CSS custom property for a resolved theme and scheme.
 *
 * The result is a flat record keyed by property name including the leading
 * `--`, exactly as `esp-root` writes it: scheme indicator, seed, variant and
 * data colors, the lightness ramp, APCA-enforced semantic colors, data
 * companions, the type and space scales, font families and weights, and the
 * optional background-image and vellum properties a theme declares.
 *
 * Pass a **resolved** theme — one merged over `DEFAULT_LIGHT_THEME` or
 * `DEFAULT_DARK_THEME` with `mergeTheme` from `./shared/theme`. An unparseable
 * `seedColor` yields an empty record rather than throwing, and an unresolvable
 * color source falls back to the seed with a `console.warn`, so a bad theme
 * renders branded rather than broken; use `validateTheme(encodeTheme(partial))`
 * from `./shared/theme` to surface those before rendering.
 *
 * @param theme A resolved theme.
 * @param scheme The scheme to compute, matching the theme it came from.
 */
export declare function computeThemeProperties(theme: EspalierTheme, scheme: ThemeScheme): Record<string, string>;
