import { LitElement, type PropertyValues } from "lit";
/**
 * Display a contextual UI overlay that appears when a
 * user interacts with an element, providing a temporary space
 * for additional information, options, or actions without blocking
 * the underlying content. Uses the native Popover API to render
 * in the browser's top layer, escaping all ancestor `overflow`
 * and `z-index` contexts.
 *
 * ```html
 * <esp-popover>
 *   <esp-button label="Show popover" slot="target"></esp-button>
 *   <esp-box slot="popover">
 *     <h2>I'm a popover!</h2>
 *     <p>It can have anything in it.</p>
 *     <esp-popover>
 *       <esp-button label="Show nested popover" slot="target"></esp-button>
 *       <esp-box slot="popover">
 *         <h2>I'm a nested popover!</h2>
 *         <p>I will not cause my parent popover to close.</p>
 *         <esp-popover>
 *           <esp-button label="Show another popover" slot="target"></esp-button>
 *           <esp-box slot="popover">
 *             <h2>I'm a very nested popover!</h2>
 *             <p>I will not cause my parent popovers to close.</p>
 *           </esp-box>
 *         </esp-popover>
 *       </esp-box>
 *     </esp-popover>
 *   </esp-box>
 * </esp-popover>
 * ```
 *
 * @event {CustomEvent} popover-opened - Emitted when the popover is opened.
 *
 * @event {CustomEvent} popover-closed - Emitted when the popover is closed.
 *
 * @slot target - The target listens for events to show the popover.
 *
 * @slot popover - The content to be shown in a popover.
 *
 * @docPageTitle Popover
 * @docUrl /components/popover
 * @menuGroup Feedback
 * @menuLabel Popover
 * @menuIcon box-multiple
 *
 */
