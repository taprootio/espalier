/**
 * @module font-stacks
 *
 * Recognize device (web-safe) CSS font stacks (ESP0206).
 *
 * A stored theme may carry a stack that is equivalent to one of the picker's
 * presets without being byte-identical — `system-ui, -apple-system,
 * BlinkMacSystemFont, "Segoe UI", sans-serif` is the same choice as the
 * System Sans preset. These helpers canonicalize a stack, map it to the
 * preset its leading family implies, and describe a stack that matches no
 * preset, so a picker can show the right selection without rewriting what
 * the theme stores. Pure data; no DOM or network.
 */
import { type WebSafeCategory, type WebSafeFont } from "../font-picker/font-types.js";
/**
 * Split a CSS `font-family` value into its families, unquoted, trimmed, and
 * lowercased, respecting quotes and escapes. Empty entries are dropped.
 *
 * ```ts
 * parseFontStack('system-ui, "Segoe UI", sans-serif');
 * // ["system-ui", "segoe ui", "sans-serif"]
 * ```
 */
export declare function parseFontStack(stack: string): string[];
/** The canonical, comparable form of a stack: its parsed families joined. */
export declare function canonicalFontStack(stack: string): string;
/**
 * The category a stack implies: the last generic keyword it names, else the
 * category of its leading family when that family identifies a preset, else
 * `null` for a stack this module knows nothing about.
 */
export declare function classifyFontStack(stack: string): WebSafeCategory | null;
/**
 * Whether a stack resolves to device faces: its leading family is a generic
 * keyword, a platform UI face, or a conventional web-safe face. A stack that
 * leads with a downloadable family (`Roboto, system-ui, sans-serif`) is not
 * a device stack even though it falls back to one.
 */
export declare function isDeviceFontStack(stack: string): boolean;
/**
 * The preset a stored stack is equivalent to, or `null`.
 *
 * An exact canonical match wins; otherwise the leading family decides, so
 * `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`
 * maps to System Sans and `ui-monospace, "SFMono-Regular", Consolas,
 * monospace` to System Monospace. The returned preset is the catalog entry
 * itself; callers keep the stored stack and only use the preset for display.
 */
export declare function matchWebSafeFont(stack: string, fonts?: ReadonlyArray<WebSafeFont>): WebSafeFont | null;
/**
 * Describe a device stack that matches no preset so a picker can still show
 * it as selected: the stack is both the label and the value, the category
 * follows its generic, and the weights follow its leading family. Returns
 * `null` for an empty stack.
 */
export declare function customWebSafeFont(stack: string): WebSafeFont | null;
/** Numeric weights a device font offers; see {@link WebSafeFont.weights}. */
export declare function webSafeFontWeights(font: WebSafeFont): string[];
