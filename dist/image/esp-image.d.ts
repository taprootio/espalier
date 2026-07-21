import { type PropertyValues } from "lit";
import { EspalierElementBase } from "../shared/esp-element-base.js";
import { type FocusPoint } from "./image-focus.js";
import "./esp-image-option.js";
export type ImageScrim = "auto" | "none" | "flat" | "top" | "bottom" | "left" | "right" | "radial";
export type ImageScrimStrength = "soft" | "medium" | "strong";
export type ImageTexture = "none" | "dots" | "halftone" | "paper" | "grain" | "grunge" | "scanlines" | "duotone";
export type ImageTextureScale = "fine" | "medium" | "coarse";
export type ImageBannerScheme = "auto" | "light" | "dark";
export type ImageContentPosition = "bottom-start" | "bottom" | "bottom-end" | "center" | "top-start" | "top" | "top-end";
/** Resolve a supported CSS aspect-ratio string, or null when it is invalid. */
export declare function parseImageRatio(value: string): string | null;
/**
 * A responsive image with a native `<picture>` and an optional
 * focal-point-aware banner mode.
 *
 * `esp-image` accepts two authoring shapes:
 *
 * 1. **Project a light-DOM `<picture>`** — the recommended form for published /
 *    server-rendered markup. Provide a real `<picture>` (or a bare `<img>`) as
 *    a child and `esp-image` projects it through a `<slot>`, adding only the
 *    layout box, border, and lightbox wiring. Because the image lives in the
 *    served HTML it is discoverable by the preload scanner and visible to
 *    crawlers, and it is fetched exactly once.
 * 2. **Declare [esp-image-option](/components/image/image-option) children** —
 *    the editor / fallback form. `esp-image` builds a shadow `<picture>` and
 *    `srcset` from them. Use `local-image` when an editor needs a blob preview.
 *
 * Source precedence is `local-image` → a projected `<picture>` / `<img>` →
 * `esp-image-option` children. In every mode the host reserves its layout box
 * up front from `original-width` / `original-height`, when supplied.
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
 * Once upgraded, the component measures its own width and updates `sizes` so a
 * card or gallery column does not over-fetch. The `sizes` attribute covers the
 * server-rendered initial fetch and the brief window before measurement:
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
 * Banner mode gives all three source modes the same focal position, scrim,
 * texture, and semantic overlay stack. `ratio` applies at wide widths and
 * `compact-ratio` below the component-relative compact threshold.
 *
 * ```html
 * <esp-image
 *   banner
 *   ratio="3/1"
 *   compact-ratio="3/2"
 *   focus="0.65 0.4"
 *   scrim="auto"
 *   scrim-strength="medium"
 *   content-position="bottom-start"
 * >
 *   <img src="/assets/focus-picker-unsplash.jpg" alt="A woman standing in a sunlit field with her back to the camera" />
 *   <h2 slot="overlay">Grow somewhere wonderful</h2>
 * </esp-image>
 * ```
 *
 * `banner-scheme` sets the banner's polarity and defaults to the active
 * scheme: a light page lightens the image behind dark text, a dark page
 * darkens it behind light text. Fix either polarity explicitly when a banner
 * must not follow the page scheme:
 *
 * ```html
 * <esp-image banner ratio="3/1" banner-scheme="light" focus="0.65 0.4">
 *   <img src="/assets/focus-picker-unsplash.jpg" alt="A woman standing in a sunlit field with her back to the camera" />
 *   <h2 slot="overlay">Light banner: dark ink on a lifted image</h2>
 * </esp-image>
 * <esp-image banner ratio="3/1" banner-scheme="dark" focus="0.65 0.4">
 *   <img src="/assets/focus-picker-unsplash.jpg" alt="A woman standing in a sunlit field with her back to the camera" />
 *   <h2 slot="overlay">Dark banner: light ink on a deepened image</h2>
 * </esp-image>
 * ```
 *
 * Every procedural preset supports `fine`, `medium`, and `coarse` scales.
 *
 * ### Dots
 *
 * A uniform tiled ink screen (shown at `fine`):
 *
 * ```html
 * <esp-image banner ratio="3/1" texture="dots" texture-scale="fine"><img src="/assets/canvas-bg.jpg" alt="A colorful floral pattern" /></esp-image>
 * ```
 *
 * ### Halftone
 *
 * The dot screen ramping toward the content edge (shown at `medium`):
 *
 * ```html
 * <esp-image banner ratio="3/1" texture="halftone" texture-scale="medium"><img src="/assets/canvas-bg.jpg" alt="A colorful floral pattern" /></esp-image>
 * ```
 *
 * ### Paper
 *
 * Soft fractal-noise mottle, like printed stock (shown at `coarse`):
 *
 * ```html
 * <esp-image banner ratio="3/1" texture="paper" texture-scale="coarse"><img src="/assets/canvas-bg.jpg" alt="A colorful floral pattern" /></esp-image>
 * ```
 *
 * ### Grain
 *
 * High-frequency film grain that also kills banding (shown at `fine`):
 *
 * ```html
 * <esp-image banner ratio="3/1" texture="grain" texture-scale="fine"><img src="/assets/canvas-bg.jpg" alt="A colorful floral pattern" /></esp-image>
 * ```
 *
 * ### Grunge
 *
 * Thresholded turbulence, a distressed ink wash (shown at `medium`):
 *
 * ```html
 * <esp-image banner ratio="3/1" texture="grunge" texture-scale="medium"><img src="/assets/canvas-bg.jpg" alt="A colorful floral pattern" /></esp-image>
 * ```
 *
 * ### Scanlines
 *
 * Hairline rules along the block axis (shown at `coarse`):
 *
 * ```html
 * <esp-image banner ratio="3/1" texture="scanlines" texture-scale="coarse"><img src="/assets/canvas-bg.jpg" alt="A colorful floral pattern" /></esp-image>
 * ```
 *
 * ### Duotone
 *
 * The photo mapped onto two theme-derived hues:
 *
 * ```html
 * <esp-image banner ratio="3/1" texture="duotone"><img src="/assets/canvas-bg.jpg" alt="A colorful floral pattern" /></esp-image>
 * ```
 *
 * ### Consumer texture tokens
 *
 * Any `background-image` value — a tile the application serves, a data URI,
 * or a gradient — can be wired directly through the public consumer-image
 * token path (the optional `@taprootio/espalier/textures/banner-textures.css`
 * stylesheet ships `.esp-texture-paper`/`-grain`/`-grunge` classes with the
 * tiles inlined as data URIs, so nothing needs asset configuration):
 *
 * ```html
 * <esp-image
 *   banner
 *   ratio="3/1"
 *   style="--esp-image-texture-image: repeating-linear-gradient(45deg, oklch(0.1 0 0 / 0.2) 0 2px, transparent 2px 7px); --esp-image-texture-blend-mode: multiply;"
 * >
 *   <img src="/assets/canvas-bg.jpg" alt="A colorful floral pattern" />
 * </esp-image>
 * ```
 *
 * ### Registered textures
 *
 * Wiring those tokens on every banner is verbose and not reusable. The
 * application's texture vocabulary lives on [esp-root](/components/root):
 * register the look once — `registerImageTexture(name, definition)` from
 * the module, or the root's `registerTexture` static in script-only
 * contexts — and any banner under the root selects it by name. Live
 * banners re-render on registration, so markup order and registration
 * order never race, and the root's `registeredTextures()` enumerates the
 * presets for an editor's texture picker:
 *
 * ```html
 * <esp-image id="registered-texture-banner" banner ratio="3/1" texture="pressed-paper">
 *   <img src="/assets/canvas-bg.jpg" alt="A colorful floral pattern" />
 * </esp-image>
 * <script>
 *   const banner = findById("registered-texture-banner");
 *   const root = banner.closest("esp-root");
 *   root.constructor.registerTexture("pressed-paper", {
 *     image:
 *       "repeating-linear-gradient(-45deg, oklch(1 0 0 / 0.3) 0 3px, transparent 3px 9px)",
 *     blendMode: "soft-light",
 *     opacity: 0.9,
 *   });
 * </script>
 * ```
 *
 * @slot - A projected native image, or `esp-image-option` children. When
 * projecting, `alt` lives on the consumer's `<img>`; `caption` remains the
 * lightbox text.
 * @slot overlay - Semantic banner content above the image and decorative layers.
 * @csspart frame - The stable banner/image frame.
 * @csspart image - The stable media-box wrapper in every source mode.
 * @csspart scrim - The decorative legibility layer.
 * @csspart texture - The procedural and consumer-supplied texture layers.
 * @csspart overlay - The positioned semantic overlay region.
 * @cssprop --esp-image-border - Border; defaults to `2px solid var(--esp-color-border)` or none in banner mode.
 * @cssprop --esp-image-border-radius - Corner radius; defaults to `var(--esp-size-border-radius)` or zero in banner mode.
 * @cssprop --esp-image-object-position - Final object-position override.
 * @cssprop --esp-image-compact-width - Component-width threshold; defaults to `40rem`.
 * @cssprop --esp-image-scrim-color - Scrim ink; defaults to the theme background when the banner polarity matches the scheme, else a polarity-pinned derivation.
 * @cssprop --esp-image-scrim-opacity - Scrim-strength opacity override.
 * @cssprop --esp-image-texture-color - Procedural texture ink; defaults to a theme-derived color following `banner-scheme`.
 * @cssprop --esp-image-texture-opacity - Procedural texture opacity override.
 * @cssprop --esp-image-texture-scale - CSS-gradient texture pitch override.
 * @cssprop --esp-image-texture-blend-mode - Texture blend-mode override.
 * @cssprop --esp-image-texture-image - Consumer-supplied texture background image.
 * @cssprop --esp-image-texture-image-opacity - Consumer texture opacity.
 * @cssprop --esp-image-texture-repeat - Consumer texture repeat.
 * @cssprop --esp-image-texture-position - Consumer texture position.
 * @cssprop --esp-image-texture-size - Consumer texture size.
 * @cssprop --esp-image-duotone-shadow-color - Duotone shadow stop; defaults to a dark stop derived from the theme primary.
 * @cssprop --esp-image-duotone-highlight-color - Duotone highlight stop; defaults to a light stop derived from the theme complementary.
 * @cssprop --esp-image-overlay-padding - Overlay content padding.
 * @cssprop --esp-image-overlay-color - Overlay text color; defaults to the theme heading color when the banner polarity matches the scheme.
 * @cssprop --esp-image-overlay-text-shadow - Overlay text shadow; defaults to a soft polarity-matched halo. Set to `none` to disable.
 * @docPageTitle Image
 * @docUrl /components/image
 * @menuGroup Media
 * @menuLabel Image
 * @menuIcon photo
 */
