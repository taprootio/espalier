import { type PropertyValues } from "lit";
import { EspalierElementBase } from "../shared/esp-element-base.js";
/**
 * A single tab panel used inside
 * [esp-tab-group](/components/tabs). Each tab provides a
 * `label` that appears in the generated tab strip and a default
 * slot for the panel content.
 *
 * ```html
 * <esp-tab-group>
 *   <esp-tab label="First">
 *     <p>Content for the first tab.</p>
 *   </esp-tab>
 *   <esp-tab label="Second">
 *     <p>Content for the second tab.</p>
 *   </esp-tab>
 * </esp-tab-group>
 * ```
 *
 * ### Pre-selected tab
 *
 * Set the `active` attribute to make a tab active on load:
 *
 * ```html
 * <esp-tab-group>
 *   <esp-tab label="One">
 *     <p>Not active by default.</p>
 *   </esp-tab>
 *   <esp-tab label="Two" active>
 *     <p>This tab starts active.</p>
 *   </esp-tab>
 * </esp-tab-group>
 * ```
 *
 * ### Disabled tab
 *
 * ```html
 * <esp-tab-group>
 *   <esp-tab label="Enabled">
 *     <p>This tab works normally.</p>
 *   </esp-tab>
 *   <esp-tab label="Disabled" disabled>
 *     <p>Cannot reach this panel.</p>
 *   </esp-tab>
 * </esp-tab-group>
 * ```
 *
 * @customElement esp-tab
 * @slot - The default slot holds the panel content displayed
 * when this tab is active.
 * @event {CustomEvent} esp-tab-updated - Fired when the tab's label, active state, or disabled state changes so the parent tab group can refresh its derived metadata.
 *
 * @csspart panel - The panel wrapper element.
 *
 * @cssprop --esp-tab-size-padding - Padding inside the panel
 * area.
 *
 * @docPageTitle Tab
 * @docUrl /components/tabs/tab
 * @menuGroup Navigation
 *
 */
export declare class EspalierTab extends EspalierElementBase {
    /**
     * The text displayed in the tab button within the tab strip.
     *
     * @type {string}
     */
    label: string;
    /**
     * Whether this tab is currently active (its panel is visible).
     *
     * @type {boolean}
     */
    active: boolean;
    /**
     * Whether this tab is disabled (cannot be selected).
     *
     * @type {boolean}
     */
    disabled: boolean;
    protected updated(changedProperties: PropertyValues): void;
    protected render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult[];
}
declare global {
    interface HTMLElementTagNameMap {
        "esp-tab": EspalierTab;
    }
}
