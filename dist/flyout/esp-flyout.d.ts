import { type PropertyValues } from "lit";
import { EspalierElementBase } from "../shared/esp-element-base.js";
import type { FlyoutCloseReason } from "../shared/flyout-events.js";
/**
 * A transient panel for help, more-info, and preview content that
 * claims designed spare width before ever covering the page.
 *
 * Place one `esp-flyout` in an `esp-page`'s `flyout` slot. The panel
 * lives on the canvas, outside the content surface. The page decides
 * where it goes, from widest viewport to narrowest:
 *
 * 1. **Gutter** — the panel occupies the right canvas gutter. When the
 *    gutter already has room, it claims existing spare canvas and the
 *    main content does not move at all, on any alignment.
 * 2. **Shift** — when the gutter is not quite wide enough, the surface
 *    slides toward `start` by exactly the shortfall (no more) to free
 *    the difference.
 * 3. **Docked sidebar** — once the gutter is gone, the panel competes
 *    for width with the main well; content narrows but is never
 *    covered.
 * 4. **Overlay drawer** — below the mobile threshold (`50em`, the
 *    same one the `esp-menu` drawer uses) the panel becomes a fixed
 *    drawer over a vellum backdrop. Set `mode="overlay"` to get this
 *    presentation at every width.
 *
 * The panel is styled as a tear-off piece: a dotted perforation on
 * its leading edge, rounded trailing corners, and no shadow — all
 * overridable through the `--esp-flyout-*` tokens below.
 *
 * A11y follows the presentation. In the in-grid modes (1–3) the
 * flyout is a non-modal `complementary` landmark named by its
 * `heading`, and opening it never steals focus. In the overlay-drawer
 * mode (4) it is a true modal: `role="dialog"` + `aria-modal`, the
 * background goes inert, scroll is locked, focus moves into the drawer
 * and is trapped, and focus is restored on close. `Escape` closes it
 * in every mode.
 *
 * ```html
 * <style>
 * esp-page.flyout-demo {
 *   --esp-page-max-width: 420px;
 *   --esp-page-canvas-background: var(--esp-color-layer-1);
 *   &::part(wrapper) {
 *     min-height: 320px;
 *     height: 320px;
 *   }
 *   > div {
 *     padding: var(--esp-size-padding);
 *   }
 * }
 * </style>
 * <esp-page class="flyout-demo" align="center">
 *   <esp-flyout slot="flyout" heading="More info" id="demo-flyout" standalone>
 *     <p>Spare width claimed; the well shifted only enough to make room.</p>
 *   </esp-flyout>
 *   <div>
 *     <esp-button id="toggle-flyout" label="Toggle flyout" collapsed></esp-button>
 *   </div>
 * </esp-page>
 * <script>
 *   const flyout = findById("demo-flyout");
 *   findById("toggle-flyout").addEventListener("clicked", () => flyout.toggle());
 * </script>
 * ```
 *
 * By default the panel is a tear-off — a dotted perforation on its
 * leading edge, rounded trailing corners, no shadow. Add
 * `match-surface` to lift the trailing edge with the page's surface
 * edge shadow, so the flyout reads as a raised peer of the content it
 * flies out from while staying attached at the leading perforation:
 *
 * ```html
 * <style>
 * esp-page.flyout-match-demo {
 *   --esp-page-max-width: 420px;
 *   &::part(wrapper) {
 *     min-height: 320px;
 *     height: 320px;
 *   }
 *   > div {
 *     padding: var(--esp-size-padding);
 *   }
 * }
 * </style>
 * <esp-page class="flyout-match-demo" align="center">
 *   <esp-flyout slot="flyout" heading="More info" id="match-flyout" match-surface standalone>
 *     <p>Attached at the perforation, trailing edge raised like the surface.</p>
 *   </esp-flyout>
 *   <div>
 *     <esp-button id="toggle-match" label="Toggle flyout" collapsed></esp-button>
 *   </div>
 * </esp-page>
 * <script>
 *   const matchFlyout = findById("match-flyout");
 *   findById("toggle-match").addEventListener("clicked", () => matchFlyout.toggle());
 * </script>
 * ```
 *
 * When the page has no spare width to claim — a `kind="full"` page,
 * or a capped page on a viewport at the cap — the open flyout docks
 * as a right sidebar and the content makes room:
 *
 * ```html
 * <style>
 * esp-page.flyout-docked-demo {
 *   &::part(wrapper) {
 *     min-height: 320px;
 *     height: 320px;
 *   }
 *   > div {
 *     padding: var(--esp-size-padding);
 *   }
 * }
 * </style>
 * <esp-page class="flyout-docked-demo" kind="full">
 *   <esp-flyout slot="flyout" heading="Docked" id="docked-flyout" standalone>
 *     <p>No gutter to claim, so the content narrows instead.</p>
 *   </esp-flyout>
 *   <div>
 *     <p>A <code>kind="full"</code> page has no canvas gutters at any
 *     width — the flyout squeezes the main well and never covers it.</p>
 *     <esp-button id="toggle-docked" label="Toggle flyout" collapsed></esp-button>
 *   </div>
 * </esp-page>
 * <script>
 *   const dockedFlyout = findById("docked-flyout");
 *   findById("toggle-docked").addEventListener("clicked", () => dockedFlyout.toggle());
 * </script>
 * ```
 *
 * Below the `50em` viewport threshold every flyout becomes a fixed
 * overlay drawer over a vellum — there is no room for a side-by-side
 * split on a phone. `mode="overlay"` forces that presentation at any
 * width (try it here; `Escape` or the vellum closes it):
 *
 * ```html
 * <style>
 * esp-page.flyout-overlay-demo {
 *   &::part(wrapper) {
 *     min-height: 160px;
 *     height: 160px;
 *   }
 *   > div {
 *     padding: var(--esp-size-padding);
 *   }
 * }
 * </style>
 * <esp-page class="flyout-overlay-demo">
 *   <esp-flyout slot="flyout" heading="Overlay drawer" mode="overlay" id="overlay-flyout" standalone>
 *     <p>A fixed drawer over a vellum — what every flyout becomes on
 *     small viewports.</p>
 *   </esp-flyout>
 *   <div>
 *     <esp-button id="open-overlay" label="Open overlay flyout" collapsed></esp-button>
 *   </div>
 * </esp-page>
 * <script>
 *   const overlayFlyout = findById("overlay-flyout");
 *   findById("open-overlay").addEventListener("clicked", () => overlayFlyout.toggle());
 * </script>
 * ```
 *
 * Components that cannot know where the flyout lives can request it
 * over the bus with `showFlyout()` — the same pattern `showToast()`
 * uses. A second request swaps the content in place; it never
 * stacks. Content passed as a string renders as plain text; pass a
 * `Node` for rich content. Pass the triggering element as `anchor` to
 * align the in-grid panel with that control and keep both in the same
 * scroll flow. If the panel would cross the visible viewport's bottom,
 * it shifts up only far enough to fit and returns to its natural trigger
 * alignment as the page scrolls. Content taller than the viewport
 * scrolls inside the panel. Overlay drawers stay viewport-fixed.
 *
 * The bus is a global broadcast, so every listening flyout on the
 * page answers a `showFlyout()` call. The demos above are each driven
 * by their own toggle button, so they are marked `standalone` to opt
 * out of the bus — leaving this one flyout as the page's shared
 * surface. In a real app you typically have a single flyout and need
 * no attribute at all.
 *
 * ```html
 * <style>
 * esp-page.flyout-bus-demo {
 *   --esp-page-max-width: 420px;
 *   &::part(wrapper) {
 *     min-height: 320px;
 *   }
 *   > div {
 *     padding: var(--esp-size-padding);
 *   }
 *   .flyout-demo-copy {
 *     max-inline-size: 42ch;
 *   }
 * }
 * </style>
 * <esp-page class="flyout-bus-demo">
 *   <esp-flyout slot="flyout"></esp-flyout>
 *   <div>
 *     <esp-button id="show-apples" label="Apples" collapsed></esp-button>
 *     <div class="flyout-demo-copy">
 *       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
 *       tempor incididunt ut labore et dolore magna aliqua.</p>
 *       <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
 *       ut aliquip ex ea commodo consequat.</p>
 *       <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
 *       dolore eu fugiat nulla pariatur.</p>
 *     </div>
 *     <esp-button id="show-pears" label="Pears" collapsed></esp-button>
 *     <template id="pears-description">
 *       <p>Ripen pears at room temperature until the neck yields gently to
 *       pressure, then refrigerate them to slow further ripening.</p>
 *       <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
 *       nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>
 *       <p>Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis
 *       sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper
 *       porta.</p>
 *       <p>Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent
 *       taciti sociosqu ad litora torquent per conubia nostra.</p>
 *       <p>Curabitur sodales ligula in libero. Sed dignissim lacinia nunc.
 *       Curabitur tortor. Pellentesque nibh. Aenean quam.</p>
 *       <p>In scelerisque sem at dolor. Maecenas mattis. Sed convallis
 *       tristique sem. Proin ut ligula vel nunc egestas porttitor.</p>
 *       <p>Morbi lectus risus, iaculis vel, suscipit quis, luctus non,
 *       massa. Fusce ac turpis quis ligula lacinia aliquet.</p>
 *       <p>Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed,
 *       euismod in, nibh. Quisque volutpat condimentum velit.</p>
 *     </template>
 *     <div class="flyout-demo-copy">
 *       <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
 *       deserunt mollit anim id est laborum.</p>
 *       <p>Curabitur pretium tincidunt lacus. Nulla gravida orci a odio, nullam
 *       varius, turpis et commodo pharetra.</p>
 *     </div>
 *   </div>
 * </esp-page>
 * <script>
 *   const applesButton = findById("show-apples");
 *   applesButton.addEventListener("clicked", () => {
 *     showFlyout({ heading: "Apples", content: "Crisp. Store cold.", anchor: applesButton });
 *   });
 *   const pearsButton = findById("show-pears");
 *   const pearsDescription = findById("pears-description");
 *   pearsButton.addEventListener("clicked", () => {
 *     showFlyout({
 *       heading: "Pears",
 *       content: pearsDescription.content.cloneNode(true),
 *       anchor: pearsButton,
 *     });
 *   });
 * </script>
 * ```
 *
 * @slot - The flyout's content.
 *
 * @event {CustomEvent<{}>} flyout-opened - Fired by `show()` when the
 * flyout opens.
 * @event {CustomEvent<{reason: FlyoutCloseReason}>} flyout-closed -
 * Fired by `close()` when the flyout closes. `reason` is `"escape"`,
 * `"vellum"`, `"button"`, or `"programmatic"`.
 * @event {CustomEvent<{}>} flyout-state-changed - Fired on every
 * `open`, `mode`, or `anchor` change, including direct property
 * assignment (not just `show()`/`close()`). `esp-page` uses it to keep
 * its layout in sync; most consumers want
 * `flyout-opened`/`flyout-closed` instead.
 *
 * @csspart panel - The panel surface.
 * @csspart header - The heading/close-button row.
 * @csspart content - The scrollable content region wrapping the slot.
 *
 * @cssprop --esp-flyout-background - The background color of the
 * panel. Defaults to `var(--esp-color-background)`.
 * @cssprop --esp-flyout-border - The border on the panel's leading
 * edge. Defaults to the tear-off perforation,
 * `1px dotted var(--esp-color-border)`.
 * @cssprop --esp-flyout-radius - The radius of the panel's trailing
 * corners. Defaults to `var(--esp-size-border-radius)`; the overlay
 * drawer squares them.
 * @cssprop --esp-flyout-shadow - The panel's shadow. Defaults to
 * `none` in the gutter/docked modes (the perforation does the
 * separating) and to a drawer shadow in overlay mode.
 * @cssprop --esp-flyout-padding - Padding inside the panel's header
 * and content regions. Defaults to `var(--esp-size-padding)`.
 * @cssprop --esp-flyout-z-index - Stack order of the overlay-drawer
 * mode. Defaults to `3000` — above page chrome, below the dialog
 * drop zone (4000). Set it on the `esp-page` (or an ancestor), not on
 * the flyout itself: the page reads the same token to hoist the
 * drawer's aside above its header.
 *
 * @docPageTitle Flyout
 * @docUrl /components/flyout
 * @menuGroup Structure
 * @menuOrder 3
 * @menuLabel Flyout
 * @menuIcon layout
 *
 */