export declare class EspalierImage extends EspalierElementBase {
    /**
     * Original image height, used with `originalWidth` to reserve the intrinsic
     * aspect ratio and report portrait orientation.
     */
    originalHeight: number;
    /**
     * Original image width, used with `originalHeight` to reserve the intrinsic
     * aspect ratio and report portrait orientation.
     */
    originalWidth: number;
    /**
     * Fallback image URL used as the internal `<img src>` when responsive options
     * build a shadow `<picture>`.
     */
    imageUrl: string;
    /**
     * Local preview URL, commonly a `blob:` URL. It takes priority over projected
     * content and responsive options so an editor can show a new upload at once.
     */
    localImage: string;
    /**
     * Lightbox caption in every mode, and internal image alternative text for
     * local-image and responsive-option modes.
     */
    caption: string;
    /**
     * Initial/server-side responsive-image size hint. After upgrade the component
     * replaces this with its measured rendered width.
     */
    sizes: string;
    /**
     * Native loading strategy for internally rendered images. Projected images
     * retain the consumer's own loading attributes.
     */
    loading: "eager" | "lazy";
    /** Enable borderless banner defaults and the decorative/content layer stack. */
    banner: boolean;
    /**
     * Banner polarity. `dark` darkens the image behind light text; `light`
     * lightens it behind dark text. `auto` (the default) follows the active
     * scheme, so a light page lightens and a dark page darkens.
     */
    bannerScheme: ImageBannerScheme;
    /** Legibility-layer anchor. `auto` follows overlay presence and position. */
    scrim: ImageScrim;
    /** Preset opacity for the scrim. */
    scrimStrength: ImageScrimStrength;
    /**
     * Optional texture: a built-in procedural preset, or the name of a
     * texture registered with `registerImageTexture`. Unknown names render
     * as `none` (and recover if the name is registered later).
     */
    texture: string;
    /** CSS pitch or discrete SVG-filter variant for the selected texture. */
    textureScale: ImageTextureScale;
    /** Logical position for semantic banner content. */
    contentPosition: ImageContentPosition;
    /** Normalized focal point used for cover cropping. */
    focusPoint: FocusPoint;
    /** Banner target aspect ratio, as a positive number or `number / number`. */
    ratio: string;
    /** Aspect ratio used below the component-relative compact threshold. */
    compactRatio: string;
    get isPortrait(): boolean;
    connectedCallback(): void;
    disconnectedCallback(): void;
    protected willUpdate(changedProperties: PropertyValues): void;
    protected firstUpdated(changedProperties: PropertyValues): void;
    protected updated(changedProperties: PropertyValues): void;
    protected render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult[];
}
declare global {
    interface HTMLElementTagNameMap {
        "esp-image": EspalierImage;
    }
}
