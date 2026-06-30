import { type PropertyValues } from "lit";
import { EspalierElementBase } from "../shared/esp-element-base.js";
import type { EspalierMenuMode } from "./esp-menu.js";
/**
 * A navigation item for [`<esp-menu>`](/components/menu/).
 *
 * Items render as links when `url` is provided and as buttons when
 * no URL is present. Button-style items dispatch `clicked`.
 *
 * @customElement esp-menu-item
 * @slot - Optional SVG or image icon. Slotted content overrides the
 * generated sprite icon from the `icon` attribute.
 *
 * @event {CustomEvent} clicked - Fired when the item is rendered as a button (no `url`) and activated.
 *
 * @cssprop --esp-menu-item-color - Text color.
 * @cssprop --esp-menu-item-background - Background color.
 * @cssprop --esp-menu-item-border-color - Border color.
 * @cssprop --esp-menu-item-hover-color - Hover text color.
 * @cssprop --esp-menu-item-hover-background - Hover background color.
 * @cssprop --esp-menu-item-icon-background - Icon area background color.
 * @cssprop --esp-menu-item-active-color - Text color of the active item.
 * @cssprop --esp-menu-item-active-background - Background color of the active item.
 * @cssprop --esp-menu-item-active-font-weight - Font weight of the active item. Defaults to `var(--esp-font-weight-headings)`.
 * @cssprop --esp-menu-item-padding - Padding around the item label.
 * @cssprop --esp-menu-item-icon-min-width - Minimum width of the icon rail.
 * @cssprop --esp-menu-item-icon-padding - Padding inside the icon rail.
 * @cssprop --esp-menu-item-icon-size - Size of generated and slotted item icons.
 * @docPageTitle Menu Item
 * @docUrl /components/menu/item
 * @menuGroup Navigation
 * @menuIcon menu-deep
 */
export declare class EspalierMenuItem extends EspalierElementBase {
    /** Label to display. */
    label: string;
    /** Resource to link to. When empty, the item renders as a button. */
    url: string;
    /** Optional icon name from the configured Espalier SVG sprite. */
    icon: string;
    /** Render mode supplied by the parent `esp-menu` or `esp-menu-group`. */
    mode: EspalierMenuMode;
    /** Nesting depth supplied by the parent. */
    depth: number;
    /**
     * Whether the device uses a coarse pointer. Supplied by the parent so
     * future compact/icon-only treatments can avoid hover-only affordances.
     */
    touchDevice: boolean;
    connectedCallback(): void;
    protected updated(changedProperties: PropertyValues): void;
    protected render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult[];
}
declare global {
    interface HTMLElementTagNameMap {
        "esp-menu-item": EspalierMenuItem;
    }
}
