import { type PropertyValues } from "lit";
import { EspalierElementBase } from "../shared/esp-element-base.js";
/**
 * A tabbed interface that groups multiple
 * [esp-tab](/components/tabs) elements. The tab strip is
 * generated automatically from each child's `label` attribute.
 * Only one tab panel is visible at a time.
 *
 * ```html
 * <esp-tab-group>
 *   <esp-tab label="Overview">
 *     <p>Overview content goes here.</p>
 *   </esp-tab>
 *   <esp-tab label="Details">
 *     <p>Detailed information lives here.</p>
 *   </esp-tab>
 *   <esp-tab label="Settings">
 *     <p>Configuration options.</p>
 *   </esp-tab>
 * </esp-tab-group>
 * ```
 *
 * ### Pre-selected tab
 *
 * Set `active` on a child `esp-tab` to make it the initially
 * visible panel:
 *
 * ```html
 * <esp-tab-group>
 *   <esp-tab label="Alpha">
 *     <p>Alpha panel.</p>
 *   </esp-tab>
 *   <esp-tab label="Beta" active>
 *     <p>Beta starts active.</p>
 *   </esp-tab>
 * </esp-tab-group>
 * ```
 *
 * ### Disabled tab
 *
 * Individual tabs can be disabled:
 *
 * ```html
 * <esp-tab-group>
 *   <esp-tab label="Available">
 *     <p>You can select this tab.</p>
 *   </esp-tab>
 *   <esp-tab label="Locked" disabled>
 *     <p>This tab cannot be reached.</p>
 *   </esp-tab>
 *   <esp-tab label="Also available">
 *     <p>This tab works too.</p>
 *   </esp-tab>
 * </esp-tab-group>
 * ```
 *
 * ### Disabled group
 *
 * Set `disabled` on the group to disable all tabs at once:
 *
 * ```html
 * <esp-tab-group disabled>
 *   <esp-tab label="One">
 *     <p>All tabs are disabled.</p>
 *   </esp-tab>
 *   <esp-tab label="Two">
 *     <p>Cannot switch to this.</p>
 *   </esp-tab>
 * </esp-tab-group>
 * ```
 *
 * ### Color variants
 *
 * ```html
 * <esp-tab-group variant="complementary">
 *   <esp-tab label="Complementary A">
 *     <p>Complementary variant content.</p>
 *   </esp-tab>
 *   <esp-tab label="Complementary B">
 *     <p>More complementary content.</p>
 *   </esp-tab>
 * </esp-tab-group>
 * ```
 *
 * ### Listening for tab changes
 *
 * ```html
 * <esp-tab-group>
 *   <esp-tab label="Tab 1">
 *     <p>First panel.</p>
 *   </esp-tab>
 *   <esp-tab label="Tab 2">
 *     <p>Second panel.</p>
 *   </esp-tab>
 * </esp-tab-group>
 * <script>
 *   const tabs = findByTagName("esp-tab-group")[0];
 *   tabs.addEventListener("esp-tab-changed", (ev) => {
 *     console.log("Switched to:", ev.detail.label, "at index", ev.detail.index);
 *   });
 * </script>
 * ```
 *
 * @customElement esp-tab-group
 * @slot - Place `esp-tab` elements in the default slot.
 *
 * @csspart tab-list - The tab strip container.
 * @csspart tab-button - Each individual tab button in the strip.
 * @csspart panels - The panel area below the tab strip.
 *
 * @cssprop --esp-tab-color-border - Border color of the tab
 * group container.
 * @cssprop --esp-tab-color-background - Background color of the
 * overall component.
 * @cssprop --esp-tab-color-strip-background - Background color
 * of the tab strip.
 * @cssprop --esp-tab-color-button-hover - Tab button hover
 * background.
 * @cssprop --esp-tab-color-button-active - Active tab button
 * background.
 * @cssprop --esp-tab-color-text - Text color for tab buttons.
 * @cssprop --esp-tab-size-padding - Padding inside the panel
 * area and tab buttons.
 *
 * @event {CustomEvent<{ index: number; label: string }>} esp-tab-changed -
 * Fired when the active tab changes. The detail contains
 * the `index` and `label` of the newly active tab.
 *
 * @docPageTitle Tab Group
 * @docUrl /components/tabs
 * @menuGroup Navigation
 * @menuLabel Tab Group
 * @menuIcon layout-navbar
 *
 */
export declare class EspalierTabGroup extends EspalierElementBase {
    /**
     * Disables all tabs in the group, preventing any tab from
     * being selected.
     *
     * @type {boolean}
     */
    disabled: boolean;
    connectedCallback(): void;
    protected willUpdate(changedProperties: PropertyValues): void;
    protected render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult[];
}
declare global {
    interface HTMLElementTagNameMap {
        "esp-tab-group": EspalierTabGroup;
    }
}
