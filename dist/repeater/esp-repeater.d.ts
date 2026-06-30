import "@lit-labs/virtualizer";
import { nothing, type PropertyValues, type TemplateResult } from "lit";
import { EspalierElementBase } from "../shared/esp-element-base.js";
export interface RepeaterFetchParams {
    cursor: string | null;
    limit: number;
}
export interface RepeaterFetchResult<T = unknown> {
    items: T[];
    nextCursor: string | null;
}
export type RepeaterLayout = "list" | "grid";
export type RepeaterScrollModel = "contained" | "page";
export type RepeaterRenderValue = TemplateResult | Node | string | number | boolean | typeof nothing | null | undefined;
export type RepeaterRenderItem<T = unknown> = (item: T, index: number) => RepeaterRenderValue;
/**
 * General-purpose virtualized repeater for rich repeated content such as
 * cards, image rows, or other custom-element item layouts. Consumers
 * provide the item renderer and own the visual design of each repeated item.
 *
 * Because the list is virtualized, repeated item content is supplied through
 * the `renderItem` property instead of light-DOM children. This lets the
 * repeater create item DOM on demand as the user scrolls.
 *
 * Use `layout="grid"` to opt into responsive card layouts. Consumers can
 * provide a fixed fallback with `grid-columns` and override the live column
 * count with `--esp-repeater-grid-columns` in media queries.
 *
 * Use `scroll-model="page"` when the repeater should participate in the
 * document's natural page scroll instead of owning a nested scrolling
 * viewport. In page mode, `list-height` is ignored.
 *
 * @customElement esp-repeater
 * @slot empty - Optional empty-state content shown when the repeater has no items.
 * @slot error - Optional error-state content shown when loading fails or `errorMessage` is set.
 * @slot loading - Optional loading-state footer shown while additional pages are loading.
 * @slot skeleton - Optional initial loading state shown when loading starts before any items are rendered.
 *
 * @cssprop --esp-repeater-background - Background of the repeater container.
 * @cssprop --esp-repeater-border - Border of the repeater container.
 * @cssprop --esp-repeater-border-radius - Border radius of the repeater container.
 * @cssprop --esp-repeater-gap - Space between repeated items.
 * @cssprop --esp-repeater-padding - Padding used by repeater state panels and the loading/error footer.
 * @cssprop --esp-repeater-content-padding - Padding inside the virtualized content region. Defaults to `0`.
 * @cssprop --esp-repeater-grid-columns - Grid column count when `layout="grid"`. Supports media-query overrides.
 * @cssprop --esp-repeater-grid-column-gap - Horizontal gap between grid columns.
 * @cssprop --esp-repeater-grid-row-gap - Vertical gap between grid rows.
 *
 * @docPageTitle Repeater
 * @docUrl /components/repeater
 * @menuGroup Structure
 * @menuOrder 5
 * @menuLabel Repeater
 * @docSections examples,properties,methods,slots,cssprops
 *
 * @example Basic image list
 * ```html
 * <esp-repeater
 *   id="image-list"
 *   aria-label="User images"
 *   list-height="24rem"
 * ></esp-repeater>
 * <script>
 *   const repeater = findByTagName("esp-repeater")[0];
 *   repeater.items = [
 *     {
 *       id: 1,
 *       title: "Canyon sunset",
 *       owner: "Jereme Evans",
 *       thumbnail: "https://picsum.photos/seed/canyon/280/210",
 *     },
 *     {
 *       id: 2,
 *       title: "Forest trail",
 *       owner: "Jereme Evans",
 *       thumbnail: "https://picsum.photos/seed/forest/280/210",
 *     },
 *     {
 *       id: 3,
 *       title: "Harbor morning",
 *       owner: "Jereme Evans",
 *       thumbnail: "https://picsum.photos/seed/harbor/280/210",
 *     },
 *   ];
 *
 *   repeater.renderItem = (image) => {
 *     const card = document.createElement("esp-box");
 *     card.variant = "analogous-right";
 *     card.innerHTML = `
 *       <div style="display:grid; gap:var(--esp-size-small); grid-template-columns:7rem 1fr; align-items:start;">
 *         <img src="${image.thumbnail}" alt="" style="width:7rem; aspect-ratio:4 / 3; object-fit:cover; border-radius:var(--esp-size-border-radius);" />
 *         <div>
 *           <h3 style="margin:0 0 var(--esp-size-tiny) 0;">${image.title}</h3>
 *           <p style="margin:0;">Owned by ${image.owner}</p>
 *         </div>
 *       </div>
 *     `;
 *     return card;
 *   };
 * </script>
 * ```
 *
 * @example Cursor-paged image list
 * ```html
 * <esp-repeater
 *   id="paged-images"
 *   page-size="6"
 *   list-height="26rem"
 *   aria-label="Paged image list"
 * ></esp-repeater>
 * <script>
 *   const repeater = findByTagName("esp-repeater")[0];
 *   const allImages = Array.from({ length: 24 }, (_, index) => ({
 *     id: index + 1,
 *     title: `Image ${index + 1}`,
 *     description: `Captured in collection ${Math.floor(index / 6) + 1}.`,
 *     thumbnail: `https://picsum.photos/seed/repeater-${index + 1}/320/220`,
 *   }));
 *
 *   repeater.renderItem = (image) => {
 *     const row = document.createElement("article");
 *     row.style.cssText = "display:grid; gap:var(--esp-size-small); grid-template-columns:8rem 1fr; align-items:start; padding:var(--esp-size-small); background:var(--esp-color-layer-2); border-radius:var(--esp-size-border-radius);";
 *     row.innerHTML = `
 *       <img src="${image.thumbnail}" alt="" style="width:8rem; aspect-ratio:16 / 10; object-fit:cover; border-radius:var(--esp-size-border-radius);" />
 *       <div>
 *         <h3 style="margin:0 0 var(--esp-size-tiny) 0;">${image.title}</h3>
 *         <p style="margin:0;">${image.description}</p>
 *       </div>
 *     `;
 *     return row;
 *   };
 *
 *   repeater.fetchPage = async ({ cursor, limit }) => {
 *     const start = cursor ? Number(cursor) : 0;
 *     const items = allImages.slice(start, start + limit);
 *     const nextStart = start + limit;
 *
 *     return {
 *       items,
 *       nextCursor: nextStart < allImages.length ? String(nextStart) : null,
 *     };
 *   };
 * </script>
 * ```
 *
 * @example Grid mode with responsive columns
 * ```html
 * <style>
 *   esp-repeater[layout="grid"] {
 *     --esp-repeater-grid-columns: 1;
 *     --esp-repeater-grid-column-gap: var(--esp-size-padding);
 *     --esp-repeater-grid-row-gap: var(--esp-size-padding);
 *   }
 *
 *   @media (min-width: 48rem) {
 *     esp-repeater[layout="grid"] {
 *       --esp-repeater-grid-columns: 2;
 *     }
 *   }
 *
 *   @media (min-width: 72rem) {
 *     esp-repeater[layout="grid"] {
 *       --esp-repeater-grid-columns: 3;
 *     }
 *   }
 * </style>
 *
 * <esp-repeater
 *   id="image-grid"
 *   layout="grid"
 *   grid-columns="1"
 *   aria-label="Image library"
 *   list-height="28rem"
 * ></esp-repeater>
 * <script>
 *   const repeater = findByTagName("esp-repeater")[0];
 *   repeater.items = Array.from({ length: 9 }, (_, index) => ({
 *     id: index + 1,
 *     title: `Image ${index + 1}`,
 *     thumbnail: `https://picsum.photos/seed/library-${index + 1}/320/220`,
 *   }));
 *
 *   repeater.renderItem = (image) => {
 *     const card = document.createElement("esp-box");
 *     card.variant = "analogous-right";
 *     card.innerHTML = `
 *       <article style="display:grid; gap:var(--esp-size-small);">
 *         <img src="${image.thumbnail}" alt="" style="width:100%; aspect-ratio:16 / 10; object-fit:cover; border-radius:var(--esp-size-border-radius);" />
 *         <div style="display:grid; gap:var(--esp-size-tiny);">
 *           <h3 style="margin:0;">${image.title}</h3>
 *           <p style="margin:0;">Responsive grid item rendered through \`layout="grid"\`.</p>
 *         </div>
 *       </article>
 *     `;
 *     return card;
 *   };
 * </script>
 * ```
 *
 * @example Full-page gallery with page scroll
 * ```html
 * <style>
 *   .gallery-page {
 *     display: grid;
 *     gap: clamp(1rem, 2vw, 1.5rem);
 *     max-width: 72rem;
 *     margin: 0 auto;
 *     padding: clamp(1rem, 3vw, 2rem);
 *   }
 *
 *   esp-repeater[scroll-model="page"][layout="grid"] {
 *     --esp-repeater-grid-columns: 1;
 *     --esp-repeater-grid-column-gap: var(--esp-size-padding);
 *     --esp-repeater-grid-row-gap: calc(var(--esp-size-padding) * 1.5);
 *   }
 *
 *   @media (min-width: 48rem) {
 *     esp-repeater[scroll-model="page"][layout="grid"] {
 *       --esp-repeater-grid-columns: 2;
 *     }
 *   }
 *
 *   @media (min-width: 72rem) {
 *     esp-repeater[scroll-model="page"][layout="grid"] {
 *       --esp-repeater-grid-columns: 3;
 *     }
 *   }
 * </style>
 *
 * <main class="gallery-page">
 *   <header>
 *     <h1>Image library</h1>
 *     <p>Use <code>scroll-model="page"</code> when the repeater should feel like part of the page instead of a nested panel.</p>
 *   </header>
 *
 *   <esp-repeater
 *     id="page-gallery"
 *     layout="grid"
 *     scroll-model="page"
 *     grid-columns="1"
 *     page-size="9"
 *     aria-label="Full-page image gallery"
 *   ></esp-repeater>
 * </main>
 *
 * <script>
 *   const repeater = findByTagName("esp-repeater")[0];
 *   const allImages = Array.from({ length: 30 }, (_, index) => ({
 *     id: index + 1,
 *     title: `Image ${index + 1}`,
 *     thumbnail: `https://picsum.photos/seed/page-gallery-${index + 1}/420/280`,
 *   }));
 *
 *   repeater.renderItem = (image) => {
 *     const card = document.createElement("esp-box");
 *     card.variant = "analogous-right";
 *     card.innerHTML = `
 *       <article style="display:grid; gap:var(--esp-size-small);">
 *         <img src="${image.thumbnail}" alt="" style="width:100%; aspect-ratio:3 / 2; object-fit:cover; border-radius:var(--esp-size-border-radius);" />
 *         <div style="display:grid; gap:var(--esp-size-tiny);">
 *           <h3 style="margin:0;">${image.title}</h3>
 *           <p style="margin:0;">This gallery scrolls with the page while the repeater still virtualizes rows.</p>
 *         </div>
 *       </article>
 *     `;
 *     return card;
 *   };
 *
 *   repeater.fetchPage = async ({ cursor, limit }) => {
 *     const start = cursor ? Number(cursor) : 0;
 *     const items = allImages.slice(start, start + limit);
 *     const nextStart = start + limit;
 *
 *     return {
 *       items,
 *       nextCursor: nextStart < allImages.length ? String(nextStart) : null,
 *     };
 *   };
 * </script>
 * ```
 */
