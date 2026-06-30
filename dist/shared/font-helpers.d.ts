/**
 * @module font-helpers
 *
 * Pure utility functions for working with Google Font metadata.
 *
 * These helpers extract, normalize, and compare font weights, parse
 * CSS `font-family` strings, and map Google Font categories to
 * generic CSS fallbacks.  They are consumed by both the UX client
 * (site-settings, profile-editor) and the server-side renderer.
 *
 * None of these functions touch the DOM or network — they operate
 * entirely on data.
 */
import type { GoogleFont } from "../font-picker/esp-font-picker.js";
/**
 * Human-readable labels for the nine standard CSS `font-weight`
 * values (100–900).
 *
 * Useful for building weight-picker UIs where the numeric value
 * alone isn't descriptive enough.
 */
export declare const WEIGHT_LABELS: Readonly<Record<string, string>>;
/**
 * Extract available non-italic weights from a {@link GoogleFont},
 * sorted numerically.
 *
 * Google Fonts encodes weights as variant strings: `"regular"` maps
 * to `"400"`, italic variants (e.g. `"300italic"`) are excluded,
 * and every other variant string is its numeric weight.
 *
 * @param font A Google Font entry, or `null`.
 * @returns Sorted weight strings.  Defaults to `["400"]` when the
 *   font is `null` or has no non-italic variants.
 */
export declare function extractWeights(font: GoogleFont | null): string[];
/**
 * Normalize a CSS `font-weight` keyword to its numeric equivalent.
 *
 * - `"bold"` → `"700"`
 * - `"normal"` → `"400"`
 * - Falsy / `undefined` → `defaultWeight`
 * - Everything else passes through unchanged.
 *
 * @param weight The weight to normalize.
 * @param defaultWeight Fallback when `weight` is falsy.
 */
export declare function normalizeWeight(weight: string | undefined, defaultWeight: string): string;
/**
 * Find the closest available weight to a desired one.
 *
 * If the desired weight appears in `available`, it is returned
 * directly.  Otherwise the weight with the smallest absolute
 * numeric distance is returned.  If `available` is empty, returns
 * `"400"` as a safe default.
 *
 * @param desired The target weight (numeric string).
 * @param available Sorted weight strings from {@link extractWeights}.
 *   Typically non-empty — {@link extractWeights} always returns at
 *   least `["400"]`.
 * @returns The best matching weight from `available`, or `"400"`
 *   if `available` is empty.
 */
export declare function bestAvailableWeight(desired: string, available: string[]): string;
/**
 * Extract the first family name from a CSS `font-family` string,
 * stripping both single and double quotes and whitespace.
 *
 * @example
 * ```ts
 * extractFamily('"Noto Sans", sans-serif'); // "Noto Sans"
 * extractFamily("'Roboto', sans-serif");    // "Roboto"
 * extractFamily("monospace");               // "monospace"
 * ```
 */
export declare function extractFamily(cssFamily: string): string;
/**
 * Return the generic CSS fallback for a Google Font category.
 *
 * - `"serif"` → `"serif"`
 * - `"monospace"` → `"monospace"`
 * - `"handwriting"` → `"cursive"`
 * - Everything else (including `"sans-serif"`, `"display"`) →
 *   `"sans-serif"`
 */
export declare function getFallbackFont(category: string): string;
