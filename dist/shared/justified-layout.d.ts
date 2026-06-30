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
 */
export declare function calculatePhotoLayout<T extends LayoutImage>(images: T[], containerWidth: number, targetRowHeight?: number, gap?: number, maxRowHeight?: number): PhotoRow<T>[];
