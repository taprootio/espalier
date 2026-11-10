import { type PropertyValues } from "lit";
import { EspalierElementBase } from "../shared/esp-element-base.js";
import { type MenuItemAppearance } from "./menu-presentation.js";
import "../button/esp-button.js";
import type { EspalierMenuMode } from "./esp-menu.js";
export type { MenuItemAppearance } from "./menu-presentation.js";
/**
 * A navigation item for [`<esp-menu>`](/components/menu/).
 *
 * Items render as links when `url` is provided and as buttons when
 * no URL is present. URL-less action items dispatch `esp-clicked`.
 * `appearance="button"` gives either kind button chrome while preserving its
 * link or action semantics. Current-page links remain noninteractive.
 *
 * Button appearance supports esp-button's public `--esp-button-padding` token.
 * Incognito padding does not apply.
 *
 * To give readers that run no JavaScript a real link, write a plain
 * `<a slot="link">` beside the attributes, with the same `href`, `target`,
 * `rel` and label text. A new-tab link adds its "(opens in a new tab)" cue
 * to the rendered link only, so a copy may add its own hidden cue:
 *
 * ```html
 * <esp-menu-item label="Docs" url="/docs" target="_blank" rel="noopener">
 *   <a slot="link" href="/docs" target="_blank" rel="noopener">Docs</a>
 * </esp-menu-item>
 * ```
 *
 * @customElement esp-menu-item
 * @slot - Optional SVG or image icon. Slotted content overrides the
 * generated sprite icon from the `icon` attribute.
 * @slot link - Optional plain `<a href>` copy of the item's link for HTML-only
 * readers such as crawlers, link previews and readers without JavaScript. Once
 * the item upgrades, the copy is never rendered, takes no focus and is hidden
 * from assistive technology; the item renders only from `label`, `url`,
 * `target` and `rel`, so keep the copy equal to them. Until the item upgrades,
 * the copy is an ordinary visible child. A page that shows content before
 * components load and wants no flash can hide it, at the cost of those readers:
 * `:not(:defined) > [slot="link"], :not(:defined) > [slot="brand-link"] { display: none; }`.
 *
 * @event {CustomEvent} esp-clicked - Fired when the item is rendered as a button (no `url`) and activated.
 *
 * @csspart menu-text - The label in either appearance, including composed button labels.
 * @cssprop --esp-menu-item-color - Text color.
 * @cssprop --esp-menu-item-background - Background color.
 * @cssprop --esp-menu-item-border-color - Border color.
 * @cssprop --esp-menu-item-hover-color - Hover text color.
 * @cssprop --esp-menu-item-hover-background - Hover background color.
 * @cssprop --esp-menu-item-hover-decoration - Text decoration of a hovered link item. Defaults to `none`; set `underline` to restore the former underline.
 * @cssprop --esp-menu-item-hover-indicator-color - Color of the bar drawn under a hovered horizontal item. Defaults to `--esp-menu-item-hover-color`, then `var(--esp-color-headings-hover)`.
 * @cssprop --esp-menu-item-transition-duration - Duration for color, background, and indicator changes. Defaults to `0.2s`; reduced motion disables the transition.
 * @cssprop --esp-menu-item-icon-background - Icon area background color.
 * @cssprop --esp-menu-item-active-color - Text color of the active item.
 * @cssprop --esp-menu-item-active-background - Background color of the active item.
 * @cssprop --esp-menu-item-active-indicator-color - Color of the bar drawn under the active horizontal item. Defaults to `--esp-menu-item-active-color`, then `var(--esp-color-link)`.
 * @cssprop --esp-menu-item-active-font-weight - Font weight of the active item. Defaults to `var(--esp-font-weight-headings)`.
 * @cssprop --esp-menu-item-font-family - Font family of item labels. Defaults to the theme's `--esp-font-menu`, then `--esp-font-body`.
 * @cssprop --esp-menu-item-font-weight - Font weight of horizontal item labels. Defaults to `--esp-font-weight-menu`, then `700`.
 * @cssprop --esp-menu-item-font-size - Font size of item labels. Defaults to `inherit`.
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
    /**
     * Visual treatment independent of URL and header-end placement. Invalid
     * values resolve to Link and normalize on the next update.
     */
    appearance: MenuItemAppearance;
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
    /**
     * Prefer logical inline end before the header controls. Only direct links
     * in an owning header's primary horizontal menu are promoted. Standalone,
     * nested and button items remain ordinary menu content. Collapsed links
     * return to the same drawer in their original source order.
     * Put shared navigation tokens and context on the header or a common ancestor.
     * Menu/item inline public presentation tokens and explicit typography are
     * forwarded; their variables
     * must resolve through that shared chain or the forwarded public tokens.
     * Source-only selectors, stylesheet typography, context/intent zones and
     * non-public variables local to the menu/item are not forwarded.
     * @default false
     */
    headerEnd: boolean;
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
    disconnectedCallback(): void;
    protected willUpdate(changedProperties: PropertyValues): void;
    protected updated(changedProperties: PropertyValues): void;
    protected render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult[];
}
declare global {
    interface HTMLElementTagNameMap {
        "esp-menu-item": EspalierMenuItem;
    }
}