export declare class EspalierRepeater extends EspalierElementBase {
    /**
     * Items to render when the repeater is used without cursor paging.
     * If `fetchPage` is set, the repeater manages its own loaded item
     * collection internally.
     *
     * @type {unknown[]}
     */
    items: unknown[];
    /**
     * Callback used to render each repeated item. This is the recommended
     * API for rich custom-element content because the repeater virtualizes
     * items and instantiates them on demand.
     */
    renderItem: RepeaterRenderItem<unknown> | null;
    /**
     * Visual layout mode for the rendered content.
     *
     * Use `grid` to opt into responsive card-style rows while
     * preserving virtualization and paging behavior.
     *
     * @type {"list" | "grid"}
     */
    layout: RepeaterLayout;
    /**
     * Scroll behavior model for the repeater viewport.
     *
     * Use `contained` for the current nested scrolling behavior driven by
     * `list-height`. Use `page` when the repeater should scroll with the
     * document/page instead.
     *
     * @type {"contained" | "page"}
     */
    scrollModel: RepeaterScrollModel;
    /**
     * Fixed grid column count fallback used when `layout="grid"`
     * and no `--esp-repeater-grid-columns` custom property override
     * is applied.
     *
     * @type {number}
     */
    gridColumns: number;
    /**
     * Accessible label forwarded to the internal virtualized list.
     */
    ariaLabel: string | null;
    /**
     * The height of the repeater viewport. Accepts any valid CSS height
     * value. Defaults to `60vh`. Ignored when `scroll-model="page"`.
     *
     * @type {string}
     */
    listHeight: string;
    /**
     * Number of items requested per page when `fetchPage` is used.
     *
     * @type {number}
     */
    pageSize: number;
    /**
     * Number of items from the end of the currently loaded set at which the
     * repeater should prefetch the next page.
     *
     * @type {number}
     */
    prefetchThreshold: number;
    /**
     * External loading flag for non-paged usage or for cases where the
     * consumer wants to force a loading state.
     *
     * @type {boolean}
     */
    loading: boolean;
    /**
     * Default loading message used when no custom `loading` or `skeleton`
     * slot content is provided.
     *
     * @type {string}
     */
    loadingMessage: string;
    /**
     * Default empty-state message used when no custom `empty` slot content
     * is provided.
     *
     * @type {string}
     */
    emptyMessage: string;
    /**
     * Optional consumer-provided error message. When set it takes priority
     * over internal fetch errors for display purposes.
     *
     * @type {string}
     */
    errorMessage: string;
    /**
     * Provide a callback to enable cursor-based infinite paging. When set,
     * the repeater fetches additional items as the user scrolls near the end
     * of the currently loaded range.
     */
    get fetchPage(): ((params: RepeaterFetchParams) => Promise<RepeaterFetchResult>) | null;
    set fetchPage(value: ((params: RepeaterFetchParams) => Promise<RepeaterFetchResult>) | null);
    connectedCallback(): void;
    protected firstUpdated(changedProperties: PropertyValues): void;
    disconnectedCallback(): void;
    protected willUpdate(changedProperties: PropertyValues): void;
    protected updated(changedProperties: PropertyValues): void;
    /**
     * Clear the currently rendered items. In cursor-paged mode this also
     * clears the cursor and any pending load error.
     */
    clear(): void;
    /**
     * Clear any loaded pages and request the first page again when
     * cursor paging is enabled.
     */
    reload(): Promise<void>;
    /**
     * Delegate scrolling to the underlying virtualizer.
     */
    scrollToIndex(index: number, position?: "start" | "center" | "end" | "nearest"): Promise<void>;
    protected render(): TemplateResult<1>;
    static styles: import("lit").CSSResult[];
}
declare global {
    interface HTMLElementTagNameMap {
        "esp-repeater": EspalierRepeater;
    }
}
