import { type PropertyValues } from "lit";
import { type EspalierFormField } from "../form-item/esp-form-item.js";
import { EspalierElementBase } from "../shared/esp-element-base.js";
/**
 * Wraps a standard HTML input field,
 * providing value binding, input validation, and programmatic
 * focus for Espalier forms and UIs. It supports several input
 * types, and has an `icon` attribute plus a slotted icon escape
 * hatch.
 *
 * ```html
 * <esp-box>
 *   <h2>esp-input example</h2>
 *   <p>Hello from the input!</p>
 *   <esp-input
 *     value="Hello from the input!"
 *     icon="user-circle"
 *     icon-label="Open user details">
 *   </esp-input>
 * </esp-box>
 * <script>
 *   const theInput = findByTagName("esp-input")[0];
 *   const theP = findByTagName("p")[0];
 *   theInput.addEventListener("value-changed", (ev) => {
 *     theP.innerText = ev.detail.length ? ev.detail : "The input is empty...";
 *   });
 * </script>
 * ```
 *
 * Input can have [color variants](/guides/colors/variants). Here are some examples:
 *
 * ```html
 * <esp-input variant="split-complementary-left"></esp-input>
 * <esp-input variant="analogous-left"></esp-input>
 * ```
 *
 * ### Email validation
 *
 * Set `input-type="email"` to get built-in email validation. You
 * can customize the error message with `validation-message`:
 *
 * ```html
 * <esp-box>
 *   <esp-form-item label="Email address">
 *     <esp-input name="email" input-type="email" required
 *       validation-message="Please enter a valid work email.">
 *     </esp-input>
 *   </esp-form-item>
 * </esp-box>
 * ```
 *
 * ### Number input with min/max
 *
 * ```html
 * <esp-box>
 *   <esp-form-item label="Quantity (1-100)">
 *     <esp-input name="qty" input-type="number"
 *       min="1" max="100" step="1" required>
 *     </esp-input>
 *   </esp-form-item>
 * </esp-box>
 * ```
 *
 * ### Telephone with locale-aware formatting
 *
 * The `tel` type uses phone localities to parse and format phone
 * numbers on blur. The value is submitted as E.164 (e.g.
 * `"+15551234567"`). Use `tel-localities` to specify which regions
 * are accepted (space-separated region codes); when omitted, a
 * sensible default set of 10 common regions is used.
 *
 * ```html
 * <esp-box>
 *   <esp-form-item label="Phone number">
 *     <esp-input name="phone" input-type="tel"
 *       tel-localities="US CA GB">
 *     </esp-input>
 *   </esp-form-item>
 * </esp-box>
 * ```
 *
 * ### Date input with locale-aware mask
 *
 * The `date` type displays a placeholder based on the user's
 * locale (e.g. "MM/DD/YYYY"). The user types freely and the
 * input parses the date on blur, submitting the value as
 * ISO 8601 (`2025-01-15`).
 *
 * ```html
 * <esp-box>
 *   <esp-form-item label="Start date">
 *     <esp-input name="startDate" input-type="date" required>
 *     </esp-input>
 *   </esp-form-item>
 * </esp-box>
 * ```
 *
 * @customElement esp-input
 * @event {CustomEvent<string>} value-changed - Emitted when the input value changes.
 * @event {CustomEvent} icon-clicked - Emitted when the icon action button is clicked.
 *
 * ```html
 * <esp-box>
 *   <esp-form-item label="Clickable icon">
 *     <esp-input
 *       value="Click the icon"
 *       icon="circle-x"
 *       icon-label="Clear value">
 *     </esp-input>
 *   </esp-form-item>
 *   <p>Icon has not been clicked.</p>
 * </esp-box>
 * <script>
 *   const theInput = findByTagName("esp-input")[0];
 *   const theP = findByTagName("p")[0];
 *   theInput.addEventListener("icon-clicked", () => {
 *     theP.innerText = "Icon clicked!";
 *   });
 * </script>
 * ```
 *
 * ```html
 * <esp-box>
 *   <p>Hello from the input!</p>
 *   <esp-input value="Hello from the input!"></esp-input>
 * </esp-box>
 * <script>
 *   const theInput = findByTagName("esp-input")[0];
 *   const theP = findByTagName("p")[0];
 *   theInput.addEventListener("value-changed", (ev) => {
 *     theP.innerText = ev.detail.length ? ev.detail : "The input is empty...";
 *   });
 * </script>
 * ```
 *
 * @slot - Optional custom SVG icon. Slotted icons override the
 * generated SVG from the `icon` attribute.
 *
 * ```html
 * <esp-input icon="user-circle" icon-label="Open user details"></esp-input>
 * ```
 *
 * ```html
 * <esp-input
 *   name="affiliateLink"
 *   value="https://example.com/?ref=taproot"
 *   readonly
 *   icon="external-link"
 *   icon-label="Open affiliate link">
 * </esp-input>
 * ```
 *
 * @docPageTitle Input
 * @docUrl /components/input
 * @menuGroup Form Controls
 * @menuLabel Input
 * @menuIcon forms
 *
 * @implements {EspalierFormField}
 */
