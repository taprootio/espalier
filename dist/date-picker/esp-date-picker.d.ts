import { type PropertyValues, type TemplateResult } from "lit";
import { EspalierElementBase } from "../shared/esp-element-base.js";
import { type EspalierFormField } from "../form-item/esp-form-item.js";
import "../button/esp-button.js";
import "../pickers/esp-pick-one.js";
import "../pickers/esp-picker-item.js";
import type { DatePickerMode } from "./helpers/types.js";
export type { CalendarDay, DatePickerMode, ParsedValue } from "./helpers/types.js";
/**
 * A date / datetime / time / range picker built on the browser-native
 * [Temporal API](https://tc39.es/proposal-temporal/docs/) and the
 * native Popover API. It participates in native `<form>` elements
 * via `ElementInternals`, so its value is submitted with the form
 * just like a built-in `<input type="date">`.
 *
 * Wrap the picker in an [esp-form-item](/components/form-item) for a
 * label, validation messages, and consistent spacing with other
 * Espalier form controls.
 *
 * ```html
 * <esp-form-item label="Birthday">
 *   <esp-date-picker value="1990-06-15"></esp-date-picker>
 * </esp-form-item>
 * ```
 *
 * The picker supports four modes. Use the `mode` attribute to switch
 * between a single date, a date-and-time, a time-only, or a date
 * range:
 *
 * ```html
 * <esp-form-item label="Appointment">
 *   <esp-date-picker mode="datetime" value="2025-09-01T14:30:00"></esp-date-picker>
 * </esp-form-item>
 * ```
 *
 * For date range selection the value uses ISO 8601 interval notation
 * (`start/end`). Click once to set the start, then click again to
 * set the end. If the second click is before the first, the dates
 * are automatically swapped:
 *
 * ```html
 * <esp-form-item label="Trip dates">
 *   <esp-date-picker mode="range" value="2025-07-01/2025-07-14"></esp-date-picker>
 * </esp-form-item>
 * ```
 *
 * Constrain the selectable range with `min` and `max`. Dates outside
 * the range are greyed out and cannot be selected. The picker also
 * reports `rangeUnderflow` / `rangeOverflow` through the Constraint
 * Validation API:
 *
 * ```html
 * <esp-form-item label="Check-in (next 30 days)">
 *   <esp-date-picker id="checkin-picker"></esp-date-picker>
 * </esp-form-item>
 * <script>
 *   const picker = document.getElementById("checkin-picker");
 *   const today = Temporal.Now.plainDateISO();
 *   picker.min = today.toString();
 *   picker.max = today.add({ days: 30 }).toString();
 * </script>
 * ```
 *
 * Because the picker is form-associated, its value is included when
 * the form is submitted and it responds to form resets:
 *
 * ```html
 * <form id="booking-form">
 *   <esp-form-item label="Departure">
 *     <esp-date-picker name="departure" required></esp-date-picker>
 *   </esp-form-item>
 *   <esp-button label="Submit"></esp-button>
 * </form>
 * <script>
 *   const form = document.getElementById("booking-form");
 *   const picker = findByTagName("esp-date-picker")[0];
 *   picker.addEventListener("value-changed", (event) => {
 *     console.log("Selected:", event.detail);
 *   });
 * </script>
 * ```
 *
 * <esp-info variant="warning" icon="info-i">
 *   The Temporal API must be available at runtime. If your target
 *   browsers do not yet ship it natively, load a polyfill such as
 *   <code>temporal-polyfill</code> in your document
 *   <code>&lt;head&gt;</code> before using this component.
 * </esp-info>
 *
 * @event {CustomEvent<string>} value-changed - Emitted when the
 * user picks a date, time, or range. The event detail is the new
 * ISO 8601 value string.
 *
 * @customElement esp-date-picker
 * @docPageTitle Date Picker
 * @docUrl /components/date-picker
 * @menuGroup Form Controls
 * @menuLabel Date Picker
 * @menuIcon calendar
 */
