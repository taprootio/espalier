import { LitElement } from "lit";
/**
 * A single responsive source for [esp-image](/components/image). Each option
 * contributes one `srcset` candidate (`url` + a `width` descriptor); the parent
 * `esp-image` reads its options and builds a native `<picture>` so the browser
 * can pick the best variant for the viewport and device pixel ratio.
 *
 * This is the **editor / fallback** authoring form. Published markup should
 * project a real light-DOM `<picture>` through `esp-image` instead (it is
 * crawlable and preload-discoverable); `esp-image-option` is the convenient
 * shape for editor previews and stored content before a `<picture>` exists.
 *
 * ```html
 * <esp-image original-width="1200" original-height="800" low-res="https://picsum.photos/300/200" sizes="100vw">
 *   <esp-image-option width="400" url="https://picsum.photos/600/400"></esp-image-option>
 *   <esp-image-option width="800" url="https://picsum.photos/900/600"></esp-image-option>
 *   <esp-image-option width="1200" url="https://picsum.photos/1200/800"></esp-image-option>
 * </esp-image>
 * ```
 *
 * Set the optional `type` attribute to enable format negotiation. Give every
 * option for a format the same `type` (e.g. `image/avif`), list the most
 * preferred format first, and the browser will use the first format it
 * supports — falling back to the `low-res` `<img>` on the parent.
 *
 * @docPageTitle Image Option
 * @docUrl /components/image/image-option
 * @menuGroup Media
 */
export declare class EspalierImageOption extends LitElement {
    /**
     * The intrinsic pixel width of this version of the image. Emitted as the
     * `srcset` width descriptor (e.g. `width="800"` → `… 800w`), which lets the
     * browser account for both viewport width and device pixel ratio.
     * @type {number}
     */
    width: number;
    /**
     * The URL to retrieve this version of the image from.
     * @type {string}
     */
    imageUrl: string;
    /**
     * An optional MIME type for format negotiation (e.g. `image/avif`,
     * `image/webp`). When set, `esp-image` emits a dedicated
     * `<source type="…">` per format. Leave empty for plain resolution
     * switching. Do not mix typed and untyped options on the same `esp-image`.
     * @type {string}
     */
    type: string;
    static styles: import("lit").CSSResult;
}
declare global {
    interface HTMLElementTagNameMap {
        "esp-image-option": EspalierImageOption;
    }
}