export declare class EspalierInput extends EspalierElementBase implements EspalierFormField {
    static formAssociated: boolean;
    /**
     * A string value used for the id of the input field.
     *
     * ```html
     * <esp-input field-name="username"></esp-input>
     * ```
     *
     * @type {string}
     */
    fieldName: string;
    /**
     * Optional icon name from the configured Espalier SVG sprite.
     * Slotted content remains supported and overrides this value.
     *
     * @type {string}
     */
    icon: string;
    /**
     * Accessible label for the icon action button. Consumers should
     * provide a meaningful label whenever `icon` or a slotted icon
     * represents an action. The trimmed value is applied as both
     * `aria-label` and `title`; if omitted, the button falls back to
     * a label derived from `icon`, then to a generic action label.
     *
     * ```html
     * <esp-input icon="external-link" icon-label="Open affiliate link"></esp-input>
     * ```
     *
     * @type {string}
     */
    iconLabel: string;
    /**
     * Specifies the type of input, such as text, email, password, etc.
     * The `date` type provides a locale-aware placeholder mask —
     * the user types a date freely, and the value is parsed and
     * submitted as ISO 8601 on blur. The `tel` type provides
     * phone locality matching — the user types digits and
     * separators, and the value is parsed and submitted as E.164
     * on blur.
     *
     * ```html
     * <esp-input input-type="email"></esp-input>
     * ```
     *
     * @type {"text" | "email" | "password" | "search" | "tel" | "url" | "number" | "date"}
     */
    inputType: "text" | "email" | "password" | "search" | "tel" | "url" | "number" | "date";
    /**
     * Placeholder text shown when no value is set. For `date`
     * and `tel` inputs, an explicitly provided placeholder
     * overrides the locale-derived placeholder. Set
     * `placeholder=""` to suppress the derived placeholder.
     *
     * ```html
     * <esp-input placeholder="Enter a value"></esp-input>
     * ```
     *
     * @type {string | undefined}
     */
    placeholder: string | undefined;
    /**
     * A boolean value. When true, values the user enters are
     * forced to lowercase.
     *
     * ```html
     * <esp-input force-lowercase></esp-input>
     * ```
     *
     * @type {boolean}
     */
    forceLowercase: boolean;
    /**
     * The value of the input. For `input-type="date"`, this is
     * an ISO 8601 date string (e.g. `"2025-06-15"`). For
     * `input-type="tel"`, this is an E.164 phone number
     * (e.g. `"+15551234567"`).
     *
     * ```html
     * <esp-input value="Hello World"></esp-input>
     * ```
     *
     * @type {string}
     */
    value: string;
    /**
     * The name used when the input participates in a `<form>`.
     *
     * ```html
     * <form>
     *   <esp-input name="username" value="Jane Doe"></esp-input>
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
     * <esp-input required></esp-input>
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
     * <esp-input required required-message="You must enter your password to continue!"></esp-input>
     * ```
     *
     * @type {string}
     */
    requiredMessage: string;
    /**
     * A custom message to display when the value doesn't match
     * the expected type or pattern. The default depends on the
     * input type (e.g. "Please enter a valid email address."
     * for `input-type="email"`).
     *
     * ```html
     * <esp-input input-type="email"
     *   validation-message="This doesn't look like a valid email.">
     * </esp-input>
     * ```
     *
     * @type {string}
     */
    validationMessage: string;
    /**
     * When true, the input is disabled and cannot be interacted with.
     *
     * ```html
     * <esp-input disabled></esp-input>
     * ```
     *
     * @type {boolean}
     */
    disabled: boolean;
    /**
     * When true, the input value is submitted with forms but cannot
     * be edited by the user. The icon action remains enabled unless
     * `disabled` is also set.
     *
     * ```html
     * <esp-input readonly value="Copy-only value"></esp-input>
     * ```
     *
     * @type {boolean}
     */
    readonly: boolean;
    /**
     * A regular expression the value must match. Only applies to
     * text-like types (text, email, url, tel, password, search).
     *
     * ```html
     * <esp-input pattern="[A-Za-z]{3}" validation-message="Enter exactly 3 letters."></esp-input>
     * ```
     *
     * @type {string | undefined}
     */
    pattern: string | undefined;
    /**
     * Minimum number of characters. Only applies to text-like types.
     *
     * @type {number | undefined}
     */
    minlength: number | undefined;
    /**
     * Maximum number of characters. Only applies to text-like types.
     *
     * @type {number | undefined}
     */
    maxlength: number | undefined;
    /**
     * Minimum value. For `input-type="number"` this is passed to
     * the native input. For `input-type="date"` it is an ISO 8601
     * date used for custom range validation.
     *
     * ```html
     * <esp-input input-type="number" min="0"></esp-input>
     * <esp-input input-type="date" min="2025-01-01"></esp-input>
     * ```
     *
     * @type {string | undefined}
     */
    min: string | undefined;
    /**
     * Maximum value. For `input-type="number"` this is passed to
     * the native input. For `input-type="date"` it is an ISO 8601
     * date used for custom range validation.
     *
     * ```html
     * <esp-input input-type="number" max="100"></esp-input>
     * <esp-input input-type="date" max="2030-12-31"></esp-input>
     * ```
     *
     * @type {string | undefined}
     */
    max: string | undefined;
    /**
     * Step value for `input-type="number"`.
     *
     * @type {number | undefined}
     */
    step: number | undefined;
    /**
     * Hint the browser about which virtual keyboard to show.
     * When not set, a sensible default is chosen based on
     * `input-type` (e.g. `"email"` for email, `"numeric"` for
     * number and date).
     *
     * @type {string | undefined}
     */
    inputmode: string | undefined;
    /**
     * Space-separated list of region codes that defines which
     * phone localities are accepted for `input-type="tel"`. The
     * first locality whose format matches wins. When omitted,
     * defaults to a set of 10 common regions.
     *
     * ```html
     * <esp-input input-type="tel" tel-localities="US CA GB"></esp-input>
     * ```
     *
     * @type {string | undefined}
     */
    telLocalities: string | undefined;
    /**
     * Focus the input element.
     *
     * ```html
     * <div class="input-with-button">
     *   <esp-input value="Click to focus -->"></esp-input>
     *   <esp-button label="Focus" icon="arrow-big-left"></esp-button>
     * </div>
     * <script>
     *   const theInput = findByTagName("esp-input")[0];
     *   const theButton = findByTagName("esp-button")[0];
     *   theButton.addEventListener("clicked", () => {
     *     theInput.focus();
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
    protected updated(changedProperties: PropertyValues): void;
    protected render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult[];
}
declare global {
    interface HTMLElementTagNameMap {
        "esp-input": EspalierInput;
    }
}
