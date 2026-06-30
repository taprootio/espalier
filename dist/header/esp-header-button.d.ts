import { LitElement } from "lit";
/**
 * A styled icon button designed for the `buttons` slot of
 * [`<esp-header>`](/components/header/). Each button wraps an
 * SVG icon and dispatches a `clicked` event when activated.
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
 * @fires clicked - Dispatched when the button is clicked. The event bubbles and is composed.
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
    /**
     * Accessible label for icon-only buttons. When set, the inner
     * `<button>` receives an `aria-label` so screen readers announce
     * the button's purpose instead of silence.
     */
    ariaLabel: string | null;
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
