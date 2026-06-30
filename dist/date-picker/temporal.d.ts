/**
 * Minimal Temporal type declarations for esp-date-picker.
 *
 * These cover only the subset of the Temporal API that the date picker
 * uses. The full Temporal spec is much larger. At runtime we rely on
 * the browser-native implementation (or a polyfill loaded by the
 * consumer in `<head>`).
 */
interface TemporalPlainDateLike {
    year?: number;
    month?: number;
    day?: number;
}
interface TemporalPlainTimeLike {
    hour?: number;
    minute?: number;
    second?: number;
    millisecond?: number;
    microsecond?: number;
    nanosecond?: number;
}
interface TemporalDurationLike {
    years?: number;
    months?: number;
    weeks?: number;
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
    milliseconds?: number;
    microseconds?: number;
    nanoseconds?: number;
}
declare namespace Temporal {
    class PlainDate {
        constructor(year: number, month: number, day: number);
        static from(item: string | TemporalPlainDateLike): PlainDate;
        static compare(one: PlainDate, two: PlainDate): number;
        readonly year: number;
        readonly month: number;
        readonly day: number;
        readonly dayOfWeek: number;
        readonly daysInMonth: number;
        add(duration: TemporalDurationLike): PlainDate;
        subtract(duration: TemporalDurationLike): PlainDate;
        toPlainYearMonth(): PlainYearMonth;
        toPlainDateTime(time?: PlainTime | TemporalPlainTimeLike): PlainDateTime;
        toString(): string;
        equals(other: PlainDate): boolean;
    }
    class PlainTime {
        constructor(hour?: number, minute?: number, second?: number, millisecond?: number, microsecond?: number, nanosecond?: number);
        static from(item: string | TemporalPlainTimeLike): PlainTime;
        static compare(one: PlainTime, two: PlainTime): number;
        readonly hour: number;
        readonly minute: number;
        readonly second: number;
        toString(): string;
    }
    class PlainDateTime {
        constructor(year: number, month: number, day: number, hour?: number, minute?: number, second?: number);
        static from(item: string | TemporalPlainDateLike): PlainDateTime;
        static compare(one: PlainDateTime, two: PlainDateTime): number;
        readonly year: number;
        readonly month: number;
        readonly day: number;
        readonly hour: number;
        readonly minute: number;
        readonly second: number;
        toPlainDate(): PlainDate;
        toPlainTime(): PlainTime;
        toString(): string;
    }
    class PlainYearMonth {
        constructor(year: number, month: number);
        static from(item: string | {
            year: number;
            month: number;
        }): PlainYearMonth;
        static compare(one: PlainYearMonth, two: PlainYearMonth): number;
        readonly year: number;
        readonly month: number;
        readonly daysInMonth: number;
        add(duration: TemporalDurationLike): PlainYearMonth;
        subtract(duration: TemporalDurationLike): PlainYearMonth;
        toPlainDate(day: {
            day: number;
        }): PlainDate;
        toString(): string;
        equals(other: PlainYearMonth): boolean;
    }
    namespace Now {
        function plainDateISO(): PlainDate;
        function plainTimeISO(): PlainTime;
        function plainDateTimeISO(): PlainDateTime;
    }
}
interface Window {
    Temporal: typeof Temporal;
}
