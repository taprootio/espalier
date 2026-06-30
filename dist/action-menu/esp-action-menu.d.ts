import { type PropertyValues } from "lit";
import "../button/esp-button.js";
import "../popover/esp-popover.js";
import { EspalierElementBase } from "../shared/esp-element-base.js";
import type { ActionMenuItemIconPosition, EspalierActionMenuItem } from "./esp-action-menu-item.js";
import "./esp-action-menu-item.js";
export type ActionMenuPlacement = "top-start" | "top" | "top-end" | "right-start" | "right" | "right-end" | "bottom-start" | "bottom" | "bottom-end" | "left-start" | "left" | "left-end";
export type ActionMenuSelectDetail = {
    value: string;
    item: EspalierActionMenuItem;
};
/**
 * A contextual overflow menu that combines a trigger button,
 * popover positioning, menu semantics, and roving focus for
 * row and card actions.
 *
 * The default trigger is an icon-only [esp-button](/components/button)
 * showing an ellipsis. Use the `trigger` slot when a view needs a
 * different affordance, such as the square dropdown action used in
 * Taproot grids.
 *
 * ```html
 * <esp-action-menu id="demo-actions">
 *   <esp-action-menu-item value="edit" icon="edit">
 *     Edit
 *   </esp-action-menu-item>
 *   <esp-action-menu-item value="settings" icon="cog">
 *     Settings
 *   </esp-action-menu-item>
 *   <esp-action-menu-item value="pin" icon="pin">
 *     Pin
 *   </esp-action-menu-item>
 *   <esp-action-menu-item value="delete" icon="trash">
 *     Delete
 *   </esp-action-menu-item>
 * </esp-action-menu>
 * <script>
 *   findById("demo-actions").addEventListener("select", (event) => {
 *     showToast({
 *       message: `Selected ${event.detail.value}`,
 *       icon: "info-i",
 *       duration: 2
 *     });
 *   });
 * </script>
 * ```
 *
 * ```html
 * <esp-action-menu placement="bottom-end">
 *   <esp-button slot="trigger" icon-only icon="select" aria-label="Row actions"></esp-button>
 *   <esp-action-menu-item value="edit">Edit</esp-action-menu-item>
 *   <esp-action-menu-item value="delete">Delete</esp-action-menu-item>
 * </esp-action-menu>
 * ```
 *
 * Use `icon-position="right"` for Taproot-style action menus with
 * trailing icons in a differentiated cell:
 *
 * ```html
 * <esp-action-menu icon-position="right">
 *   <esp-action-menu-item value="edit" icon="edit">
 *     Edit
 *   </esp-action-menu-item>
 *   <esp-action-menu-item value="delete" icon="trash">
 *     Delete
 *   </esp-action-menu-item>
 * </esp-action-menu>
 * ```
 *
 * @slot - Place `esp-action-menu-item` children here.
 * @slot trigger - Optional custom trigger element.
 *
 * @event {CustomEvent<ActionMenuSelectDetail>} select - Emitted from
 * the menu when an enabled item is activated.
 *
 * @cssprop --esp-action-menu-background - Menu surface background.
 * Defaults to `var(--esp-color-layer-1)`.
 * @cssprop --esp-action-menu-border - Menu border. Defaults to
 * `1px solid var(--esp-color-border)`.
 * @cssprop --esp-action-menu-shadow - Menu shadow. Defaults to
 * `2px 2px 4px var(--esp-color-shadow)`.
 * @cssprop --esp-action-menu-min-width - Minimum menu width. Defaults to `12rem`.
 *
 * @customElement esp-action-menu
 * @docPageTitle Action Menu
 * @docUrl /components/action-menu
 * @menuGroup Interaction
 * @menuLabel Action Menu
 * @menuIcon menu-deep
 */
export declare class EspalierActionMenu extends EspalierElementBase {
    /**
     * Preferred popover placement. Values map to the underlying
     * `esp-popover` side and alignment settings.
     */
    placement: ActionMenuPlacement;
    /**
     * Prevents the trigger from opening the menu.
     */
    disabled: boolean;
    /**
     * Controls where item icons appear inside the menu.
     *
     * `"left"` keeps icons before labels. `"right"` moves icons into
     * a trailing cell with a differentiated background and dotted divider.
     */
    iconPosition: ActionMenuItemIconPosition;
    connectedCallback(): void;
    disconnectedCallback(): void;
    protected firstUpdated(changedProperties: PropertyValues): void;
    protected updated(changed: PropertyValues): void;
    /** Opens the action menu popover when the trigger is enabled. */
    openMenu(): void;
    /**
     * Closes the action menu popover.
     *
     * Set `restoreFocus` to return keyboard focus to the trigger.
     */
    closeMenu(options?: {
        restoreFocus?: boolean;
    }): void;
    protected render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult[];
}
declare global {
    interface HTMLElementTagNameMap {
        "esp-action-menu": EspalierActionMenu;
    }
}
