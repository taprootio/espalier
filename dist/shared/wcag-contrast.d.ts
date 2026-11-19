/** Minimum WCAG AA contrast for text. */
export declare const AA_TEXT_RATIO = 4.5;
/** Minimum WCAG AA contrast for large text. */
export declare const AA_LARGE_RATIO = 3;
/** Minimum WCAG AA contrast for graphics and indicators. */
export declare const AA_NON_TEXT_RATIO = 3;
interface WcagColor {
    r: number;
    g: number;
    b: number;
}
/** Return the unrounded contrast of two opaque gamma-encoded sRGB colors (channels 0–1). */
export declare function wcagRatio(foreground: WcagColor, background: WcagColor): number;
export {};
