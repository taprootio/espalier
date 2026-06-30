import { LitElement } from "lit";
/**
 * A form wrapper that renders a native `<form>` element in
 * the light DOM. All form-associated custom elements placed
 * inside participate natively in form submission, validation,
 * and reset.
 *
 * `esp-form` has no visual presentation of its own — all
 * styling, labels, and layout should be handled independently
 * (e.g. via [esp-form-item](/components/form-item), `esp-box`,
 * or plain CSS).
 *
 * ### Standard submission
 *
 * ```html
 * <esp-form action="/api/save" method="post" label="Contact form">
 *   <esp-form-item label="Name">
 *     <esp-input name="name" required></esp-input>
 *   </esp-form-item>
 *   <esp-button button-type="submit" label="Send"></esp-button>
 * </esp-form>
 * ```
 *
 * ### Fetch submission
 *
 * ```html
 * <esp-form action="/api/save" use-fetch use-json label="Settings">
 *   <esp-form-item label="Email">
 *     <esp-input name="email" input-type="email" required></esp-input>
 *   </esp-form-item>
 *   <esp-button button-type="submit" label="Save"></esp-button>
 * </esp-form>
 * ```
 *
 * ### Dialog integration
 *
 * When `method="dialog"`, submitting the form dispatches a
 * `closeDialog` event that `esp-dialog` listens for, closing
 * the dialog without a network request.
 *
 * ### Multi-field form with validation
 *
 * Required fields are validated on submit. The first invalid
 * field is scrolled into view and focused. Errors clear as
 * the user corrects each field. Use the `required-message`
 * attribute on any form control to customize the error text.
 *
 * ```html
 * <style>
 * esp-form.signup-demo { display: grid; gap: var(--esp-size-small); }
 * esp-form.signup-demo .actions { display: flex; gap: var(--esp-size-small); }
 * </style>
 * <esp-form class="signup-demo" use-fetch use-json action="/api/signup" label="Sign up">
 *   <esp-form-item label="Full name">
 *     <esp-input name="fullName" required required-message="We need your full name."></esp-input>
 *   </esp-form-item>
 *   <esp-form-item label="Email address">
 *     <esp-input name="email" input-type="email" required></esp-input>
 *   </esp-form-item>
 *   <esp-form-item label="Password">
 *     <esp-input name="password" input-type="password" required required-message="You must enter a password to continue!"></esp-input>
 *   </esp-form-item>
 *   <esp-form-item label="Favorite color">
 *     <esp-pick-one name="color" required placeholder="Pick one..." required-message="Please choose your favorite color.">
 *       <esp-picker-item text="Red" value="red"></esp-picker-item>
 *       <esp-picker-item text="Green" value="green"></esp-picker-item>
 *       <esp-picker-item text="Blue" value="blue"></esp-picker-item>
 *     </esp-pick-one>
 *   </esp-form-item>
 *   <esp-form-item label="I agree to the terms">
 *     <esp-checkbox name="terms" value="agreed" required required-message="You must accept the terms to continue.">
 *       Yes, I accept
 *     </esp-checkbox>
 *   </esp-form-item>
 *   <div class="actions">
 *     <esp-button button-type="submit" label="Sign Up"></esp-button>
 *     <esp-button button-type="reset" label="Reset" variant="danger"></esp-button>
 *   </div>
 * </esp-form>
 * ```
 *
 * ### Skipping validation
 *
 * Add `formnovalidate` to a submit button to bypass constraint
 * validation. This is useful for "Save Draft" buttons that
 * should persist incomplete data.
 *
 * ```html
 * <style>
 * esp-form.draft-demo { display: grid; gap: var(--esp-size-small); }
 * esp-form.draft-demo .actions { display: flex; gap: var(--esp-size-small); }
 * </style>
 * <esp-form class="draft-demo" use-fetch use-json action="/api/drafts" label="Article editor">
 *   <esp-form-item label="Title">
 *     <esp-input name="title" required></esp-input>
 *   </esp-form-item>
 *   <esp-form-item label="Category">
 *     <esp-pick-one name="category" required placeholder="Select...">
 *       <esp-picker-item text="Technology" value="tech"></esp-picker-item>
 *       <esp-picker-item text="Design" value="design"></esp-picker-item>
 *       <esp-picker-item text="Business" value="biz"></esp-picker-item>
 *     </esp-pick-one>
 *   </esp-form-item>
 *   <div class="actions">
 *     <esp-button button-type="submit" label="Publish"></esp-button>
 *     <esp-button button-type="submit" formnovalidate label="Save Draft" variant="split-complementary-left"></esp-button>
 *   </div>
 * </esp-form>
 * ```
 *
 * ### Handling the response
 *
 * Listen for `esp-submit-response` and `esp-submit-error` to
 * react to the server's reply when using fetch submission.
 *
 * ```html
 * <style>
 * esp-form.response-demo { display: grid; gap: var(--esp-size-small); }
 * </style>
 * <esp-form class="response-demo" use-fetch use-json action="/api/feedback" label="Feedback">
 *   <esp-form-item label="Your feedback">
 *     <esp-input name="message" required></esp-input>
 *   </esp-form-item>
 *   <esp-button button-type="submit" label="Send Feedback"></esp-button>
 *   <esp-info id="response-msg" icon="info-i" style="display:none">
 *     <span id="response-text"></span>
 *   </esp-info>
 * </esp-form>
 * <script>
 *   const form = findByTagName("esp-form")[0];
 *   const msg = findById("response-msg");
 *   const text = findById("response-text");
 *   form.addEventListener("esp-submit-response", (ev) => {
 *     msg.style.display = "";
 *     msg.setAttribute("variant", ev.detail.ok ? "success" : "warning");
 *     text.textContent = ev.detail.ok
 *       ? "Submitted successfully!"
 *       : "Server returned an error.";
 *   });
 *   form.addEventListener("esp-submit-error", () => {
 *     msg.style.display = "";
 *     msg.setAttribute("variant", "danger");
 *     text.textContent = "Network error — please try again.";
 *   });
 * </script>
 * ```
 *
 * ### Form with diverse input types
 *
 * Combines email, telephone, number, and date inputs with
 * validation and custom messages.
 *
 * ```html
 * <style>
 * esp-form.diverse-demo { display: grid; gap: var(--esp-size-small); }
 * esp-form.diverse-demo .actions { display: flex; gap: var(--esp-size-small); }
 * </style>
 * <esp-form class="diverse-demo" use-fetch use-json action="/api/contact" label="Contact info">
 *   <esp-form-item label="Email">
 *     <esp-input name="email" input-type="email" required></esp-input>
 *   </esp-form-item>
 *   <esp-form-item label="Phone">
 *     <esp-input name="phone" input-type="tel"
 *       tel-localities="US CA GB" required>
 *     </esp-input>
 *   </esp-form-item>
 *   <esp-form-item label="Age">
 *     <esp-input name="age" input-type="number"
 *       min="0" max="150" required>
 *     </esp-input>
 *   </esp-form-item>
 *   <esp-form-item label="Date of birth">
 *     <esp-input name="dob" input-type="date" required></esp-input>
 *   </esp-form-item>
 *   <esp-form-item label="Comments">
 *     <esp-textarea name="comments" rows="3"
 *       placeholder="Any additional comments...">
 *     </esp-textarea>
 *   </esp-form-item>
 *   <div class="actions">
 *     <esp-button button-type="submit" label="Submit"></esp-button>
 *     <esp-button button-type="reset" label="Reset" variant="danger"></esp-button>
 *   </div>
 * </esp-form>
 * ```
 *
 * @customElement esp-form
 *
 * @event {CustomEvent<{ formData: FormData; form: HTMLFormElement }>} esp-submit - Fired when `use-fetch` is true and the form passes validation. Cancelable; calling `preventDefault()` aborts the fetch.
 * @event {CustomEvent<{ response: Response; ok: boolean }>} esp-submit-response - Fired after a successful `fetch` submission.
 * @event {CustomEvent<{ error: unknown }>} esp-submit-error - Fired when a `fetch` submission fails.
 * @event {CustomEvent} closeDialog - Fired when `method="dialog"` is used and the form requests its containing `<esp-dialog>` to close. The event detail is an empty object.
 *
 * @docPageTitle Form
 * @docUrl /components/form
 * @menuGroup Form Controls
 * @menuLabel Form
 * @menuIcon forms
 */
