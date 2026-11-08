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
 * To give readers that run no JavaScript a real link for a linked group,
 * write a plain `<a slot="link">` beside the attributes, with the same
 * `href`, `target`, `rel` and label text:
 *
 * ```html
 * <esp-menu-group label="Guides" url="/guides" target="_blank" rel="noopener">
 *   <a slot="link" href="/guides" target="_blank" rel="noopener">Guides</a>
 *   <esp-menu-item label="Start here" url="/guides/start"></esp-menu-item>
 * </esp-menu-group>
 * ```
 *
 * @customElement esp-menu-group
 * @slot - Menu items or nested menu groups.
 * @slot icon - Optional SVG or image icon for the group.
 * @slot link - Optional plain `<a href>` copy of a linked group's link for
 * HTML-only readers such as crawlers, link previews and readers without
 * JavaScript. Once the group upgrades, the copy is never rendered, takes no
 * focus and is hidden from assistive technology; the group renders only from
 * `label`, `url`, `target` and `rel`, so keep the copy equal to them. Until the
 * group upgrades, the copy is an ordinary visible child. A page that shows
 * content before components load and wants no flash can hide it, at the cost of
 * those readers:
 * `:not(:defined) > [slot="link"], :not(:defined) > [slot="brand-link"] { display: none; }`.
 *
 * @event {CustomEvent<{ open: boolean }>} esp-menu-group-toggle - Fired when the group opens or closes.
 *
 * @cssprop --esp-menu-group-color - Text color of the group header. Defaults to `--esp-menu-item-color`, then `--esp-color-text`.
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
 * @cssprop --esp-menu-item-font-family - Font family of the group label, shared with menu items. Defaults to the theme's `--esp-font-menu`, then `--esp-font-body`.
 * @cssprop --esp-menu-item-font-weight - Font weight of horizontal group labels, shared with menu items. Defaults to `--esp-font-weight-menu`, then `700`.
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
    /** Target browsing context for the link. Empty omits the attribute. */
    target: string;
    /** Link relationship, passed through unchanged. Empty omits the attribute. */
    rel: string;
    /**
     * Hidden phrase appended to the accessible name of a `target="_blank"` link.
     * Replace for non-English sites. Empty or whitespace text falls back to English.
     * @default "opens in a new tab"
     */
    newTabLabel: string;
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
     * Set by `esp-menu` for groups rendered in its full-screen drawer: the
     * label and adjacent disclosure control center together across the row.
     */
    fullScreenPresentation: boolean;
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
