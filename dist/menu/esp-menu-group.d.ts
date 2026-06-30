import { type PropertyValues, type TemplateResult } from "lit";
import { EspalierElementBase } from "../shared/esp-element-base.js";
import type { EspalierMenuMode } from "./esp-menu.js";
/**
 * A disclosure section inside [`<esp-menu>`](/components/menu/).
 *
 * Groups can contain `esp-menu-item` and nested `esp-menu-group`
 * children. In horizontal top navigation, top-level groups open an
 * accessible panel; inside that panel, deeper levels render as
 * vertical disclosure navigation.
 *
 * @customElement esp-menu-group
 * @slot - Menu items or nested menu groups.
 * @slot icon - Optional SVG or image icon for the group.
 *
 * @event {CustomEvent<{ open: boolean }>} esp-group-toggle - Fired when the group opens or closes.
 *
 * @cssprop --esp-menu-group-color - Text color of the group header.
 * @cssprop --esp-menu-group-background - Background color of the group header.
 * @cssprop --esp-menu-group-hover-background - Hover background color of the group header.
 * @cssprop --esp-menu-group-indicator-color - Color of the expand/collapse indicator.
 * @cssprop --esp-menu-group-border-color - Border color of the group.
 * @cssprop --esp-menu-group-panel-background - Background color of horizontal disclosure panels.
 * @cssprop --esp-menu-group-panel-shadow - Box shadow of horizontal disclosure panels.
 * @cssprop --esp-menu-group-icon-min-width - Minimum width of the icon rail.
 * @cssprop --esp-menu-group-icon-padding - Padding inside the icon rail.
 * @cssprop --esp-menu-group-icon-background - Background color of the icon rail.
 * @cssprop --esp-menu-group-icon-size - Size of generated and slotted group icons.
 * @docPageTitle Menu Group
 * @docUrl /components/menu/group
 * @menuGroup Navigation
 * @menuIcon menu-deep
 */
export declare class EspalierMenuGroup extends EspalierElementBase {
    /** Group heading text. */
    label: string;
    /** Optional URL for the group label. */
    url: string;
    /** Optional icon name from the configured Espalier SVG sprite. */
    icon: string;
    /** Whether the group's children are visible. */
    open: boolean;
    /** Render mode supplied by the parent `esp-menu` or `esp-menu-group`. */
    mode: EspalierMenuMode;
    /** Nesting depth supplied by the parent. */
    depth: number;
    /** Whether the device uses a coarse pointer. Supplied by the parent. */
    touchDevice: boolean;
    /**
     * URL prefix for automatic expansion. If `location.pathname`
     * starts with this value, the group opens on connect.
     */
    urlPrefix: string;
    connectedCallback(): void;
    disconnectedCallback(): void;
    protected firstUpdated(_changedProperties: PropertyValues): void;
    protected updated(changedProperties: PropertyValues): void;
    protected render(): TemplateResult<1>;
    static styles: import("lit").CSSResult[];
}
declare global {
    interface HTMLElementTagNameMap {
        "esp-menu-group": EspalierMenuGroup;
    }
}
