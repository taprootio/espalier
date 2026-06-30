import { type EspalierFormField } from "../form-item/esp-form-item.js";
import { EspalierElementBase } from "../shared/esp-element-base.js";
/**
 * Wraps a standard HTML textarea element, providing value
 * binding, input validation, and programmatic focus for
 * Espalier forms and UIs.
 *
 * ```html
 * <esp-box>
 *   <h2>esp-textarea example</h2>
 *   <p>Start typing...</p>
 *   <esp-textarea value="Hello from the textarea!"></esp-textarea>
 * </esp-box>
 * <script>
 *   const theTextarea = findByTagName("esp-textarea")[0];
 *   const theP = findByTagName("p")[0];
 *   theTextarea.addEventListener("value-changed", (ev) => {
 *     theP.innerText = ev.detail.length
 *       ? ev.detail
 *       : "The textarea is empty...";
 *   });
 * </script>
 * ```
 *
 * Textarea can have [color variants](/guides/colors/variants).
 * Here are some examples:
 *
 * ```html
 * <esp-textarea variant="split-complementary-left"></esp-textarea>
 * <esp-textarea variant="analogous-left"></esp-textarea>
 * ```
 *
 * ### Validation with minlength and maxlength
 *
 * ```html
 * <esp-box>
 *   <esp-form-item label="Bio (10-500 characters)">
 *     <esp-textarea name="bio" required minlength="10" maxlength="500"
 *       rows="4" placeholder="Tell us about yourself...">
 *     </esp-textarea>
 *   </esp-form-item>
 * </esp-box>
 * ```
 *
 * ### Disabled textarea
 *
 * ```html
 * <esp-box>
 *   <esp-form-item label="Read-only notes">
 *     <esp-textarea disabled value="This textarea is disabled."></esp-textarea>
 *   </esp-form-item>
 * </esp-box>
 * ```
 *
 * @customElement esp-textarea
 * @event {CustomEvent<string>} value-changed - Emitted when the textarea value changes.
 *
 * ```html
 * <esp-box>
 *   <p>Start typing...</p>
 *   <esp-textarea></esp-textarea>
 * </esp-box>
 * <script>
 *   const theTextarea = findByTagName("esp-textarea")[0];
 *   const theP = findByTagName("p")[0];
 *   theTextarea.addEventListener("value-changed", (ev) => {
 *     theP.innerText = ev.detail.length
 *       ? ev.detail
 *       : "The textarea is empty...";
 *   });
 * </script>
 * ```
 *
 * @docPageTitle Textarea
 * @docUrl /components/textarea
 * @menuGroup Form Controls
 * @menuLabel Textarea
 * @menuIcon forms
 *
 * @implements {EspalierFormField}
 */
export declare class EspalierTextarea extends EspalierElementBase implements EspalierFormField {
    static formAssociated: boolean;
    /**
     * A string value used for the id of the textarea.
     *
     * ```html
     * <esp-textarea field-name="comments"></esp-textarea>
     * ```
     *
     * @type {string}
     */
    fieldName: string;
    /**
     * The value of the textarea.
     *
     * ```html
     * <esp-textarea value="Some text"></esp-textarea>
     * ```
     *
     * @type {string}
     */
    value: string;
    /**
     * The name used when the textarea participates in a `<form>`.
     *
     * ```html
     * <form>
     *   <esp-textarea name="comments" value="Hello"></esp-textarea>
     * </form>
     * ```
     *
     * @type {string}
     */
    name: string;
    /**
     * When true, the field must have a value before the form can be
     * submitted.
     *
     * ```html
     * <esp-textarea required></esp-textarea>
     * ```
     *
     * @type {boolean}
     */
    required: boolean;
    /**
     * A custom message to display when the field is required but empty.
     * Defaults to `"Please fill out this field."` when not set.
     *
     * ```html
     * <esp-textarea required required-message="Comments are required!"></esp-textarea>
     * ```
     *
     * @type {string}
     */
    requiredMessage: string;
    /**
     * A custom message to display when validation fails (e.g.
     * minlength not met). Overrides the default friendly message.
     *
     * ```html
     * <esp-textarea minlength="10"
     *   validation-message="Please write at least 10 characters.">
     * </esp-textarea>
     * ```
     *
     * @type {string}
     */
    validationMessage: string;
    /**
     * When true, the textarea is disabled and cannot be
     * interacted with.
     *
     * ```html
     * <esp-textarea disabled></esp-textarea>
     * ```
     *
     * @type {boolean}
     */
    disabled: boolean;
    /**
     * Placeholder text shown when the textarea is empty.
     *
     * ```html
     * <esp-textarea placeholder="Enter your message..."></esp-textarea>
     * ```
     *
     * @type {string | undefined}
     */
    placeholder: string | undefined;
    /**
     * The visible number of text lines.
     *
     * ```html
     * <esp-textarea rows="6"></esp-textarea>
     * ```
     *
     * @type {number | undefined}
     */
    rows: number | undefined;
    /**
     * The visible width in average character widths.
     *
     * ```html
     * <esp-textarea cols="40"></esp-textarea>
     * ```
     *
     * @type {number | undefined}
     */
    cols: number | undefined;
    /**
     * Minimum number of characters.
     *
     * @type {number | undefined}
     */
    minlength: number | undefined;
    /**
     * Maximum number of characters.
     *
     * @type {number | undefined}
     */
    maxlength: number | undefined;
    /**
     * Focus the textarea element.
     *
     * ```html
     * <div class="textarea-with-button">
     *   <esp-textarea value="Click to focus -->"></esp-textarea>
     *   <esp-button label="Focus" icon="arrow-big-left"></esp-button>
     * </div>
     * <script>
     *   const theTextarea = findByTagName("esp-textarea")[0];
     *   const theButton = findByTagName("esp-button")[0];
     *   theButton.addEventListener("clicked", () => {
     *     theTextarea.focus();
     *   });
     * </script>
     * ```
     *
     */
    focus(options?: FocusOptions): void;
    /** Re-run constraint validation and dispatch `validity-changed`. */
    validate(): void;
    /** Check whether the current state is valid (delegates to ElementInternals). */
    checkValidity(): boolean;
    /** Called by the browser when the owning `<form>` is reset. */
    formResetCallback(): void;
    /** Called by the browser to restore form state (bfcache, etc.). */
    formStateRestoreCallback(state: string): void;
    /** Called by the browser when a parent `<fieldset>` is enabled or disabled. */
    formDisabledCallback(isDisabled: boolean): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    protected render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult[];
}
declare global {
    interface HTMLElementTagNameMap {
        "esp-textarea": EspalierTextarea;
    }
}
