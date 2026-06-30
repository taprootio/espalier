import { type EspalierVariant, EspalierElementBase } from "../shared/esp-element-base.js";
export type DestroyEspalierInfo = {
    toDestroy: EspalierInfo;
};
/**
 * Used to show an informational message.
 *
 * ```html
 * <esp-info>
 *   Info defaults to the complementary color.
 * </esp-info>
 * ```
 *
 * @slot - The default slot is for the text to display.
 * @slot icon-slot - Optional custom SVG icon. Slotted icons
 * override the generated SVG from the `icon` attribute.
 *
 * ```html
 * <esp-info icon="user-circle">
 *   Info defaults to the complementary color.
 * </esp-info>
 * ```
 *
 * @cssprop --esp-info-color-border - The border color of the
 * info box.
 * @cssprop --esp-info-color-background - The background color
 * of the info box.
 * @cssprop --esp-info-color-text - The text color of the info
 * box
 *
 * ```html
 * <style>
 * esp-info.ugly-info {
 *   --esp-info-color-border: red;
 *   --esp-info-color-background: yellow;
 *   --esp-info-color-text: maroon;
 * }
 * </style>
 * <esp-info class="ugly-info" icon="user-circle">
 *   That's some red and yellow!
 * </esp-info>
 * ```
 *
 * @event {CustomEvent<DestroyEspalierInfo>} destroy - Fired when the user
 * clicks the destroy button.
 *
 * @docPageTitle Info
 * @docUrl /components/info
 * @menuGroup Feedback
 * @menuLabel Info
 * @menuIcon info
 *
 */
export declare class EspalierInfo extends EspalierElementBase {
    protected variantBacker: EspalierVariant;
    /**
     * Optional icon name from the configured Espalier SVG sprite.
     * Slotted `icon-slot` content remains supported and overrides
     * this generated icon.
     */
    icon: string;
    /**
     * If an info box is destroyable, it has a button that will fire the
     * destroy event when clicked.
     *
     * ```html
     * <esp-info destroyable>
     *   I am destroyable.
     * </esp-info>
     * ```
     * @type {boolean}
     */
    destroyable: boolean;
    protected render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult[];
}
declare global {
    interface HTMLElementTagNameMap {
        "esp-info": EspalierInfo;
    }
}
