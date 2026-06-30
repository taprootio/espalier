/** Shared layout and identity properties for all upload images. */
interface UploadImageBase {
    orientation: "portrait" | "landscape";
    uploadedId: string;
    url: string;
    height: number;
    width: number;
}
/** A newly selected image from the file picker or drag-and-drop. */
export type SelectedUploadImage = UploadImageBase & {
    source: "selected";
    file: File;
};
/** One responsive variant: the CDN url and the pixel width it represents. */
export interface ResponsiveImageUrl {
    minWidth: number;
    url: string;
}
/** A pre-existing image loaded from the server via `setExistingImages()`. */
export type ExistingUploadImage = UploadImageBase & {
    source: "existing";
    /**
     * Responsive variants for the preview. When present, the component picks the
     * smallest variant that covers each preview's rendered box; `url` is the
     * fallback when this is absent.
     */
    urls?: ResponsiveImageUrl[];
};
/**
 * Union of all image variants stored in `uploadedImages`.
 * Narrow on `source` to access variant-specific fields.
 */
export type EspalierUploadImage = SelectedUploadImage | ExistingUploadImage;
/** Callbacks attached to `file-selected` and `upload-retry` event details. */
export interface UploadCallbacks {
    /** Update the progress overlay (0–100 determinate, `null` for indeterminate). */
    onProgress: (value: number | null) => void;
    /** Mark upload as complete with the server-assigned ID. Clears the overlay. */
    onComplete: (uploadedId: string) => void;
    /** Mark upload as failed. Shows an error overlay with a retry button. */
    onFailed: () => void;
}
/** Detail type for `file-selected` and `upload-retry` events. */
export interface UploadEventDetail extends UploadCallbacks {
    /** The actual image object stored in `uploadedImages`. */
    image: SelectedUploadImage;
    /**
     * Aborts when the user removes the image while its upload is still in
     * flight. Pass it to `fetch` / `XMLHttpRequest` so removed images stop
     * consuming bandwidth. Always present on events dispatched by
     * `esp-image-upload`; optional in the type only so pre-1.169 consumers
     * keep compiling.
     */
    signal?: AbortSignal;
}
/**
 * Describes an image that already exists on the server and should be
 * shown inside `<esp-image-upload>` when editing.
 */
export type ExistingImage = {
    url: string;
    /**
     * Optional responsive variants (`{ minWidth, url }`). When provided, previews
     * load the smallest variant that covers their rendered box instead of `url`.
     */
    urls?: ResponsiveImageUrl[];
    height: number;
    width: number;
    uploadedId: string;
};
/** Options for {@link getImageDetails}. */
export interface ImageDetailsOptions {
    /**
     * Maximum height in device pixels for the generated preview thumbnail.
     * Source images taller than this are downscaled for display; the original
     * `File` is never modified.
     */
    thumbnailHeight?: number;
}
/**
 * Measure a selected file and produce a `SelectedUploadImage` whose `url`
 * is a lightweight object URL suitable for previews (downscaled for large
 * raster images). Rejects when the file cannot be read or decoded.
 *
 * The returned `url` is an object URL owned by the caller — release it
 * with {@link releasePreviewUrl} when the image is discarded.
 */
export declare function getImageDetails(file: File, options?: ImageDetailsOptions): Promise<SelectedUploadImage>;
/**
 * Release the object URL backing a selected image's preview. Safe to call
 * on existing images — server URLs are never revoked.
 */
export declare function releasePreviewUrl(image: EspalierUploadImage): void;
export {};
