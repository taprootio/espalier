/**
 * Named banner-texture registry.
 *
 * The built-in procedural presets cover the asset-free styles. Image-backed
 * looks previously required hand-wiring the five consumer texture tokens on
 * every banner; registering the look once turns it into a reusable preset a
 * banner selects with `texture="<name>"` — and gives hosts (e.g. an editor
 * preset picker) one place to enumerate the available styles.
 */
/** Immutable snapshot of the built-in texture names, for pickers and docs. */
export declare const BUILT_IN_IMAGE_TEXTURES: readonly string[];
/** Whether a name is one of the built-in procedural textures. */
export declare function isBuiltInImageTexture(name: string): boolean;
/** A registered, image-backed texture preset. */
export interface ImageTextureDefinition {
    /** CSS `background-image` value (a `url(...)` or gradient). */
    image: string;
    /** CSS `background-size`. Defaults to `auto`. */
    size?: string;
    /** CSS `background-repeat`. Defaults to `repeat`. */
    repeat?: string;
    /** CSS `background-position`. Defaults to `0 0`. */
    position?: string;
    /** Layer opacity (0–1). Defaults to `1`. */
    opacity?: number;
    /** CSS `mix-blend-mode` against the photo. Defaults to `normal`. */
    blendMode?: string;
}
/**
 * Register (or replace) a named texture preset. Live `esp-image` banners
 * already pointing at the name re-render, so registration at mount and
 * markup order never race.
 *
 * @throws when the name is not lowercase kebab-case or shadows a built-in.
 */
export declare function registerImageTexture(name: string, definition: ImageTextureDefinition): void;
/** Look up a registered texture preset. */
export declare function getImageTexture(name: string): Readonly<ImageTextureDefinition> | undefined;
/**
 * A snapshot of every registered preset, for building texture pickers.
 * Mutating the returned map does not affect the registry.
 */
export declare function registeredImageTextures(): Map<string, Readonly<ImageTextureDefinition>>;
/** Subscribe to registry changes. Returns the unsubscribe function. */
export declare function subscribeToImageTextureRegistry(listener: () => void): () => void;
