import { EspalierElementBase } from "../shared/esp-element-base.js";
import "../button/esp-button.js";
/**
 * Used to upload files.
 *
 * ```html
 * <esp-file-upload choose-text="Upload Document"></esp-file-upload>
 * <script>
 *   const theFileUpload = findByTagName("esp-file-upload")[0];
 *   theFileUpload.addEventListener("files-selected", () => {
 *     showToast({
 *       message: `You selected a file!`,
 *       icon: "info-i",
 *       duration: 2,
 *       onClosed: () => {
 *         theFileUpload.finishedProcessingFiles();
 *       },
 *     });
 *   });
 * </script>
 * ```
 *
 * @docPageTitle File Upload
 * @docUrl /components/file-upload
 * @menuGroup Form Controls
 * @menuLabel File Upload
 * @menuIcon upload
 * @customElement esp-file-upload
 */
export declare class EspalierFileUpload extends EspalierElementBase {
    /**
     * The accepted file types. For example, to allow JPEG, PNG, and WebP images:
     *
     * `image/jpeg, image/png, image/webp`
     */
    accept: string;
    /**
     * The text to display on the button.
     */
    chooseText: string;
    /**
     * Allow multiple files to be selected.
     */
    multiple: boolean;
    /**
     * The `files-selected` event sets the file upload to a processing state.
     * Call this method when you have finished processing the selected files
     * to reset the file upload.
     */
    finishedProcessingFiles(): void;
    protected render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "esp-file-upload": EspalierFileUpload;
    }
}