export declare class EspalierForm extends LitElement {
    constructor();
    /** Render into the host element itself (no shadow root). */
    protected createRenderRoot(): this;
    /**
     * The URL that processes the form submission. When `use-fetch`
     * is true this is the URL `fetch()` sends the request to.
     *
     * @type {string}
     */
    action: string;
    /**
     * The HTTP method for submission. Standard values are `get`,
     * `post`, and `dialog`. When set to `dialog`, submitting the
     * form closes the nearest `esp-dialog` ancestor without making
     * a network request.
     *
     * @type {string}
     */
    method: string;
    /**
     * When true, constraint validation is skipped during
     * submission.
     *
     * @type {boolean}
     */
    novalidate: boolean;
    /**
     * When true, the form uses `fetch()` instead of native
     * browser navigation for submission. An `esp-submit` event
     * is fired with the `FormData` in the detail, allowing
     * consumers to cancel or modify the request.
     *
     * @type {boolean}
     */
    useFetch: boolean;
    /**
     * When `use-fetch` is true and this is also true, the request
     * body is serialized as JSON instead of `FormData`.
     *
     * @type {boolean}
     */
    useJson: boolean;
    /**
     * The encoding type for form submission. Maps to the native
     * `enctype` attribute on the inner `<form>`.
     *
     * @type {string}
     */
    enctype: string;
    /**
     * An accessible label applied as `aria-label` on the inner
     * `<form>` element so the form is discoverable as an ARIA
     * `form` landmark by screen readers.
     *
     * @type {string}
     */
    label: string;
    connectedCallback(): void;
    protected render(): import("lit-html").TemplateResult<1>;
    protected firstUpdated(): void;
    protected updated(): void;
    /**
     * Run constraint validation on all controls without showing
     * any UI feedback.
     */
    checkValidity(): boolean;
    /**
     * Run constraint validation, display error messages via each
     * control's `esp-form-item`, and scroll the first invalid
     * item into view.
     *
     * @returns `true` when every control is valid, `false` otherwise.
     */
    reportValidity(): boolean;
    /** Programmatically reset the form and all its controls. */
    reset(): void;
    /** Programmatically trigger form submission (with validation). */
    submit(): void;
}
declare global {
    interface HTMLElementTagNameMap {
        "esp-form": EspalierForm;
    }
}
