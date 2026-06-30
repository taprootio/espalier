import { EspalierElementBase } from "../shared/esp-element-base.js";
export type ActionMenuItemActivateDetail = {
    item: EspalierActionMenuItem;
};
export type ActionMenuItemIconPosition = "left" | "right";
/**
 * A single selectable action for [esp-action-menu](/components/action-menu).
 *
 * Use the optional `icon` slot for a leading visual cue. Link-style
 * action items are intentionally not part of this API yet; use the
 * parent menu's `select` event and handle navigation in application
 * code until the href behavior is reviewed.
 *
 * ```html
 * <esp-action-menu>
 *   <esp-action-menu-item value="edit" icon="edit">
 *     Edit
 *   </esp-action-menu-item>
 *   <esp-action-menu-item value="settings" icon="cog">
 *     Settings
 *   </esp-action-menu-item>
 *   <esp-action-menu-item value="delete" icon="trash" disabled>
 *     Delete
 *   </esp-action-menu-item>
 * </esp-action-menu>
 * ```
 *
 * @slot - Label text for the action.
 * @slot icon - Optional custom leading icon. Slotted icons override
 * the generated SVG from the `icon` attribute.
 *
 * @event {CustomEvent<ActionMenuItemActivateDetail>} esp-action-menu-item-activate -
 * Internal activation event consumed by the parent action menu.
 *
 * @cssprop --esp-action-menu-item-padding - Padding inside each
 * menu item. Defaults to `var(--esp-size-tiny) var(--esp-size-small)`.
 * @cssprop --esp-action-menu-item-gap - Space between the optional
 * icon and label. Defaults to `var(--esp-size-tiny)`.
 * @cssprop --esp-action-menu-item-hover-background - Background used
 * when an enabled item is hovered or focused. Defaults to
 * `var(--esp-color-layer-2)`.
 * @cssprop --esp-action-menu-item-focus-shadow - Focus ring applied
 * to keyboard-focused items. Defaults to
 * `0 0 0 2px var(--esp-color-link)`.
 * @cssprop --esp-action-menu-item-icon-background - Background used
 * behind right-positioned icons. Defaults to
 * `var(--esp-color-layer-2)`.
 * @cssprop --esp-action-menu-item-icon-hover-background - Background
 * used behind right-positioned icons when an enabled item is hovered
 * or focused. Defaults to `var(--esp-color-layer-3)`.
 * @cssprop --esp-action-menu-item-icon-border-color - Divider color
 * used before right-positioned icons. Defaults to
 * `var(--esp-color-border)`.
 *
 * @customElement esp-action-menu-item
 * @docPageTitle Action Menu Item
 * @docUrl /components/action-menu/item
 * @menuGroup Interaction
 * @menuLabel Action Menu Item
 * @menuIcon list-details
 */
export declare class EspalierActionMenuItem extends EspalierElementBase {
    /**
     * Optional icon name from the configured Espalier SVG sprite.
     * Slotted `icon` content remains supported and overrides this
     * generated icon.
     */
    icon: string;
    /**
     * Value included in the parent menu's `select` event detail.
     */
    value: string;
    /**
     * Prevents pointer and keyboard activation for this item.
     */
    disabled: boolean;
    /**
     * Where the optional icon slot is positioned within the item.
     *
     * Use `"right"` for Taproot-style action rows where the icon sits
     * in a differentiated trailing cell with a dotted divider.
     */
    get iconPosition(): ActionMenuItemIconPosition;
    set iconPosition(value: ActionMenuItemIconPosition);
    connectedCallback(): void;
    disconnectedCallback(): void;
    protected updated(): void;
    /** Activates the item and notifies the parent action menu. */
    activate(): void;
    /** Applies the parent menu's icon position unless this item has its own override. */
    inheritIconPosition(iconPosition: ActionMenuItemIconPosition): void;
    protected render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult[];
}
declare global {
    interface HTMLElementTagNameMap {
        "esp-action-menu-item": EspalierActionMenuItem;
    }
}
