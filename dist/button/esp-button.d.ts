import { type TemplateResult } from "lit";
import { EspalierElementBase } from "../shared/esp-element-base.js";
/**
 * Used to initiate a user action or link to another page.
 *
 * ```html
 * <esp-button label="Hello there!"></esp-button>
 * <script>
 *   const theButton = findByTagName("esp-button")[0];
 *   theButton.addEventListener("clicked", () => {
 *     showToast({
 *       message: `You clicked the button!`,
 *       icon: "info-i",
 *       duration: 2
 *     });
 *   });
 * </script>
 * ```
 *
 * Here are some different button color variants:
 *
 * ```html
 * <div style="display: flex; flex-wrap: wrap; gap: var(--esp-size-padding);">
 *   <esp-button label="Analogous Left" variant="analogous-left" collapsed></esp-button>
 *   <esp-button label="Analogous Right" variant="analogous-right" collapsed></esp-button>
 *   <esp-button label="Complementary" variant="complementary" collapsed></esp-button>
 *   <esp-button label="Danger" variant="danger" collapsed></esp-button>
 *   <esp-button label="Primary" variant="primary" collapsed></esp-button>
 *   <esp-button label="Split Complementary Left" variant="split-complementary-left" collapsed></esp-button>
 *   <esp-button label="Split Complementary Right" variant="split-complementary-right" collapsed></esp-button>
 *   <esp-button label="Success" variant="success" collapsed></esp-button>
 *   <esp-button label="Triadic Left" variant="triadic-left" collapsed></esp-button>
 *   <esp-button label="Triadic Right" variant="triadic-right" collapsed></esp-button>
 *   <esp-button label="Warning" variant="warning" collapsed></esp-button>
 * </div>
 * ```
 *
 * @customElement esp-button
 * @slot - Optional custom SVG icon. Slotted icons override the
 * generated SVG from the `icon` attribute.
 *
 * ```html
 * <esp-button label="Profile" icon="user-circle"></esp-button>
 * ```
 *
 * @event {CustomEvent} clicked - Emitted when the button is clicked.
 *
 * ```html
 * <esp-button label="Click me!"></esp-button>
 * <script>
 *   const theButton = findByTagName("esp-button")[0];
 *   theButton.addEventListener("clicked", () => {
 *     showToast({
 *       message: `Hi! You clicked the button. This message will self-destruct in 4 seconds...`,
 *       icon: "info-i",
 *       duration: 4
 *     });
 *   });
 * </script>
 * ```
 *
 * @cssprop --esp-button-padding - The padding inside the button label and icon areas.
 * @cssprop --esp-button-incognito-padding - The padding for the incognito button style.
 * @attr incognito - Renders the button with a borderless, transparent treatment
 * for quiet icon or inline actions.
 * @docPageTitle Button
 * @docUrl /components/button
 * @menuGroup Interaction
 * @menuLabel Button
 * @menuIcon button
 */
