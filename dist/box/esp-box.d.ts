import { EspalierElementBase } from "../shared/esp-element-base.js";
/**
 * Used as a base to group context visually. `esp-box`
 * has a css part of `box` that can be styled to create cards,
 * forms, and other UI elements.
 *
 * ```html
 * <esp-box>
 *   <h2>Box things</h2>
 *   <p>Things grouped visually.</p>
 * </esp-box>
 * ```
 *
 * @customElement esp-box
 * @slot - The default slot holds elements to display in the box.
 *
 * ```html
 * <esp-box>
 *   <h2>Slotted Content</h2>
 *   <p>Goes in the box</p>
 * </esp-box>
 * ```
 *
 * @cssprop --esp-color-box-background - The background color of the box.
 * @cssprop --esp-box-background - Adds a layer in the background of the box. Intended for background images or gradients.
 * @cssprop --esp-box-background-opacity - The opacity of the background layer.
 * @cssprop --esp-size-box-padding - The padding inside the box.
 *
 * ```html
 * <style>
 *   esp-root[scheme="light"] {
 *     esp-box.box-with-bg {
 *       --esp-box-background: url(/assets/espalier-paper-texture.png) repeat;
 *       --esp-box-background-opacity: .5;
 *     }
 *   }
 *   esp-root[scheme="dark"] {
 *     esp-box.box-with-bg {
 *       --esp-box-background: url(/assets/espalier-geometric-texture.png) repeat;
 *       --esp-box-background-opacity: .5;
 *     }
 *   }
 * </style>
 * <esp-box class="box-with-bg" variant="analogous-right">
 *   <h2>Box with background image</h2>
 *   <p>I have a different generated background texture in dark mode than light mode.</p>
 * </esp-box>
 * ```
 *
 * @csspart box - The box element. The default style is a padded element
 * displayed as a box. Style the CSS part to create cards, forms, and
 * other UI elements. Here is a card style:
 *
 * ```html
 * <style>
 *   esp-box.card-box::part(box) {
 *     display: grid;
 *     grid-template-rows: min-content min-content;
 *     gap: var(--esp-size-padding);
 *     padding: 0;
 *   }
 *   esp-box.card-box header {
 *     background: oklch(from var(--esp-color-complementary) var(--esp-l-text) c h);
 *     color: oklch(from var(--esp-color-complementary) var(--esp-l-surface) c h);
 *     font-size: var(--esp-size-big-to-large);
 *     padding: var(--esp-size-padding);
 *     line-height: 1.1;
 *     font-family: var(--esp-font-headings);
 *   }
 *   esp-box.card-box div {
 *     padding: var(--esp-size-padding);
 *   }
 * </style>
 * <esp-box class="card-box" variant="analogous-right">
 *   <header>Box as a card</header>
 *   <div>
 *     <p>Card content.</p>
 *   </div>
 * </esp-box>
 * ```
 *
 * @docPageTitle Box
 * @docUrl /components/box
 * @menuGroup Structure
 * @menuOrder 3
 * @menuLabel Box
 * @menuIcon box
 */
export declare class EspalierBox extends EspalierElementBase {
    /**
     * Whether the box should take up the full screen. Useful when
     * displaying a dialog in full-screen mode.
     *
     * ```html
     * <esp-box variant="triadic-right">
     *   <h2>Box things</h2>
     *   <esp-box variant="complementary">
     *     <h2>Box in box</h2>
     *     <esp-button label="Toggle full screen" variant="complementary"></esp-button>
     *   </esp-box>
     * </esp-box>
     * <script>
     *   let fullScreen = false;
     *   const theBox = findByTagName("esp-box")[0];
     *   const theButton = findByTagName("esp-button")[0];
     *   theButton.addEventListener("clicked", () => {
     *     fullScreen = !fullScreen;
     *
     *     if(fullScreen) {
     *       theBox.setAttribute("full-screen", true);
     *     } else {
     *       theBox.removeAttribute("full-screen");
     *     }
     *   });
     * </script>
     * ```
     *
     * @type {boolean}
     */
    fullScreen: boolean;
    protected render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult[];
}
declare global {
    interface HTMLElementTagNameMap {
        "esp-box": EspalierBox;
    }
}
