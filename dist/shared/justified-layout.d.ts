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
/** A single laid-out row: the items it contains and the row height in px. */
export interface PhotoRow<T extends LayoutImage = LayoutImage> {
    images: T[];
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
 * Compute justified layout rows for a list of images.
 *
 * Algorithm:
 * 1. Add images to a row one at a time, scaled to the target row height
 * 2. When the combined width overflows the container, the row breaks either
 *    before or after the overflowing image — whichever leaves the row height
 *    closer to the target. Keeping the image shrinks the row slightly below
 *    target; pushing it to the next row stretches the row above target.
 * 3. Scale the finished row so it fills the container width exactly.
 *
 * Every row — including the last — is scaled to fill `containerWidth`
 * exactly, except rows clamped by `maxRowHeight`: those keep their aspect
 * ratios at the clamped height and no longer span the full width. Items are
 * returned by reference in their original order.
 *
 * @param images Items with intrinsic `width`/`height` (extra fields preserved)
 * @param containerWidth Available width in px that each row must fill
 * @param targetRowHeight Preferred row height in px before scaling
 * @param gap Horizontal gap in px between images within a row
 * @param maxRowHeight Ceiling for row heights — keeps a stretched final row
 * (or a single image) from ballooning past e.g. half the viewport height
 * @param maxImagesPerRow Optional positive-integer ceiling for the number of
 * images in each row. Omit it, or pass an invalid value, for an unlimited row
 * length.
 */
export declare function calculatePhotoLayout<T extends LayoutImage>(images: T[], containerWidth: number, targetRowHeight?: number, gap?: number, maxRowHeight?: number, maxImagesPerRow?: number): PhotoRow<T>[];
/**
 * Compute bounded album geometry with explicit cell widths.
 *
 * This is the opt-in counterpart to {@link calculatePhotoLayout}. Completed
 * rows always span the available width. When their justified height exceeds
 * `maxRowHeight`, their cells retain their relative widths while expanding to
 * the row width at the ceiling; a renderer can use `object-fit: cover` to crop
 * the resulting cells. A final row below a finite `maxImagesPerRow` instead
 * remains partial and preserves its image proportions. Its height is capped by
 * the tallest preceding row (or the target height when it is the only row) and
 * by `maxRowHeight`.
 *
 * With an omitted or invalid `maxImagesPerRow`, every row remains completed.
 * That preserves the legacy unlimited-row distribution for callers that have
 * not opted into bounded albums.
 */
export declare function calculateAlbumLayout<T extends LayoutImage>(images: T[], options: AlbumLayoutOptions): AlbumLayoutRow<T>[];