export declare class EspalierPopover extends LitElement {
    /**
     * A stable unique ID for the popover content element.
     * Useful for wiring `aria-describedby` or `aria-controls`
     * on the trigger.
     */
    readonly popoverId: string;
    /**
     * Attach determines which side of the target the
     * popover will appear on. The popover will try to fit itself
     * on the specified side, but if there is not enough space,
     * it may appear on the other side. It can be one of the following:
     *
     * #### Place above
     *
     * ```html
     * <esp-popover attach="above">
     *   <esp-button label="Show above" slot="target" collapsed></esp-button>
     *   <esp-box slot="popover">
     *     <h2>POP!</h2>
     *   </esp-box>
     * </esp-popover>
     * ```
     *
     * #### Place below (default)
     *
     * ```html
     * <esp-popover attach="below">
     *   <esp-button label="Show below" slot="target" collapsed></esp-button>
     *   <esp-box slot="popover">
     *     <h2>POP!</h2>
     *   </esp-box>
     * </esp-popover>
     * ```
     *
     * #### Place to left
     *
     * ```html
     * <esp-popover attach="left">
     *   <esp-button label="Show to left" slot="target" collapsed></esp-button>
     *   <esp-box slot="popover">
     *     <h2>POP!</h2>
     *   </esp-box>
     * </esp-popover>
     * ```
     *
     * #### Place to right
     *
     * ```html
     * <esp-popover attach="right">
     *   <esp-button label="Show to right" slot="target" collapsed></esp-button>
     *   <esp-box slot="popover">
     *     <h2>POP!</h2>
     *   </esp-box>
     * </esp-popover>
     * ```
     */
    attach: "left" | "right" | "above" | "below";
    /**
     * Align determines how the popover is aligned relative
     * to the target. For example, if attach is "below" and align
     * is "start", the popover will appear below the target,
     * aligned to the left edge of the target.
     *
     * #### Place below, align start
     *
     * ```html
     * <esp-popover align="start">
     *   <esp-button label="Show below start" slot="target" collapsed></esp-button>
     *   <esp-box slot="popover">
     *     <h2>POP!</h2>
     *   </esp-box>
     * </esp-popover>
     * ```
     *
     * #### Place below, align center
     *
     * ```html
     * <esp-popover align="center">
     *   <esp-button label="Show below center" slot="target" collapsed></esp-button>
     *   <esp-box slot="popover">
     *     <h2>POP!</h2>
     *   </esp-box>
     * </esp-popover>
     * ```
     *
     * #### Place below, align end
     *
     * ```html
     * <esp-popover align="end">
     *   <esp-button label="Show below end" slot="target" collapsed></esp-button>
     *   <esp-box slot="popover">
     *     <h2>POP!</h2>
     *   </esp-box>
     * </esp-popover>
     * ```
     *
     * #### Place right, align start
     *
     * ```html
     * <esp-popover attach="right" align="start">
     *   <esp-button label="Show right start" slot="target" collapsed></esp-button>
     *   <esp-box slot="popover">
     *     <h2>POP!</h2>
     *   </esp-box>
     * </esp-popover>
     * ```
     *
     * #### Place right, align center
     *
     * ```html
     * <esp-popover attach="right" align="center">
     *   <esp-button label="Show right center" slot="target" collapsed></esp-button>
     *   <esp-box slot="popover">
     *     <h2>POP!</h2>
     *   </esp-box>
     * </esp-popover>
     * ```
     *
     * #### Place right, align end
     *
     * ```html
     * <esp-popover attach="right" align="end">
     *   <esp-button label="Show right end" slot="target" collapsed></esp-button>
     *   <esp-box slot="popover">
     *     <h2>POP!</h2>
     *   </esp-box>
     * </esp-popover>
     * ```
     */
    align: "start" | "center" | "end";
    /**
     * The offset value determines the distance between the
     * popover and the target when the popover is shown.
     *
     * ```html
     * <esp-popover offset="50px">
     *   <esp-button label="Show popover" slot="target"></esp-button>
     *   <esp-box slot="popover">
     *     <h2>I'm a popover!</h2>
     *     <p>I am offset 50px from the target.</p>
     *   </esp-box>
     * </esp-popover>
     * ```
     */
    offset: string;
    /**
     * Additional horizontal pixel offset applied after the
     * popover is positioned. Positive moves right, negative left.
     * Useful for anchoring a popover to a dynamic point within
     * a large target element.
     */
    offsetX: number;
    /**
     * Additional vertical pixel offset applied after the
     * popover is positioned. Positive moves down, negative up.
     * Useful for anchoring a popover to a dynamic point within
     * a large target element.
     */
    offsetY: number;
    /**
     * The event to listen for on the target to open the popover.
     *
     * - `"click"` — toggle on click (default).
     * - `"hover"` — open on mouseenter, close on mouseleave.
     * - `"focus"` — open on focusin, close on focusout.
     * - `"focus-hover"` — open on hover *or* focus; close only
     *   when both hover and focus are lost. Ideal for tooltips.
     * - `"none"` — no automatic trigger; open/close programmatically.
     */
    trigger: "none" | "click" | "hover" | "focus" | "focus-hover";
    /**
     * Delay in milliseconds before showing the popover after
     * the trigger event fires. Useful for tooltips so they don't
     * flash on quick mouse-overs.
     */
    showDelay: number;
    /**
     * Delay in milliseconds before hiding the popover after the
     * trigger condition is lost. Gives the user time to move the
     * cursor from the trigger into the popover content.
     */
    hideDelay: number;
    /**
     * Close the popover.
     */
    closePopover: () => void;
    /**
     * Open the popover programmatically (without going through a
     * trigger event). Respects `show-delay`.
     */
    openPopover: () => void;
    /**
     * Re-position the popover without closing/reopening it.
     * Useful after changing `offset-x` / `offset-y` while the
     * popover is already visible.
     */
    updatePosition: () => void;
    disconnectedCallback(): void;
    protected updated(changedProperties: PropertyValues): void;
    protected firstUpdated(_changedProperties: PropertyValues): void;
    protected render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
declare global {
    interface HTMLElementTagNameMap {
        "esp-popover": EspalierPopover;
    }
}