export declare class EspalierFlyout extends EspalierElementBase {
    /**
     * Whether the flyout is open. Reflected so the initial state can
     * be declared in markup; `esp-page` mirrors it (via the lifecycle
     * events and the slot) onto its own `flyout-open` attribute to
     * drive the grid.
     */
    open: boolean;
    /**
     * Heading text for the panel's header row. Also becomes the
     * flyout's accessible name unless the author set an `aria-label`.
     * An open overlay without either uses the fallback name "Flyout" so
     * its dialog is never exposed without an accessible name.
     */
    heading: string;
    /**
     * Placement behavior.
     *
     * - `"auto"` (default) — the page's placement ladder: gutter,
     *   docked sidebar, then overlay drawer below the `50em` viewport
     *   threshold.
     * - `"overlay"` — always the fixed overlay drawer, at any width.
     *   The page never reserves a grid track for an overlay-mode
     *   flyout.
     */
    mode: "auto" | "overlay";
    /**
     * Triggering element whose block-start edge the in-grid panel should
     * align with. Anchored panels stay in normal page flow, shift upward
     * only while needed to fit the visible scrollport, and return to their
     * natural alignment as the page scrolls. Oversized content scrolls
     * inside the panel. Overlay drawers ignore this geometry and remain
     * fixed to the viewport.
     */
    anchor: HTMLElement | undefined;
    /**
     * When set on a flyout slotted into an `esp-page`, the panel lifts
     * its **trailing** edge with the page's surface edge shadow, so it
     * reads as a raised peer of the content surface it flies out from
     * rather than the shadowless tear-off. The **leading** edge keeps
     * its dotted perforation and casts no shadow, so the panel stays
     * attached at the tear line instead of floating over the content.
     * The trailing-corner radius is still `--esp-flyout-radius`. No
     * effect on a standalone flyout — there is no page surface to match.
     */
    matchSurface: boolean;
    /**
     * Whether this flyout ignores the shared `showFlyout()` /
     * `closeFlyout()` bus and is driven only through its own
     * `show()` / `close()` / `toggle()` API.
     *
     * By default a flyout services the bus, so a single flyout in a
     * page "just works" as the target of `showFlyout()` — the same
     * zero-config model as `<esp-toaster>` and `showToast()`. Because
     * the bus is a global broadcast, **every** listening flyout on the
     * page answers a `showFlyout()` call; set `standalone` on any
     * flyout you drive directly so only your one designated help
     * surface responds.
     */
    standalone: boolean;
    /**
     * Element to return focus to when the flyout closes. In the in-grid
     * modes it is focused only if focus is inside the flyout at close;
     * in the overlay-drawer mode it overrides the modal treatment's
     * automatic restore-to-opener. Usually supplied through
     * `showFlyout({ returnFocusTo })`.
     */
    returnFocusTo: HTMLElement | undefined;
    connectedCallback(): void;
    disconnectedCallback(): void;
    /**
     * Open the flyout with its current content. In the in-grid modes it
     * does not move focus; in the overlay-drawer mode it moves focus
     * into the drawer as a modal.
     */
    show(): void;
    /**
     * Close the flyout. In the in-grid modes, if focus is inside the
     * flyout it is returned to `returnFocusTo` when one was provided; in
     * the overlay-drawer mode the modal treatment restores focus to
     * wherever it was when the drawer opened, unless `returnFocusTo`
     * names an explicit target — the explicit target wins.
     */
    close(reason?: FlyoutCloseReason): void;
    /**
     * Toggle the flyout between open and closed.
     */
    toggle(): void;
    protected updated(changed: PropertyValues): void;
    protected render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult[];
}
declare global {
    interface HTMLElementTagNameMap {
        "esp-flyout": EspalierFlyout;
    }
}