export declare class EspalierButton extends EspalierElementBase {
    static get observedAttributes(): string[];
    /**
     * Forward a host `tabindex` to the inner control. A non-negative value makes
     * the inner control the single tab stop while the host attribute is stripped
     * so the host never becomes a duplicate tab stop. (A shadow host carrying
     * `tabindex="-1"` would remove its inner control from the sequential tab
     * order entirely; removing the attribute leaves the inner control as the
     * sole, sequentially reachable tab stop.) A negative value is forwarded
     * as-is. A missing or unparseable value clears the forwarding and strips the
     * host attribute, restoring natural tabbability.
     */
    attributeChangedCallback(name: string, old: string | null, value: string | null): void;
    /**
     * Clear forwarding when the host `tabindex` is removed. Forwarding a
     * non-negative value strips the host attribute (so the inner control is the
     * sole tab stop), which means a later `removeAttribute("tabindex")` changes
     * nothing on the host and never reaches `attributeChangedCallback`. Catching
     * the removal here restores the inner control's natural tabbability even when
     * the host attribute was already absent. Removals we perform ourselves while
     * neutralizing are skipped via the guard.
     */
    removeAttribute(name: string): void;
    /**
     * Focus the button. Forwards focus (and any `FocusOptions`) to the inner
     * `<button>` (or the `<a>` when `href` is set).
     */
    focus(options?: FocusOptions): void;
    /**
     * Controls the [button type](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/button#type).
     * The available options are: `button`, `submit`, or `reset`.
     * The default value is `button`. To use a link instead of a
     * button, set the `href` attribute.
     *
     * ```html
     * <esp-button label="Default"></esp-button>
     * <esp-button button-type="submit" label="Submit"></esp-button>
     * <esp-button button-type="reset" label="Reset"></esp-button>
     * <esp-button href="#" label="Link"></esp-button>
     * ```
     *
     * @type {"button" | "submit" | "reset"}
     */
    buttonType: "button" | "submit" | "reset";
    /**
     * By default, buttons take up the entire width of their parent
     * container. Use the `collapsed` attribute to shrink them to the
     * size of their content:
     *
     * ```html
     * <esp-button label="Full Width"></esp-button>
     * <esp-button collapsed label="Collapsed"></esp-button>
     * ```
     * @type {boolean}
     */
    collapsed: boolean;
    /**
     * Controls whether or not the button is disabled.
     *
     * ```html
     * <esp-button disabled label="Disabled"></esp-button>
     * <script>
     *   const theButton = findByTagName("esp-button")[0];
     *   theButton.addEventListener("clicked", () => {
     *   alert("We will not get here...");
     * });
     * </script>
     * ```
     * @type {boolean}
     */
    disabled: boolean;
    /**
     * If href is set, the button will be rendered as an anchor link
     * pointing to the href value instead of a button.
     *
     * ```html
     * <esp-button href="#" label="Link button"></esp-button>
     * ```
     *
     * @type {string}
     */
    href: string;
    /**
     * If true, the button only displays the icon.
     *
     * ```html
     * <esp-button icon-only icon="cog" aria-label="Settings"></esp-button>
     * ```
     *
     * @type {boolean}
     */
    iconOnly: boolean;
    /**
     * Renders the button with a borderless, transparent treatment for
     * quiet icon or inline actions.
     *
     * ```html
     * <esp-button incognito icon-only icon="edit" aria-label="Edit"></esp-button>
     * ```
     *
     * @type {boolean}
     */
    incognito: boolean;
    /**
     * Optional icon name from the configured Espalier SVG sprite.
     * Slotted SVG content remains supported and overrides this value.
     *
     * ```html
     * <esp-button label="Settings" icon="cog"></esp-button>
     * ```
     *
     * @type {string}
     */
    icon: string;
    /**
     * The label of the button.
     *
     * ```html
     * <esp-button label="Do something"></esp-button>
     * ```
     *
     * @type {string}
     */
    label: string;
    /**
     * Controls whether or not the button is in a loading state.
     * The button will be disabled and show a spinner while loading
     * is true.
     *
     * ```html
     * <esp-button label="Click me..." icon="save"></esp-button>
     * <script>
     *   const theButton = findByTagName("esp-button")[0];
     *   theButton.addEventListener("clicked", async () => {
     *     theButton.loading = true;
     *     setTimeout(function() {
     *       theButton.loading = false;
     *     }, 5000);
     *   });
     * </script>
     * ```
     *
     * @type {boolean}
     */
    loading: boolean;
    /**
     * If the button is a link, this specifies the target browser window.
     *
     * ```html
     * <esp-button href="#" target="_blank" label="External link"></esp-button>
     * ```
     *
     * @type {string}
     */
    target: string;
    /**
     * If the button is a link, this specifies the relationship
     * between the current page and the linked URL. Common values
     * include `"noopener noreferrer"` for external links opened
     * in a new tab.
     *
     * ```html
     * <esp-button href="#" target="_blank" rel="noopener noreferrer" label="External"></esp-button>
     * ```
     *
     * @type {string}
     */
    rel: string;
    /**
     * When true and `button-type` is `"submit"`, the enclosing
     * form is submitted without running constraint validation.
     *
     * ```html
     * <esp-button button-type="submit" formnovalidate label="Save Draft"></esp-button>
     * ```
     *
     * @type {boolean}
     */
    formNoValidate: boolean;
    protected render(): TemplateResult<1>;
    static styles: import("lit").CSSResult[];
}
declare global {
    interface HTMLElementTagNameMap {
        "esp-button": EspalierButton;
    }
}