export declare class EspalierDatePicker extends EspalierElementBase implements EspalierFormField {
    static formAssociated: boolean;
    /**
     * The picker mode.
     *
     * | Value      | Behavior                              |
     * |------------|----------------------------------------|
     * | `date`     | Pick a single date                     |
     * | `datetime` | Pick a date and time                   |
     * | `time`     | Pick a time only                       |
     * | `range`    | Pick a start and end date              |
     *
     * ```html
     * <esp-form-item label="Start time">
     *   <esp-date-picker mode="time"></esp-date-picker>
     * </esp-form-item>
     *
     * <esp-form-item label="Trip dates">
     *   <esp-date-picker mode="range"></esp-date-picker>
     * </esp-form-item>
     * ```
     *
     * @type {"date" | "datetime" | "time" | "range"}
     */
    mode: DatePickerMode;
    /**
     * ISO 8601 value string. The format depends on the current `mode`:
     *
     * | Mode       | Format                                  |
     * |------------|-----------------------------------------|
     * | `date`     | `YYYY-MM-DD`                            |
     * | `datetime` | `YYYY-MM-DDTHH:mm:ss`                   |
     * | `time`     | `HH:mm` or `HH:mm:ss`                   |
     * | `range`    | `YYYY-MM-DD/YYYY-MM-DD` (ISO 8601)      |
     *
     * ```html
     * <esp-date-picker value="2025-09-01"></esp-date-picker>
     * <esp-date-picker mode="datetime" value="2025-09-01T14:30:00"></esp-date-picker>
     * <esp-date-picker mode="range" value="2025-07-01/2025-07-14"></esp-date-picker>
     * ```
     *
     * @type {string}
     */
    get value(): string;
    set value(v: string);
    /**
     * Placeholder text shown when no value is set.
     *
     * ```html
     * <esp-date-picker placeholder="Pick a date…"></esp-date-picker>
     * ```
     *
     * @type {string}
     */
    placeholder: string;
    /**
     * The minimum selectable date as an ISO 8601 date string. Dates
     * before this value are greyed out and cannot be selected. When the
     * current value is earlier than `min`, the picker reports a
     * `rangeUnderflow` validity error.
     *
     * ```html
     * <esp-date-picker id="min-example"></esp-date-picker>
     * <script>
     *   const picker = document.getElementById("min-example");
     *   picker.min = Temporal.Now.plainDateISO().toString();
     * </script>
     * ```
     *
     * @type {string}
     */
    min: string;
    /**
     * The maximum selectable date as an ISO 8601 date string. Dates
     * after this value are greyed out and cannot be selected. When the
     * current value is later than `max`, the picker reports a
     * `rangeOverflow` validity error.
     *
     * ```html
     * <esp-date-picker id="max-example"></esp-date-picker>
     * <script>
     *   const picker = document.getElementById("max-example");
     *   picker.max = Temporal.Now.plainDateISO().add({ weeks: 2 }).toString();
     * </script>
     * ```
     *
     * @type {string}
     */
    max: string;
    /**
     * Disables the picker. When `true`, the trigger button cannot be
     * clicked and the popover will not open. The picker also sets
     * `aria-disabled` on its internals.
     *
     * ```html
     * <esp-date-picker disabled></esp-date-picker>
     * ```
     *
     * @type {boolean}
     */
    disabled: boolean;
    /**
     * The name used when the picker participates in a `<form>`.
     * The selected value is submitted under this name.
     *
     * ```html
     * <form>
     *   <esp-date-picker name="departure" value="2025-08-15"></esp-date-picker>
     * </form>
     * ```
     *
     * @type {string}
     */
    name: string;
    /**
     * Makes the picker required for form validation. When `true` and
     * no value is set, the picker reports a `valueMissing` validity
     * error through the Constraint Validation API.
     *
     * ```html
     * <esp-form-item label="Check-in date">
     *   <esp-date-picker name="checkin" required></esp-date-picker>
     * </esp-form-item>
     * ```
     *
     * @type {boolean}
     */
    required: boolean;
    /**
     * A custom message to display when the picker is required but no
     * date is selected. Defaults to `"Please select a date."` when
     * not set.
     *
     * ```html
     * <esp-date-picker required required-message="A departure date is required."></esp-date-picker>
     * ```
     *
     * @type {string}
     */
    requiredMessage: string;
    /** The month currently visible in the calendar grid. */
    protected viewDate: Temporal.PlainYearMonth;
    /** The date that has keyboard focus inside the grid. */
    protected focusedDate: Temporal.PlainDate;
    /** Whether the popup calendar is open. */
    protected open: boolean;
    connectedCallback(): void;
    disconnectedCallback(): void;
    protected willUpdate(changed: PropertyValues): void;
    protected updated(changed: PropertyValues): void;
    /**
     * Focus the date picker's text input.
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
    protected _navigateMonth(delta: number): void;
    /** Move focusedDate by a number of days; adjust viewDate if needed. */
    protected _moveFocus(days: number): void;
    protected _selectDate(date: Temporal.PlainDate): void;
    protected render(): TemplateResult<1>;
    static styles: import("lit").CSSResult[];
}
declare global {
    interface HTMLElementTagNameMap {
        "esp-date-picker": EspalierDatePicker;
    }
}
