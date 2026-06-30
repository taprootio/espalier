export type EspalierAvatarSize = "small" | "medium" | "large";
export type EspalierAvatarPresence = "online" | "away" | "busy" | "offline";
export type EspalierAvatarLoading = "eager" | "lazy";
export type EspalierAvatarCrossOrigin = "" | "anonymous" | "use-credentials";
export type EspalierAvatarReferrerPolicy = "" | "no-referrer" | "no-referrer-when-downgrade" | "origin" | "origin-when-cross-origin" | "same-origin" | "strict-origin" | "strict-origin-when-cross-origin" | "unsafe-url";
export declare const nullableStringConverter: {
    fromAttribute: (value: string | null) => string;
    toAttribute: (value: string) => string | null;
};
export declare function normalizeSize(value: unknown): EspalierAvatarSize;
export declare function normalizePresence(value: unknown): EspalierAvatarPresence | "";
export declare function normalizeLoading(value: unknown): EspalierAvatarLoading;
export declare function normalizeCrossOrigin(value: unknown): EspalierAvatarCrossOrigin;
export declare function normalizeReferrerPolicy(value: unknown): EspalierAvatarReferrerPolicy;
