import { nothing, type PropertyValues } from "lit";
import { EspalierElementBase } from "../shared/esp-element-base.js";
/**
 * An icon-only trigger for URL-addressable help. Set `help-url` directly or
 * place the button beneath an ancestor carrying `help-src`; `anchor` selects
 * a stable heading id inside that document. The provider keeps the button's
 * pressed state synchronized while its topic is showing.
 *
 * ```html
 * <section help-src="/help/billing.html">
 *   <h2>
 *     Billing
 *     <esp-help-button anchor="billing" label="Help for billing"></esp-help-button>
 *   </h2>
 * </section>
 *
 * <esp-help-button
 *   help-url="/help/exporting.html#csv"
 *   label="Help with CSV exports"
 *   title="Export help">
 * </esp-help-button>
 * ```
 *
 * @docPageTitle Help Button
 * @docUrl /components/help/button
 * @menuGroup Interaction
 * @menuLabel Help Button
 * @menuIcon info
 */
export declare class EspalierHelpButton extends EspalierElementBase {
    /**
     * Per-trigger help document override. May include a topic fragment. When
     * omitted, the nearest composed-tree ancestor's `help-src` is used.
     */
    helpUrl: string;
    /** Stable heading id inside the resolved help document. */
    anchor: string;
    /** Accessible label for the icon-only button. */
    label: string;
    /** Optional flyout heading. Topic/document headings are used when omitted. */
    helpTitle: string;
    /**
     * Element the contextual flyout should point at. Form items set this to
     * their field control while the help button remains the focus-return target.
     */
    placementTarget: HTMLElement | undefined;
    /** Whether this button's exact help topic is currently showing. */
    active: boolean;
    connectedCallback(): void;
    disconnectedCallback(): void;
    /** Forward focus to the composed native control. */
    focus(options?: FocusOptions): void;
    protected updated(changed: PropertyValues): void;
    protected render(): typeof nothing | import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult[];
}
declare global {
    interface HTMLElementTagNameMap {
        "esp-help-button": EspalierHelpButton;
    }
}
