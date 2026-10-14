/**
 * Justified photo layout — the algorithm popularized by Google Photos.
 *
 * Groups images into rows and scales each row to exactly fill the container
 * width while preserving aspect ratios and keeping row heights as close to
 * the target as possible. Pure and framework-free so the same layout can be
 * shared between `<esp-image-upload>` previews and consumer-rendered
 * galleries.
 */
/** Minimal shape required to lay out an item: its intrinsic dimensions. */
export interface LayoutImage {
    width: number;
    height: number;
}
/** One image's explicit cell geometry in an album row. */
export interface AlbumLayoutItem<T extends LayoutImage = LayoutImage> {
    /** The source image, retained by reference. */
    image: T;
    /** The rendered cell width in CSS pixels. */
    width: number;
}
/**
 * A row in a bounded album layout.
 *
 * `fillsContainer` is true for completed rows, including rows whose cells
 * widen proportionally at a height ceiling and therefore crop their images.
 * `isPartial` identifies the final, under-filled max-count row, which keeps
 * its image proportions and intentionally leaves its trailing space empty.
 */
export interface AlbumLayoutRow<T extends LayoutImage = LayoutImage> {
    items: AlbumLayoutItem<T>[];
    height: number;
    isPartial: boolean;
    fillsContainer: boolean;
}
/** Options for {@link calculateAlbumLayout}. */
export interface AlbumLayoutOptions {
    /** Available row width in CSS pixels, before gaps. */
    containerWidth: number;
    /** Preferred row height used while grouping images. Defaults to 220. */
    targetRowHeight?: number;
    /** Horizontal gap between cells. Defaults to 8. */
    gap?: number;
    /** Maximum rendered row height in CSS pixels. Defaults to no ceiling. */
    maxRowHeight?: number;
    /** Positive-integer image count that makes a completed row. */
    maxImagesPerRow?: number;
}
/** The default viewport-height ceiling used by bounded album consumers. */
export declare const DEFAULT_ALBUM_MAX_ROW_HEIGHT_VH = 90;
/**
 * Normalize the public album viewport-height ceiling.
 *
 * The value is deliberately a percentage rather than an arbitrary pixel
 * count, so a consumer can apply the same policy across responsive layouts.
 */
export declare function normalizeAlbumMaxRowHeightVh(value: unknown): number;
/**
 * Resolve a consumer-provided image-row ceiling to a usable positive integer.
 * Values outside `1…maximum`, including non-numbers and non-finite values,
 * return `fallback`. The default fallback and maximum leave row lengths
 * unlimited.
 *
 * @param value Consumer-provided row ceiling to validate
 * @param fallback Value returned when `value` is invalid
 * @param maximum Largest accepted row ceiling
 */
export declare function normalizeMaxImagesPerRow(value: unknown, fallback?: number, maximum?: number): number;
/**
 * Compute justified album rows and the geometry a renderer needs for cropping.
 *
 * Completed rows fill the available width. A row capped by `maxRowHeight` keeps
 * relative cell widths, allowing `object-fit: cover` to crop its images. A final
 * row below a finite `maxImagesPerRow` remains partial and preserves proportions;
 * its height is capped by the preceding rows or target height and `maxRowHeight`.
 *
 * An omitted or invalid `maxImagesPerRow` means unlimited, completed rows.
 */
export declare function calculateAlbumLayout<T extends LayoutImage>(images: T[], options: AlbumLayoutOptions): AlbumLayoutRow<T>[];
