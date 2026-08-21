/**
 * @module data-colors
 *
 * Categorical palette auditing and perceptual data-ramp generation.
 *
 * The theme layer resolves brand-anchor references before calling these
 * helpers. The helpers themselves accept concrete CSS colors so they remain
 * useful without an `EspalierTheme` instance.
 */
/** Stable keys in the theme's categorical data palette. */
export declare const DATA_SERIES_KEYS: readonly ["series1", "series2", "series3", "series4", "series5", "series6", "series7", "series8"];
/** One stable slot in the categorical data palette. */
export type DataSeriesKey = (typeof DATA_SERIES_KEYS)[number];
/** Eight categorical colors, each a CSS color or theme anchor reference. */
export type DataPalette = Record<DataSeriesKey, string>;
/**
 * The shipped categorical baseline: the eight-color Okabe–Ito palette.
 *
 * These familiar hex values are kept as the authoring contract. Theme output
 * converts them to gamut-mapped OKLCH alongside consumer overrides.
 */
export declare const DEFAULT_DATA_PALETTE: Readonly<DataPalette>;
/** Full color-vision-deficiency simulations used by the palette audit. */
export declare const COLOR_VISION_SIMULATIONS: readonly ["deuteranopia", "protanopia", "tritanopia"];
/** A supported full color-vision-deficiency simulation. */
export type ColorVisionSimulation = (typeof COLOR_VISION_SIMULATIONS)[number];
/**
 * Minimum OKLab distance used for categorical-palette advice.
 *
 * This is a conservative separation heuristic, not an accessibility
 * certification. The shipped Okabe–Ito palette clears it under every
 * simulation; consumer failures are warnings because charts must also use
 * labels, shapes, or patterns rather than color alone.
 */
export declare const MIN_DATA_COLOR_DISTANCE = 0.07;
/** One pair that falls below the categorical distinguishability threshold. */
export interface DataPaletteIssue {
    /** The two series slots whose simulated colors are too close. */
    series: readonly [DataSeriesKey, DataSeriesKey];
    /** The simulated color-vision deficiency under which they collide. */
    simulation: ColorVisionSimulation;
    /** Euclidean distance between the simulated colors in OKLab. */
    distance: number;
    /** The threshold the pair was checked against. */
    threshold: number;
}
/**
 * Audit every categorical pair after full CVD simulation.
 *
 * Palette values must be concrete CSS colors. Resolve `anchor:` references
 * through the theme first. The return value is empty when every pair clears
 * the threshold.
 */
export declare function auditDataPalette(palette: Readonly<DataPalette>, threshold?: number): DataPaletteIssue[];
/** Vision conditions covered by {@link auditColorDistances}: normal plus every CVD simulation. */
export type VisionCondition = ColorVisionSimulation | "normal";
/** One too-close pair found by {@link auditColorDistances}. */
export interface ColorDistanceIssue {
    /** The two entry names, in input order. */
    pair: [string, string];
    /** The vision condition under which the pair collapses. */
    simulation: VisionCondition;
    /** Post-simulation OKLab distance between the pair. */
    distance: number;
    /** The threshold the distance fell below. */
    threshold: number;
}
/**
 * Audit an arbitrary named color set for pairwise distinguishability
 * under normal vision and every CVD simulation (ESP0172 — the intent
 * collision check). Values must be concrete CSS colors, like
 * {@link auditDataPalette}'s — resolve anchors first; the palette-shaped
 * audit remains the categorical-series wrapper.
 */
export declare function auditColorDistances(entries: ReadonlyArray<readonly [string, string]>, threshold?: number, conditions?: readonly VisionCondition[]): ColorDistanceIssue[];
/** Minimum supported number of colors in a generated data ramp. */
export declare const MIN_DATA_RAMP_STEPS = 3;
/** Maximum supported number of colors in a generated data ramp. */
export declare const MAX_DATA_RAMP_STEPS = 11;
/** Default number of colors in a generated data ramp. */
export declare const DEFAULT_DATA_RAMP_STEPS = 7;
/** Smallest lightness separation preserved by serialized ramp output. */
export declare const MIN_DATA_RAMP_LIGHTNESS_STEP = 0.000001;
/** Default neutral midpoint for diverging ramps. */
export declare const DEFAULT_DIVERGING_NEUTRAL = "oklch(0.96 0 0)";
/** Options for a sequential, single-hue data ramp. */
export interface SequentialRampOptions {
    /** Number of colors, from 3 through 11. @default 7 */
    steps?: number;
    /** Lightest output value. Must be greater than `lightnessEnd`. @default 0.95 */
    lightnessStart?: number;
    /** Darkest output value. Must be less than `lightnessStart`. @default 0.25 */
    lightnessEnd?: number;
}
/** Options for a two-ended diverging data ramp. */
export interface DivergingRampOptions {
    /** Odd number of colors, from 3 through 11. @default 7 */
    steps?: number;
    /** Concrete CSS color at the exact midpoint. @default oklch(0.96 0 0) */
    neutral?: string;
}
/** A sequential ramp declaration inside a theme. */
export interface SequentialDataRamp {
    type: "sequential";
    /** CSS color or `anchor:<name>[.<slot>]` source. */
    source: string;
    steps?: number;
    lightnessStart?: number;
    lightnessEnd?: number;
}
/** A diverging ramp declaration inside a theme. */
export interface DivergingDataRamp {
    type: "diverging";
    /** CSS color or anchor reference at the low end. */
    start: string;
    /** CSS color or anchor reference at the high end. */
    end: string;
    /** CSS color or anchor reference at the exact midpoint. */
    neutral?: string;
    steps?: number;
}
/** A named data-ramp declaration inside a theme. */
export type DataRamp = SequentialDataRamp | DivergingDataRamp;
/** Named data ramps emitted by a theme. */
export type DataRamps = Record<string, DataRamp>;
/** One ramp while partial themes are being layered. */
export type PartialDataRamp = Partial<SequentialDataRamp> | Partial<DivergingDataRamp>;
/** Named ramp refinements in a partial theme. */
export type PartialDataRamps = Record<string, PartialDataRamp>;
/**
 * Generate a single-hue, light-to-dark sequential ramp.
 *
 * Chroma is reduced only when needed to keep each stop in sRGB. Gamut mapping
 * preserves lightness, so the requested sequence remains strictly monotone.
 */
export declare function generateSequentialRamp(color: string, options?: SequentialRampOptions): string[];
/**
 * Generate a two-ended diverging ramp with an exact neutral midpoint.
 *
 * Each half interpolates in OKLab, avoiding the hue spin that polar
 * interpolation produces as chroma approaches zero.
 */
export declare function generateDivergingRamp(start: string, end: string, options?: DivergingRampOptions): string[];
