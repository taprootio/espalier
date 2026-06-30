import { LitElement } from "lit";
/**
 * Animated burger button for showing and hiding navigation
 * components.
 *
 * ```html
 * <esp-burger></esp-burger>
 * ```
 *
 * @cssprop --esp-color-burger - The color of the burger lines when closed.
 * @cssprop --esp-color-burger-hover - The hover color of the burger lines when closed.
 * @cssprop --esp-color-burger-opened - The color of the burger lines when open.
 * @cssprop --esp-color-burger-opened-hover - The hover color of the burger lines when open.
 * @cssprop --esp-size-burger-stroke - The stroke width of the burger lines.
 * @event {CustomEvent} opened - Emitted when the button is clicked and the image changes from a burger to an X.
 * @event {CustomEvent} closed - Emitted when the button is clicked and the image changes from an X to a burger.
 *
 * ```html
 * <esp-burger></esp-burger>
 * <script>
 *   const theBurger = findByTagName("esp-burger")[0];
 *
 *   theBurger.addEventListener("opened", () => {
 *     showToast({
 *       message: "It would be a good time to show the menu. This message will self-destruct in 4 seconds...",
 *       icon: "info-i",
 *       duration: 4
 *     });
 *   });
 *   theBurger.addEventListener("closed", () => {
 *     showToast({
 *       message: "It would be a good time to hide the menu. This message will self-destruct in 4 seconds...",
 *       icon: "info-i",
 *       duration: 4
 *     });
 *   });
 * </script>
 * ```
 *
 * @docPageTitle Burger
 * @docUrl /components/burger
 * @menuGroup Interaction
 * @menuLabel Burger
 * @menuIcon burger
 */
export declare class EspalierBurger extends LitElement {
    /**
     * Whether or not the burger indicates an open state.
     * @type {boolean}
     */
    menuOpen: boolean;
    /**
     * Render only the animated burger graphic. Use this when an
     * outer control owns activation, labeling, and expanded state.
     */
    presentationOnly: boolean;
    protected render(): import("lit-html").TemplateResult<1>;
    toggleMenu(): void;
    static styles: import("lit").CSSResult;
}
