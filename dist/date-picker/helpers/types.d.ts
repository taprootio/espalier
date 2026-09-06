import "../temporal.js";
export type DatePickerMode = "date" | "datetime" | "time" | "range";
/**
 * Which surface the calendar body is showing.
 *
 * | Value    | Body content                                   |
 * |----------|------------------------------------------------|
 * | `days`   | Weekday labels and the 6×7 day grid (default)  |
 * | `months` | The twelve months of the title's year          |
 * | `years`  | A scrolling window of years around the view    |
 */
export type CalendarSurface = "days" | "months" | "years";
/**
 * Range selection follows a three-state machine:
 *
 * | State    | Description                  | Next on click          |
 * |----------|------------------------------|------------------------|
 * | `empty`  | No endpoints selected        | → `start`              |
 * | `start`  | Start selected, picking end  | → `complete`           |
 * | `complete` | Both endpoints selected    | → `start` (reset)      |
 */
export type RangePhase = "empty" | "start" | "complete";
export type CalendarDay = {
    date: Temporal.PlainDate;
    isOutsideMonth: boolean;
    isToday: boolean;
    isSelected: boolean;
    isRangeStart: boolean;
    isRangeEnd: boolean;
    isInRange: boolean;
    isDisabled: boolean;
};
/**
 * Result of parsing the `value` string into local Temporal objects.
 * The shape depends on the current `mode`.
 */
export type ParsedValue = {
    kind: "date";
    date: Temporal.PlainDate;
} | {
    kind: "datetime";
    datetime: Temporal.PlainDateTime;
} | {
    kind: "time";
    time: Temporal.PlainTime;
} | {
    kind: "range";
    start: Temporal.PlainDate;
    end: Temporal.PlainDate;
} | {
    kind: "none";
};
