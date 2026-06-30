import type { ReactiveController, ReactiveControllerHost } from "lit";
/**
 * Configuration for `FormFieldController`.
 *
 * Every form-associated custom element creates its own
 * `ElementInternals` instance (via `this.attachInternals()`) and
 * passes it here together with a small set of callbacks that
 * describe the host's value and validation semantics.
 */
export interface FormFieldControllerOptions {
    /** The host element that owns this controller. */
    host: ReactiveControllerHost & HTMLElement;
    /** The ElementInternals instance created on the host. */
    internals: ElementInternals;
    /**
     * Return the current form value for submission.
     * Return `null` when the control has no value (omitted from FormData).
     */
    getFormValue: () => string | FormData | null;
    /**
     * Return a validity error, or `null` when the control is valid.
     * The controller translates this into `internals.setValidity()`.
     */
    getValidity: () => {
        flags: ValidityStateFlags;
        message: string;
    } | null;
    /**
     * Return the element to use as the validation anchor for
     * browser-native tooltip positioning. Defaults to the host.
     */
    getValidationAnchor?: () => HTMLElement;
    /** Called when the owning `<form>` is reset. */
    onReset?: () => void;
    /** Called when the browser restores form state (bfcache, etc.). */
    onRestore?: (state: string) => void;
    /** Called when the browser fires `formDisabledCallback`. */
    onDisabled?: (isDisabled: boolean) => void;
}
/**
 * A Lit reactive controller that centralises `ElementInternals`
 * form-value syncing, constraint validation, and event dispatch
 * for form-associated custom elements.
 *
 * ### Usage
 *
 * ```ts
 * class MyInput extends LitElement {
 *   static formAssociated = true;
 *   private internals = this.attachInternals();
 *
 *   private formCtrl = new FormFieldController({
 *     host: this,
 *     internals: this.internals,
 *     getFormValue: () => this.value || null,
 *     getValidity: () =>
 *       this.required && !this.value
 *         ? { flags: { valueMissing: true }, message: "Please fill out this field." }
 *         : null,
 *   });
 * }
 * ```
 */
export declare class FormFieldController implements ReactiveController {
    constructor(opts: FormFieldControllerOptions);
    hostConnected(): void;
    hostDisconnected(): void;
    hostUpdated(): void;
    /**
     * Push the current value into `ElementInternals` for form
     * participation, then run constraint validation and dispatch
     * a `validity-changed` event.
     *
     * Call this whenever the host's value changes.
     */
    syncValue(): void;
    /**
     * Push the current value into `ElementInternals` and update
     * validity **without** dispatching any events. Use this when
     * the form value must stay in sync but no UI feedback should
     * be shown (e.g. while the user is still typing and no error
     * is currently displayed).
     */
    syncValueSilently(): void;
    /**
     * Run constraint validation against the host's current state
     * and dispatch a `validity-changed` event.
     */
    validate(): void;
    /**
     * Check whether the host's current state is valid.
     * Delegates to `ElementInternals.checkValidity()`.
     *
     * Some browsers don't auto-expose `checkValidity()` on the
     * host element itself, so form controls should expose a public
     * method that delegates here.
     */
    checkValidity(): boolean;
    /**
     * Delegate for the host's `formResetCallback()`.
     * Calls the `onReset` hook, silently re-syncs the form value
     * and validity, then dispatches `validity-changed` with
     * `valid: true` so that `esp-form-item` clears any displayed
     * errors. The internals are updated to reflect the real
     * (possibly invalid) state, but the event always reports
     * valid so the UI returns to its pristine appearance.
     */
    handleFormReset(): void;
    /**
     * Delegate for the host's `formStateRestoreCallback()`.
     * Calls the `onRestore` hook, then re-syncs value and validation.
     */
    handleFormStateRestore(state: string): void;
    /**
     * Delegate for the host's `formDisabledCallback()`.
     * Calls the `onDisabled` hook so the host can update its
     * disabled property to match the `<fieldset>` state.
     */
    handleFormDisabled(isDisabled: boolean): void;
}
