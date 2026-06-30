import { type EspalierUploadImage, type ExistingImage } from "./image-helpers.js";
import { EspalierElementBase } from "../shared/esp-element-base.js";
/**
 * Used to upload images.
 *
 * ```html
 * <esp-image-upload></esp-image-upload>
 * ```
 *
 * **Uploading new images**
 *
 * The `file-selected` event detail provides the `image`
 * reference (the actual object in `uploadedImages`) plus
 * `onProgress`, `onComplete`, and `onFailed` callbacks
 * bound to it, and a `signal` that aborts if the user removes
 * the image while it is still uploading. The same shape is
 * used for `upload-retry`.
 *
 * ```html
 * <script>
 *   // Stubs — replace with your real upload/delete logic.
 *   function uploadToServer(file, opts) {
 *     let pct = 0;
 *     const id = setInterval(() => {
 *       pct = Math.min(pct + 20, 100);
 *       if (opts.onProgress) opts.onProgress(pct);
 *       if (pct >= 100) { clearInterval(id); }
 *     }, 200);
 *     return new Promise((r) => setTimeout(() => r("id-" + file.name), 1200));
 *   }
 *   function deleteFromServer(id) { console.log("delete", id); }
 *
 *   const uploader = findByTagName("esp-image-upload")[0];
 *   uploader.addEventListener("file-selected", (e) => {
 *     const { image, signal, onProgress, onComplete, onFailed } = e.detail;
 *     // Pass `signal` to fetch/XHR so removing the image cancels the upload.
 *     uploadToServer(image.file, {
 *       signal,
 *       onProgress: (pct) => onProgress(pct),
 *     }).then((id) => onComplete(id))
 *       .catch(() => onFailed());
 *   });
 *   uploader.addEventListener("upload-retry", (e) => {
 *     const { image, signal, onProgress, onComplete } = e.detail;
 *     uploadToServer(image.file, {
 *       signal,
 *       onProgress: (pct) => onProgress(pct),
 *     }).then((id) => onComplete(id));
 *   });
 *   uploader.addEventListener("file-removed", (e) => {
 *     deleteFromServer(e.detail.uploadedId);
 *   });
 * </script>
 * <esp-image-upload></esp-image-upload>
 * ```
 *
 * **Simulated upload progress demo**
 *
 * Select images to see simulated progress. The second file
 * will fail — click Retry to re-upload it.
 *
 * ```html
 * <script>
 *   const uploader = findByTagName("esp-image-upload")[0];
 *   let fileIndex = 0;
 *
 *   function simulateUpload(detail, shouldFail) {
 *     let progress = 0;
 *     const interval = setInterval(() => {
 *       progress += Math.floor(Math.random() * 11) + 5;
 *       if (shouldFail && progress >= 45) {
 *         clearInterval(interval);
 *         detail.onFailed();
 *         return;
 *       }
 *       if (progress >= 100) {
 *         clearInterval(interval);
 *         detail.onProgress(100);
 *         setTimeout(() => detail.onComplete("id-" + detail.image.file.name), 500);
 *         return;
 *       }
 *       detail.onProgress(progress);
 *     }, 300 + Math.random() * 300);
 *   }
 *
 *   uploader.addEventListener("file-selected", (e) => {
 *     const idx = fileIndex++;
 *     simulateUpload(e.detail, idx === 1);
 *   });
 *
 *   uploader.addEventListener("upload-retry", (e) => {
 *     simulateUpload(e.detail, false);
 *   });
 * </script>
 * <esp-image-upload></esp-image-upload>
 * ```
 *
 * **Editing with existing images**
 *
 * Pre-populate with server images via `setExistingImages`.
 * Existing images never show upload overlays.
 *
 * ```html
 * <script>
 *   const uploader = findByTagName("esp-image-upload")[0];
 *   uploader.setExistingImages([
 *     { url: "https://picsum.photos/id/29/1200/800", width: 1200, height: 800, uploadedId: "img-1" },
 *     { url: "https://picsum.photos/id/15/900/1200", width: 900,  height: 1200, uploadedId: "img-2" },
 *   ]);
 *   uploader.addEventListener("file-removed", (e) => {
 *     if (e.detail.source === "existing") {
 *       console.log("Mark for deletion:", e.detail.uploadedId);
 *     }
 *   });
 * </script>
 * <esp-image-upload></esp-image-upload>
 * ```
 *
 * @event {CustomEvent<EspalierUploadImage>} file-removed - Fired when
 * an image has been removed by the user. Narrow on `detail.source` to
 * distinguish newly selected images from pre-existing server images.
 * If the image's upload was still in flight, its `signal` aborts.
 *
 * @event {CustomEvent<UploadEventDetail>} file-selected - Fired when
 * an image has been selected by the user. `detail.image` is the actual
 * object stored in `uploadedImages`; `detail.onProgress`, `detail.onComplete`,
 * and `detail.onFailed` are callbacks bound to that image. `detail.signal`
 * aborts if the image is removed mid-upload — pass it to fetch/XHR.
 *
 * @event {CustomEvent<UploadEventDetail>} upload-retry - Fired when
 * the user clicks Retry on a failed upload. `detail.image` is the same
 * object reference; fresh callbacks and a fresh `signal` are provided.
 * The component automatically resets the image to indeterminate progress.
 *
 * @event {CustomEvent<ImagesReorderedDetail>} images-reordered - Fired
 * after the user drags an image to a new position. `detail.images` is the
 * reordered array (same references, new order).
 *
 * @event {CustomEvent<FilesRejectedDetail>} files-rejected - Fired when
 * selected files are skipped, either because their type is not accepted
 * (`detail.unsupported`) or because they could not be read or decoded
 * (`detail.unreadable`). The component also shows a transient inline notice.
 *
 * @cssprop --esp-image-upload-preview-background - The background color of the image preview area.
 * @docPageTitle Image Upload
 * @docUrl /components/image-upload
 * @menuGroup Form Controls
 * @menuLabel Image Upload
 * @menuIcon photo-up
 */
export declare class EspalierImageUpload extends EspalierElementBase {
    uploadedImages: Array<EspalierUploadImage>;
    /**
     * Comma-separated list of accepted file types, in the same format as the
     * native input `accept` attribute: MIME types (`image/png`), MIME
     * wildcards (`image/*`), or extensions (`.png`). Files outside this list
     * are skipped and reported via the `files-rejected` event.
     */
    accept: string;
    connectedCallback(): void;
    disconnectedCallback(): void;
    /**
     * Populate the component with images that already exist on the server.
     * Each entry must provide a display URL, dimensions for layout, and
     * an `uploadedId` that identifies the server-side image.
     *
     * Entries with missing `url`/`uploadedId` or non-finite/non-positive
     * dimensions are silently filtered out.
     */
    setExistingImages: (images: ExistingImage[]) => void;
    protected render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult[];
}
declare global {
    interface HTMLElementTagNameMap {
        "esp-image-upload": EspalierImageUpload;
    }
}
