import { nothing, type PropertyValues } from "lit";
import { EspalierElementBase } from "../shared/esp-element-base.js";
import "../image/esp-image.js";
import "../image/esp-image-option.js";
import "../button/esp-button.js";
/**
 * A full-screen lightbox for viewing high-res versions of
 * [esp-image](/components/image) elements. Point the `for` attribute
 * at a CSS selector for the container that holds the images. Clicking
 * any image in that container opens the lightbox at that image.
 *
 * On mobile, swipe left or right to navigate. The gallery wraps
 * around — swiping past the last image goes back to the first.
 *
 * A subtle caret at the bottom of the screen reveals a drawer
 * overlay containing the image caption and a `comments` slot.
 *
 * ```html
 * <div class="gallery">
 *   <esp-image caption="A mountain lake" original-width="1200" original-height="800" low-res="https://picsum.photos/id/29/300/200">
 *     <esp-image-option width="400" url="https://picsum.photos/id/29/600/400"></esp-image-option>
 *     <esp-image-option width="800" url="https://picsum.photos/id/29/900/600"></esp-image-option>
 *     <esp-image-option width="1024" url="https://picsum.photos/id/29/1200/800"></esp-image-option>
 *   </esp-image>
 *   <esp-image caption="A forest path" original-width="1200" original-height="800" low-res="https://picsum.photos/id/15/300/200">
 *     <esp-image-option width="400" url="https://picsum.photos/id/15/600/400"></esp-image-option>
 *     <esp-image-option width="800" url="https://picsum.photos/id/15/900/600"></esp-image-option>
 *     <esp-image-option width="1024" url="https://picsum.photos/id/15/1200/800"></esp-image-option>
 *   </esp-image>
 *   <esp-image caption="Ocean waves" original-width="1200" original-height="800" low-res="https://picsum.photos/id/65/300/200">
 *     <esp-image-option width="400" url="https://picsum.photos/id/65/600/400"></esp-image-option>
 *     <esp-image-option width="800" url="https://picsum.photos/id/65/900/600"></esp-image-option>
 *     <esp-image-option width="1024" url="https://picsum.photos/id/65/1200/800"></esp-image-option>
 *   </esp-image>
 * </div>
 * <esp-lightbox for=".gallery"></esp-lightbox>
 * ```
 *
 * @event {CustomEvent<{ index: number }>} esp-lightbox-changed -
 * Fired when the displayed image changes — on open, navigation
 * (prev/next buttons, keyboard arrows, swipe, dot click).
 * The `index` in the detail is the zero-based position of the
 * now-visible image in the source container.
 *
 * @slot comments - A slot for comments UX, rendered inside a collapsible drawer.
 * @cssprop --esp-lightbox-bg - The background color of the lightbox overlay (falls through to --esp-vellum-background, then --esp-color-layer-3).
 * @cssprop --esp-lightbox-bg-opacity - The opacity of the overlay background (falls through to --esp-vellum-opacity, default: 0.85).
 * @cssprop --esp-vellum-background-image - Optional repeating background image for the overlay (default: none).
 * @cssprop --esp-vellum-background-image-opacity - Opacity of the background image layer (default: 0.3).
 * @docPageTitle Lightbox
 * @docUrl /components/lightbox
 * @menuGroup Media
 * @menuLabel Lightbox
 * @menuIcon photo
 */
export declare class EspalierLightbox extends EspalierElementBase {
    /**
     * A CSS selector for the container element that holds the
     * `esp-image` elements to include in the lightbox.
     * @type {string}
     */
    for: string;
    /**
     * The number of comments to display in the comment bar.
     * @type {number}
     */
    commentCount: number;
    /** Open the lightbox at the given image index. */
    open(index: number): void;
    /** Close the lightbox. */
    close(): void;
    connectedCallback(): void;
    protected updated(changed: PropertyValues): void;
    disconnectedCallback(): void;
    protected render(): import("lit-html").TemplateResult<1> | typeof nothing;
    static styles: import("lit").CSSResult[];
}
declare global {
    interface HTMLElementTagNameMap {
        "esp-lightbox": EspalierLightbox;
    }
}
