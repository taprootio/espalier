import { type PropertyValues } from "lit";
import { EspalierElementBase } from "../shared/esp-element-base.js";
import "./esp-image-option.js";
/**
 * A responsive image with a native `<picture>`.
 *
 * `esp-image` accepts two authoring shapes:
 *
 * 1. **Project a light-DOM `<picture>`** — the recommended form for published /
 *    server-rendered markup. Provide a real `<picture>` (or a bare `<img>`) as
 *    a child and `esp-image` projects it through a `<slot>`, adding only the
 *    layout box, border, and lightbox wiring. Because the image lives in the
 *    served HTML it is discoverable by the preload scanner and visible to
 *    crawlers, and it is fetched exactly once (the component renders no
 *    competing internal image).
 * 2. **Declare [esp-image-option](/components/image/image-option) children** —
 *    the editor / fallback form. `esp-image` builds a shadow `<picture>` and
 *    `srcset` from them. Useful for editor previews before a native `<picture>`
 *    has been generated.
 *
 * Source precedence, most specific first: `local-image` → a slotted
 * `<picture>` / `<img>` → `esp-image-option` children. In every mode the host
 * reserves the layout box up front via `aspect-ratio` (from `original-width` /
 * `original-height`), so there is no layout shift while the image loads.
 *
 * @slot - A light-DOM `<picture>` or `<img>` to project, or
 * [esp-image-option](/components/image/image-option) children describing each
 * available size. When projecting, `alt` lives on your `<img>`; the component's
 * `caption` still drives the [esp-lightbox](/components/lightbox) drawer (the
 * two may differ).
 *
 * ```html
 * <!-- Projected native <picture> — published markup, crawlable + preloadable -->
 * <esp-image original-width="1200" original-height="800" caption="A scenic mountain lake">
 *   <picture>
 *     <source
 *       srcset="https://picsum.photos/600/400 400w, https://picsum.photos/900/600 800w, https://picsum.photos/1200/800 1200w"
 *       sizes="100vw"
 *     />
 *     <img src="https://picsum.photos/1200/800" alt="A scenic mountain lake" />
 *   </picture>
 * </esp-image>
 * ```
 *
 * ```html
 * <!-- esp-image-option children — editor / fallback form -->
 * <esp-image
 *   original-width="1200"
 *   original-height="800"
 *   low-res="https://picsum.photos/300/200"
 *   caption="A scenic mountain lake"
 *   sizes="100vw"
 * >
 *   <esp-image-option width="400" url="https://picsum.photos/600/400"></esp-image-option>
 *   <esp-image-option width="800" url="https://picsum.photos/900/600"></esp-image-option>
 *   <esp-image-option width="1200" url="https://picsum.photos/1200/800"></esp-image-option>
 * </esp-image>
 * ```
 *
 * The component picks the responsive variant for its **own rendered box**: after
 * it upgrades it measures its width (via a `ResizeObserver`) and sets `sizes` to
 * that, so a small card or gallery column does not over-fetch — no hand-authored
 * `sizes` required. The `sizes` attribute is only a fallback: it covers the brief
 * window before the first measurement and the server-rendered *initial* fetch
 * (the browser's preload scanner runs before the component upgrades). Set it to
 * the layout's server-side estimate when that initial fetch matters:
 *
 * ```html
 * <esp-image
 *   original-width="1200"
 *   original-height="800"
 *   low-res="https://picsum.photos/300/200"
 *   sizes="(max-width: 600px) 100vw, 320px"
 *   style="max-width: 320px;"
 * >
 *   <esp-image-option width="320" url="https://picsum.photos/640/427"></esp-image-option>
 *   <esp-image-option width="640" url="https://picsum.photos/960/640"></esp-image-option>
 * </esp-image>
 * ```
 *
 * @cssprop --esp-image-border - Set the border property of the image.
 *
 * ```html
 * <style>
 * esp-image.with-custom-border {
 *   --esp-image-border: 5px dashed orange;
 * }
 * </style>
 * <esp-image class="with-custom-border" original-width="1200" original-height="800" low-res="https://picsum.photos/300/200" sizes="100vw">
 *   <esp-image-option width="400" url="https://picsum.photos/600/400"></esp-image-option>
 *   <esp-image-option width="900" url="https://picsum.photos/900/600"></esp-image-option>
 *   <esp-image-option width="1200" url="https://picsum.photos/1200/800"></esp-image-option>
 * </esp-image>
 * ```
 *
 * @docPageTitle Image
 * @docUrl /components/image
 * @menuGroup Media
 * @menuLabel Image
 * @menuIcon photo
 */
export declare class EspalierImage extends EspalierElementBase {
    /**
     * The original height of the image; used to calculate the orientation of
     * the image and set the element aspect ratio.
     * @type {number}
     */
    originalHeight: number;
    /**
     * The original width of the image; used to calculate the orientation of
     * the image and set the element aspect ratio.
     * @type {number}
     */
    originalWidth: number;
    /**
     * The fallback image URL. Used as the `<img src>` — the variant the browser
     * loads when it cannot evaluate the responsive `srcset` (very old browsers),
     * and the SEO/no-JS source. Named `low-res` because a small, fast-loading
     * variant is the sensible default to point it at.
     * @type {string}
     */
    imageUrl: string;
    /**
     * A local image URL (e.g. a `blob:` URL) that takes priority over responsive
     * selection. When set, a plain `<img>` with no responsive sources is rendered
     * so the local preview always wins. Used during upload to show the user's
     * local file immediately while CDN variants are generated in the background.
     * @type {string}
     */
    localImage: string;
    /**
     * A caption for the image. Drives the visible caption in the
     * [esp-lightbox](/components/lightbox) drawer in every mode. In the
     * fallback / `local-image` paths it is also applied as the internal
     * `<img alt>`; when projecting a light-DOM `<picture>` / `<img>`, put `alt` on
     * your own `<img>` (it may legitimately differ from the drawer caption).
     * @type {string}
     */
    caption: string;
    /**
     * Fallback `sizes` hint used only until the element measures its own rendered
     * width (and for the server-rendered *initial* fetch, which the browser
     * performs before this component upgrades). Once measured, the element
     * advertises its actual box width instead — in both the built-from-options
     * and projection paths — so the browser picks the smallest variant that
     * covers the box (× DPR), in any layout, with no hand-authored `sizes`. Set
     * this when you need a specific server-side hint (e.g. the generator's
     * per-layout value); otherwise leave it and the component sizes itself.
     * @type {string}
     */
    sizes: string;
    /**
     * The native `loading` strategy for the **internally rendered** `<img>` (the
     * fallback and `local-image` paths). Use `lazy` to defer offscreen gallery
     * images until they approach the viewport. Defaults to `eager`. Has no effect
     * in projection mode, where the projected `<img>` carries its own `loading`,
     * `decoding`, and `fetchpriority` directly.
     * @type {"eager" | "lazy"}
     */
    loading: "eager" | "lazy";
    get isPortrait(): boolean;
    connectedCallback(): void;
    disconnectedCallback(): void;
    protected willUpdate(changedProperties: PropertyValues): void;
    protected updated(changed: PropertyValues): void;
    protected render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult[];
}
declare global {
    interface HTMLElementTagNameMap {
        "esp-image": EspalierImage;
    }
}
