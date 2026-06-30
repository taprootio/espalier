export type ValidationError = {
    errorMessage: string;
    fieldName: string;
};
/** Event name dispatched by `FormFieldController` on every validation pass. */
export declare const VALIDITY_CHANGED_EVENT = "validity-changed";
/** Detail payload for the `validity-changed` custom event. */
export interface ValidityChangedDetail {
    valid: boolean;
    message: string;
}
