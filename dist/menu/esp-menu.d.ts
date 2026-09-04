import { type PropertyValues, type TemplateResult } from "lit";
import { EspalierElementBase } from "../shared/esp-element-base.js";
import { type ConfiguredBrandOptions } from "../shared/configured-brand.js";
import "./esp-menu-item.js";
import "./esp-menu-group.js";
import "../burger/esp-burger.js";
export type EspalierMenuMode = "horizontal" | "vertical" | "drawer";
export type EspalierMenuOverflow = "auto" | "wrap" | "scroll" | "left-drawer" | "right-drawer";
export type EspalierMenuDrawerPresentation = "panel" | "full-screen";
export type EspalierMenuFullScreenTransition = "fade" | "slide-down" | "slide-up" | "slide-left" | "slide-right";
/**
 * Brand an owning `esp-header` mirrors into a full-screen drawer. The same
 * shape the header and footer resolve for their configured brand, plus the
 * scheme-resolved color so the drawer paints it without re-resolving.
 */
export interface EspalierMenuDrawerBrand extends ConfiguredBrandOptions {
    brandColor: string;
}
/**
 * Shared navigation primitive for top navigation, sidebar navigation,
 * and drawer navigation.
 *
 * Use `mode="horizontal"` for top navigation, `mode="vertical"` for
 * sidebar navigation, and `mode="drawer"` for drawer-only navigation.
 * The same tree of `esp-menu-item` and `esp-menu-group` children can
 * render inline and as a drawer so consumers do not need duplicate
 * navigation markup for desktop and mobile. An inline vertical rail keeps
 * its intrinsic height so a page-level layout can move a tall sidebar with
 * document scroll; the fixed drawer presentation supplies its own vertical
 * scrolling instead.
 *
 * **2.4 migration:** inline vertical rails no longer create their own bounded
 * scroller. A standalone menu inside a fixed-height or overflow-hidden shell
 * can restore that presentation by bounding and scrolling the host:
 *
 * ```html
 * <esp-menu mode="vertical" style="max-height: 100dvh; overflow-y: auto;">
 *   ...
 * </esp-menu>
 * ```
 *
 * ```html
 * <esp-menu mode="horizontal" overflow="left-drawer">
 *   <esp-menu-item label="Home" url="/"></esp-menu-item>
 *   <esp-menu-group label="Products" url="/products">
 *     <esp-menu-item label="Overview" url="/products"></esp-menu-item>
 *     <esp-menu-item label="Pricing" url="/pricing"></esp-menu-item>
 *   </esp-menu-group>
 * </esp-menu>
 * ```
 *
 * A published site usually wants the other common mobile pattern: a panel
 * that covers the whole viewport with the site's brand centered above large,
 * centered items. Set `drawer-presentation="full-screen"` for that; the side
 * panel stays the default for application menus. The panel is modal: the
 * content beside it goes inert, scrolling locks, focus moves in, Tab cycles
 * its controls, and Escape closes it. Any drawer sits on the top layer, so a
 * dialog or lightbox opened from one of its items cannot stack above it: an
 * open drawer closes when another overlay opens, and that overlay returns
 * focus to the drawer's trigger when it closes. An owning `esp-header` mirrors its
 * configured brand into the panel and keeps its own menu toggle on the top
 * layer so the burger closes the panel it opened:
 *
 * ```html
 * <esp-header brand-text="Espalier" brand-href="#" menu-display="drawer">
 *   <esp-menu slot="menu" mode="horizontal" drawer-presentation="full-screen" full-screen-transition="slide-down">
 *     <esp-menu-item label="Classes" url="#classes"></esp-menu-item>
 *     <esp-menu-item label="Schedule" url="#schedule"></esp-menu-item>
 *     <esp-menu-item label="About" url="#about"></esp-menu-item>
 *   </esp-menu>
 * </esp-header>
 * ```
 *
 * @customElement esp-menu
 * @slot - `esp-menu-item` and `esp-menu-group` children.
 * @slot drawer-brand - Custom brand markup for the full-screen drawer. When empty, the brand an owning `esp-header` mirrors in renders instead.
 *
 * @event {CustomEvent} esp-menu-drawer-opened - Fired when the drawer opens.
 * @event {CustomEvent} esp-menu-drawer-presented - Fired once the drawer's popover is on the top layer, so an opener can stack its own control above it.
 * @event {CustomEvent} esp-menu-drawer-closed - Fired when the drawer closes.
 *
 * @cssprop --esp-menu-background - Background color of vertical and drawer menus.
 * @cssprop --esp-menu-border-color - Border color of menu rails and drawers.
 * @cssprop --esp-menu-horizontal-justify-content - Main-axis alignment for horizontal menu items. Defaults to `flex-start`.
 * @cssprop --esp-menu-scrim-color - Scrim color when the drawer is open.
 * @cssprop --esp-menu-drawer-shadow - Box shadow for the drawer overlay.
 * @cssprop --esp-menu-drawer-width - Drawer width. Defaults to `min(22rem, 86vw)`.
 * @cssprop --esp-menu-drawer-item-font-size - Item label size in the full-screen drawer. Defaults to `var(--esp-type-large)`.
 * @cssprop --esp-menu-drawer-transition-duration - Duration of the full-screen drawer's transition. Defaults to `0.3s`; reduced motion disables it.
 * @cssprop --esp-menu-drawer-brand-logo-size - Logo height of the brand centered in the full-screen drawer. Defaults to `calc(3 * var(--esp-size-medium))`.
 * @cssprop --esp-menu-drawer-brand-color - Text and logo color of the full-screen drawer's brand. Defaults to the mirrored brand color, then `var(--esp-color-headings)`.
 * @cssprop --esp-menu-top-offset - Top offset for drawers below fixed headers.
 * @docPageTitle Menu
 * @docUrl /components/menu
 * @menuGroup Navigation
 * @menuLabel Menu
 * @menuIcon menu-deep
 */
