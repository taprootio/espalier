import { type EspalierUploadImage, type ExistingImage, type ImagePreviewAction } from "./image-helpers.js";
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
 * The `esp-image-upload-file-selected` event detail provides the `image`
 * reference (the actual object in `uploadedImages`) plus
 * `onProgress`, `onComplete`, and `onFailed` callbacks
 * bound to it, and a `signal` that aborts if the user removes
 * the image while it is still uploading. The same shape is
 * used for `esp-image-upload-retry`.
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
 *   uploader.addEventListener("esp-image-upload-file-selected", (e) => {
 *     const { image, signal, onProgress, onComplete, onFailed } = e.detail;
 *     // Pass `signal` to fetch/XHR so removing the image cancels the upload.
 *     uploadToServer(image.file, {
 *       signal,
 *       onProgress: (pct) => onProgress(pct),
 *     }).then((id) => onComplete(id))
 *       .catch(() => onFailed());
 *   });
 *   uploader.addEventListener("esp-image-upload-retry", (e) => {
 *     const { image, signal, onProgress, onComplete } = e.detail;
 *     uploadToServer(image.file, {
 *       signal,
 *       onProgress: (pct) => onProgress(pct),
 *     }).then((id) => onComplete(id));
 *   });
 *   uploader.addEventListener("esp-image-upload-file-removed", (e) => {
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
 *   uploader.addEventListener("esp-image-upload-file-selected", (e) => {
 *     const idx = fileIndex++;
 *     simulateUpload(e.detail, idx === 1);
 *   });
 *
 *   uploader.addEventListener("esp-image-upload-retry", (e) => {
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
 *   uploader.addEventListener("esp-image-upload-file-removed", (e) => {
 *     if (e.detail.source === "existing") {
 *       console.log("Mark for deletion:", e.detail.uploadedId);
 *     }
 *   });
 * </script>
 * <esp-image-upload></esp-image-upload>
 * ```
 *
 * **Keyboard and touch**
 *
 * Tab reaches each preview's remove button, then its action if `previewAction` is
 * set, and finally Add photos. Enter or Space removes that image and moves focus to
 * Add photos, scrolling it into view if a long album has pushed it off screen.
 *
 * With a mouse, the remove button appears when the pointer is over a preview or
 * focus is inside it. A device without hover (`(hover: none)`) always shows it,
 * because a tap on a hidden button would remove the image with no warning. A
 * touchscreen laptop whose primary pointer has hover keeps the mouse behaviour, so a
 * tap on a photo's empty corner there can still remove it.
 *
 * Each control's accessible name says which image it acts on. A selected image uses
 * its file name, as in `Remove holiday.jpg`. An existing image uses its position, as
 * in `Remove image 3 of 12`, which follows removal and reordering.
 *
 * **Adding an action to each preview**
 *
 * Set `previewAction` to show a labelled icon button in the lower-right of each
 * completed preview, for example to open your own dialog about one image. There
 * is no button by default.
 *
 * - `label` is the tooltip and the start of the accessible name, which continues
 *   with the image's file name or position, as in `Edit details: image 3 of 12`.
 * - `icon` is an icon name from the sprite configured on `esp-root`.
 *
 * Existing images offer the button straight away, and selected images once
 * `onComplete` has run. It is hidden while an image uploads, after `onFailed`,
 * after Retry until the next `onComplete`, and while the preview shows that its
 * image failed to load. Activating it never removes the image, opens the file
 * picker or starts a drag.
 *
 * `detail.image` on `esp-image-upload-preview-action` is the object in
 * `uploadedImages` itself, and it stays the same object through reorder and
 * upload completion. An album can hold the same image twice, so keep anything
 * specific to one use against this object, not against `uploadedId` or an index.
 * If your dialog applies a change later, first check that
 * `uploadedImages.includes(image)` is still true.
 *
 * ```html
 * <script>
 *   const uploader = findByTagName("esp-image-upload")[0];
 *   uploader.previewAction = { label: "Edit details", icon: "edit" };
 *   uploader.setExistingImages([
 *     { url: "https://picsum.photos/id/29/1200/800", width: 1200, height: 800, uploadedId: "img-1" },
 *     { url: "https://picsum.photos/id/15/900/1200", width: 900,  height: 1200, uploadedId: "img-2" },
 *   ]);
 *   uploader.addEventListener("esp-image-upload-file-selected", (e) => {
 *     // Stub — replace with your real upload. The button appears on completion.
 *     setTimeout(() => e.detail.onComplete("id-" + e.detail.image.file.name), 1500);
 *   });
 *   uploader.addEventListener("esp-image-upload-preview-action", (e) => {
 *     const { image } = e.detail;
 *     const name = image.source === "selected" ? image.file.name : image.uploadedId;
 *     showToast({ message: "Edit details for " + name, icon: "info-i", duration: 3 });
 *   });
 * </script>
 * <esp-image-upload></esp-image-upload>
 * ```
 *
 * @event {CustomEvent<EspalierUploadImage>} esp-image-upload-file-removed - Fired when
 * an image has been removed by the user. Narrow on `detail.source` to
 * distinguish newly selected images from pre-existing server images.
 * If the image's upload was still in flight, its `signal` aborts.
 *
 * @event {CustomEvent<UploadEventDetail>} esp-image-upload-file-selected - Fired when
 * an image has been selected by the user. `detail.image` is the actual
 * object stored in `uploadedImages`; `detail.onProgress`, `detail.onComplete`,
 * and `detail.onFailed` are callbacks bound to that image. `detail.signal`
 * aborts if the image is removed mid-upload — pass it to fetch/XHR.
 *
 * @event {CustomEvent<UploadEventDetail>} esp-image-upload-retry - Fired when
 * the user clicks Retry on a failed upload. `detail.image` is the same
 * object reference; fresh callbacks and a fresh `signal` are provided.
 * The component automatically resets the image to indeterminate progress.
 *
 * @event {CustomEvent<ImagesReorderedDetail>} esp-image-upload-images-reordered - Fired
 * after the user drags an image to a new position. `detail.images` is the
 * reordered array (same references, new order).
 *
 * @event {CustomEvent<FilesRejectedDetail>} esp-image-upload-files-rejected - Fired when
 * selected files are skipped, either because their type is not accepted
 * (`detail.unsupported`) or because they could not be read or decoded
 * (`detail.unreadable`). The component also shows a transient inline notice.
 *
 * @event {CustomEvent<ImagePreviewActionDetail>} esp-image-upload-preview-action - Fired
 * once each time the user activates the `previewAction` button on a completed
 * preview, whether by pointer, touch or keyboard. `detail.image` is the object in
 * `uploadedImages` itself, so it identifies one use of an image even when an album
 * holds the same `uploadedId` twice, and it stays the same object through reorder
 * and upload completion.
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
     * are skipped and reported via the `esp-image-upload-files-rejected` event.
     */
    accept: string;
    /**
     * Maximum number of image previews in each justified row. Positive integers
     * create a hard row boundary; omitted, non-finite, non-integer, and
     * nonpositive values leave rows unlimited.
     *
     * @type {number}
     */
    maxImagesPerRow?: number;
    /**
     * Maximum preview-row height as a percentage of the layout viewport. Values
     * outside the inclusive integer range `1…100` fall back to 90.
     *
     * @type {number}
     */
    maxRowHeightVh: number;
    /**
     * An optional action button in the lower-right of each completed preview,
     * reported through `esp-image-upload-preview-action`. Clear it, or leave it
     * unset, for no button. A blank `label` or an invalid `icon` name also shows
     * none. Assign a new object to change it, since the component does not watch
     * the object's fields.
     *
     * @type {ImagePreviewAction}
     */
    previewAction?: ImagePreviewAction | null;
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
