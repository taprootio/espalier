import { LitElement } from "lit";
/**
 * A styled icon button designed for the `buttons` slot of
 * [`<esp-header>`](/components/header/). Each button wraps an
 * SVG icon and dispatches an `esp-clicked` event when activated.
 *
 * The button sizes itself to match the header height and
 * transitions its background color on hover.
 *
 * ```html
 * <esp-header>
 *   <div slot="brand" style="background-color: red;" class="header-example">brand</div>
 *   <esp-menu slot="menu" mode="horizontal" style="background-color: green;">
 *     <esp-menu-item label="menu" url="#"></esp-menu-item>
 *   </esp-menu>
 *   <esp-header-button slot="buttons" icon="cog" aria-label="Settings"></esp-header-button>
 *   <esp-header-button slot="buttons" icon="user-circle" aria-label="Profile"></esp-header-button>
 * </esp-header>
 * ```
 *
 * @customElement esp-header-button
 * @slot - Optional custom SVG icon. Slotted icons override the
 * generated SVG from the `icon` attribute and are automatically
 * sized to `var(--esp-size-medium)`.
 *
 * ```html
 * <esp-header>
 *   <div slot="brand" style="background-color: red;" class="header-example">brand</div>
 *   <esp-menu slot="menu" mode="horizontal" style="background-color: green;">
 *     <esp-menu-item label="menu" url="#"></esp-menu-item>
 *   </esp-menu>
 *   <esp-header-button slot="buttons" icon="cog" aria-label="Settings"></esp-header-button>
 * </esp-header>
 * ```
 *
 * The host carries no role of its own. The native `<button>` in its shadow
 * root is the single interactive owner of the action, so `aria-label`,
 * `aria-controls` and `aria-expanded` set on the host are forwarded to it
 * rather than announced twice.
 *
 * `aria-controls` is an id reference, and a browser resolves one only inside
 * the tree its referring element belongs to. The forwarded value therefore
 * names a relationship only when the target is in the same shadow root as this
 * button; pointed at an element in the document it is inert. `aria-label` and
 * `aria-expanded` carry values rather than references and are unaffected.
 *
 * @event {CustomEvent} esp-clicked - Dispatched when the button is clicked. The event bubbles and is composed.
 * @cssprop --esp-header-button-background - The background color of the button. Defaults to `var(--esp-color-layer-3)`.
 * @cssprop --esp-header-button-background-hover - The background color of the button on hover. Defaults to `var(--esp-color-layer-4)`.
 * @cssprop --esp-header-button-box-shadow - The box shadow of the button. Defaults to `0px 0px 3px 0px var(--esp-color-shadow)`.
 * @cssprop --esp-header-button-border-left - The left border of the button. Defaults to `1px dotted var(--esp-color-border)`.
 * @cssprop --esp-header-button-color - The text and icon color of the button. Defaults to `var(--esp-color-text)`.
 * @docPageTitle Header Button
 * @docUrl /components/header/button
 * @menuGroup Navigation
 */
export declare class EspalierHeaderButton extends LitElement {
    constructor();
    /**
     * Accessible label for icon-only buttons. When set, the inner
     * `<button>` receives an `aria-label` so screen readers announce
     * the button's purpose instead of silence.
     */
    ariaLabel: string | null;
    /**
     * Id of the controlled region, forwarded to the inner native button.
     *
     * Assistive technology and role locators target that button, so host state must
     * be forwarded. A string id reference still cannot resolve a target outside
     * its shadow root; ESP0222 tracks forwarding a resolved element reference.
     *
     * `ariaControls` has no base string member in the current DOM types. Keep it
     * without `override`; `noImplicitOverride` will flag a future base declaration.
     */
    ariaControls: string | null;
    /**
     * Whether the region this button controls is expanded, forwarded to the
     * inner `<button>`. See {@link ariaControls} for why the host cannot carry
     * it itself.
     */
    ariaExpanded: string | null;
    /**
     * Optional icon name from the configured Espalier SVG sprite.
     * Slotted SVG content remains supported and overrides this value.
     */
    icon: string;
    protected render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
declare global {
    interface HTMLElementTagNameMap {
        "esp-header-button": EspalierHeaderButton;
    }
}