export declare class EspalierMenu extends EspalierElementBase {
    /** Host hook for the swipe controller: a full-screen open is modal-managed here. */
    ownsDrawerLock(): boolean;
    constructor();
    /**
     * Rendering mode: horizontal top navigation, vertical sidebar
     * navigation, or drawer-only navigation.
     */
    mode: EspalierMenuMode;
    /**
     * Overflow behavior for horizontal navigation.
     *
     * `left-drawer` and `right-drawer` force drawer access from the
     * chosen side. `wrap` and `scroll` keep navigation inline.
     * `auto` lets an owning component such as `esp-header` opt into
     * drawer fallback when inline content does not fit.
     */
    overflow: EspalierMenuOverflow;
    /** Which side the drawer is attached to. */
    side: "left" | "right";
    /**
     * How the drawer presents: `panel` slides a side panel in beside a scrim
     * (the default, suited to application menus); `full-screen` covers the
     * viewport from its top edge with the brand centered above large,
     * centered items and no scrim. Unsupported values read as `panel`.
     */
    drawerPresentation: EspalierMenuDrawerPresentation;
    /**
     * Motion the full-screen drawer enters and leaves with: `fade` (default),
     * `slide-down` from above, `slide-up` from below, `slide-left` from the
     * right edge, or `slide-right` from the left edge. Timed by
     * `--esp-menu-drawer-transition-duration` and disabled under reduced
     * motion. The side panel keeps its own slide.
     */
    fullScreenTransition: EspalierMenuFullScreenTransition;
    /**
     * Brand rendered above the items of a full-screen drawer when the
     * `drawer-brand` slot is empty. An owning `esp-header` keeps this in step
     * with its configured brand; set it directly for a standalone menu.
     */
    drawerBrand: EspalierMenuDrawerBrand | null;
    /**
     * A close control the opener keeps visible above a full-screen panel —
     * `esp-header` sets its lifted menu toggle here. While set, the panel
     * renders no close button of its own and includes the control in its
     * Tab cycle; otherwise the panel renders its own close button, so a
     * standalone menu, a `drawer-target` header, or a swipe-opened panel is
     * never left without one.
     */
    liftedCloseControl: HTMLElement | null;
    /** Whether the drawer presents full-screen rather than as a side panel. */
    get isFullScreenDrawer(): boolean;
    /** Accessible label for the navigation landmark. */
    ariaLabel: string | null;
    /** Automatically expand groups to reveal the current page. */
    autoExpand: boolean;
    /**
     * Compatibility hook used by `esp-header` when inline navigation
     * becomes too wide. Prefer `mode`/`overflow` in application code.
     */
    get sliding(): boolean;
    set sliding(value: boolean);
    /** Compatibility alias for the old vertical menu drawer state. */
    get collapsed(): boolean;
    set collapsed(value: boolean);
    connectedCallback(): void;
    disconnectedCallback(): void;
    protected firstUpdated(props: PropertyValues): void;
    protected updated(changedProperties: PropertyValues): void;
    /**
     * Open the drawer overlay when this menu is drawer-capable.
     *
     * Pass the control that opened the drawer so focus can return to
     * it when the drawer closes.
     */
    openDrawer(trigger?: HTMLElement | null): void;
    /** Close the drawer overlay. */
    closeDrawer(): void;
    /** Toggle the drawer overlay open or closed. */
    toggleDrawer(trigger?: HTMLElement | null): void;
    /** Compatibility alias used by the old header menu integration. */
    toggleOpened(): void;
    /** Whether the drawer is currently open. */
    get isDrawerOpen(): boolean;
    /** Width needed by the inline rail, used by `esp-header`. */
    getWidth: () => number;
    /** Called by SwipeRevealController when the drawer state changes. */
    onSwipeRevealChanged(open: boolean): void;
    protected render(): TemplateResult<1>;
    static styles: import("lit").CSSResult[];
}
declare global {
    interface HTMLElementTagNameMap {
        "esp-menu": EspalierMenu;
    }
}
