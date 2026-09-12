/**
 * The font picker's data vocabulary: catalog entries, device (web-safe)
 * stacks, and the union the picker reports. Kept free of DOM and network
 * code so `shared/font-helpers` and `shared/font-stacks` can consume it
 * without importing the component.
 */
export type GoogleFont = {
    family: string;
    variants: string[];
    subsets: string[];
    version: string;
    lastModified: string;
    files?: Record<string, string>;
    category: FontCategory;
    kind: string;
};
export type FontCategory = "serif" | "sans-serif" | "display" | "handwriting" | "monospace" | "not-display";
/**
 * `google` lists the generated catalog; `web-safe` lists only device stacks;
 * `all` (ESP0206) lists the device stacks above the catalog.
 */
export type FontSource = "google" | "web-safe" | "all";
export type WebSafeCategory = Extract<FontCategory, "serif" | "sans-serif" | "monospace">;
/**
 * A CSS font stack that resolves to faces already on the reader's device,
 * so choosing it downloads nothing.
 */
export type WebSafeFont = {
    family: string;
    stack: string;
    category: WebSafeCategory;
    kind: "web-safe";
    /**
     * Numeric weights the stack's device faces are expected to carry. Devices
     * snap to the nearest weight they have and may synthesize bold, so this is
     * a reasonable offer rather than a guarantee. Absent means 400 and 700.
     */
    weights?: string[];
};
export type FontPickerFont = GoogleFont | WebSafeFont;
export type FontPickerValueChangedDetail = FontPickerFont | undefined;
/** Weights the platform UI faces (SF, Segoe UI Variable, Roboto) reliably carry. */
export declare const SYSTEM_TEXT_WEIGHTS: ReadonlyArray<string>;
/** Weights a device monospace or classic web-safe face reliably carries. */
export declare const DEVICE_DEFAULT_WEIGHTS: ReadonlyArray<string>;
/** The device stacks in their long-standing `web-safe` order; the combined source lists the System entries first. */
export declare const WEB_SAFE_FONTS: Array<WebSafeFont>;
/** Whether a preset is one of the platform System entries the combined source leads with. */
export declare const isSystemPreset: (font: WebSafeFont) => boolean;
