import { type PropertyValues, type TemplateResult } from "lit";
import { EspalierElementBase } from "../shared/esp-element-base.js";
import "./esp-menu-item.js";
import "./esp-menu-group.js";
export type EspalierMenuMode = "horizontal" | "vertical" | "drawer";
export type EspalierMenuOverflow = "auto" | "wrap" | "scroll" | "left-drawer" | "right-drawer";
/**
 * Shared navigation primitive for top navigation, sidebar navigation,
 * and drawer navigation.
 *
 * Use `mode="horizontal"` for top navigation, `mode="vertical"` for
 * sidebar navigation, and `mode="drawer"` for drawer-only navigation.
 * The same tree of `esp-menu-item` and `esp-menu-group` children can
 * render inline and as a drawer so consumers do not need duplicate
 * navigation markup for desktop and mobile.
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
 * @customElement esp-menu
 * @slot - `esp-menu-item` and `esp-menu-group` children.
 *
 * @event {CustomEvent} drawer-opened - Fired when the drawer opens.
 * @event {CustomEvent} drawer-closed - Fired when the drawer closes.
 *
 * @cssprop --esp-menu-background - Background color of vertical and drawer menus.
 * @cssprop --esp-menu-border-color - Border color of menu rails and drawers.
 * @cssprop --esp-menu-horizontal-justify-content - Main-axis alignment for horizontal menu items. Defaults to `flex-start`.
 * @cssprop --esp-menu-scrim-color - Scrim color when the drawer is open.
 * @cssprop --esp-menu-drawer-shadow - Box shadow for the drawer overlay.
 * @cssprop --esp-menu-drawer-width - Drawer width. Defaults to `min(22rem, 86vw)`.
 * @cssprop --esp-menu-top-offset - Top offset for drawers below fixed headers.
 * @docPageTitle Menu
 * @docUrl /components/menu
 * @menuGroup Navigation
 * @menuLabel Menu
 * @menuIcon menu-deep
 */
export declare class EspalierMenu extends EspalierElementBase {
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
