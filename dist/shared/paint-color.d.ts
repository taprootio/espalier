import type { PaintKind } from "./paint-types.js";
/** Gamma-encoded sRGB and alpha, with all channels in 0–1. */
export interface PaintColor {
    r: number;
    g: number;
    b: number;
    alpha: number;
}
/** Parse absolute CSS paint, retaining its declared alpha. */
export declare function parsePaintColor(value: string): PaintColor | null;
/** Change the lightness channel of a relative OKLCH color. */
export declare function derivePaintLightness(value: string | undefined, lightness: (original: number) => number): PaintColor | null;
/** Composite foreground over background using CSS source-over alpha. */
export declare function compositePaint(foreground: PaintColor, background: PaintColor): PaintColor;
export declare const MIN_SHADOW_INDICATOR_BLUR = 3;
export declare const MAX_SHADOW_INDICATOR_BLUR = 4;
export declare const SHADOW_INDICATOR_SAMPLE_OFFSET = 0.1;
export declare const SHADOW_INDICATOR_MARGIN_SIGMAS = 4;
export declare function supportsShadowIndicatorBlur(blur: number): boolean;
/** Lower coverage estimate at the supported straight edge. Hard bands use full alpha. */
export declare function shadowIndicatorAlpha(shadow: {
    alpha: number;
    blur: number;
}): number;
export declare function paintRequiredRatio(kind: PaintKind): 3 | 4.5;
