import { type PropertyValues } from "lit";
import { EspalierElementBase } from "../shared/esp-element-base.js";
/**
 * Groups multiple [esp-details](/components/details) components
 * into an accordion. By default only one item can be open at a
 * time — opening one automatically closes the others.
 *
 * ```html
 * <esp-details-group>
 *   <esp-details summary="Section 1">
 *     <p>Content for section 1.</p>
 *   </esp-details>
 *   <esp-details summary="Section 2">
 *     <p>Content for section 2.</p>
 *   </esp-details>
 *   <esp-details summary="Section 3">
 *     <p>Content for section 3.</p>
 *   </esp-details>
 * </esp-details-group>
 * ```
 *
 * ### Non-exclusive group
 *
 * Set `exclusive` to `false` to allow multiple items to be open
 * at the same time. The group still provides the visual
 * accordion treatment.
 *
 * ```html
 * <esp-details-group exclusive="false">
 *   <esp-details summary="Item A" open>
 *     <p>A is open.</p>
 *   </esp-details>
 *   <esp-details summary="Item B" open>
 *     <p>B is also open.</p>
 *   </esp-details>
 *   <esp-details summary="Item C">
 *     <p>C is closed.</p>
 *   </esp-details>
 * </esp-details-group>
 * ```
 *
 * ### With color variant
 *
 * ```html
 * <esp-details-group variant="complementary">
 *   <esp-details summary="FAQ 1">
 *     <p>Answer to FAQ 1.</p>
 *   </esp-details>
 *   <esp-details summary="FAQ 2">
 *     <p>Answer to FAQ 2.</p>
 *   </esp-details>
 * </esp-details-group>
 * ```
 *
 * @customElement esp-details-group
 * @slot - Place `esp-details` elements in the default slot.
 *
 * @cssprop --esp-details-group-color-border - The border color
 * of the group container.
 *
 * @event {CustomEvent<{ openItem: EspalierDetails | null }>} esp-accordion-change -
 * Fired when the currently open item changes.
 *
 * @docPageTitle Details Group
 * @docUrl /components/details/group
 * @menuGroup Structure
 * @menuOrder 5
 */
export declare class EspalierDetailsGroup extends EspalierElementBase {
    /**
     * When true (the default), only one item can be open at a
     * time. Set to false to allow multiple items open
     * simultaneously while keeping the grouped visual treatment.
     *
     * @type {boolean}
     */
    exclusive: boolean;
    protected firstUpdated(changedProperties: PropertyValues): void;
    protected render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult[];
}
declare global {
    interface HTMLElementTagNameMap {
        "esp-details-group": EspalierDetailsGroup;
    }
}
