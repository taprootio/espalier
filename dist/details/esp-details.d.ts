import { EspalierElementBase } from "../shared/esp-element-base.js";
/**
 * A disclosure widget that wraps the native `<details>` and
 * `<summary>` elements. Provides themed styling with a custom
 * open/close indicator and smooth transitions. Use
 * [esp-details-group](/components/details/group) to create an
 * accordion where only one item is open at a time.
 *
 * ```html
 * <esp-details summary="What is Espalier?">
 *   <p>Espalier is a design system and component library
 *   built on Web Components and Lit.</p>
 * </esp-details>
 * ```
 *
 * Details can have [color variants](/guides/colors/variants):
 *
 * ```html
 * <esp-details summary="Complementary variant" variant="complementary">
 *   <p>This details element uses the complementary color variant.</p>
 * </esp-details>
 * <esp-details summary="Analogous left variant" variant="analogous-left">
 *   <p>This one uses the analogous-left color variant.</p>
 * </esp-details>
 * ```
 *
 * ### Pre-opened details
 *
 * Set the `open` attribute to render the details expanded by
 * default:
 *
 * ```html
 * <esp-details summary="I start open" open>
 *   <p>This content is visible from the start.</p>
 * </esp-details>
 * ```
 *
 * ### Disabled details
 *
 * ```html
 * <esp-details summary="Cannot toggle me" disabled>
 *   <p>This content cannot be revealed.</p>
 * </esp-details>
 * ```
 *
 * @customElement esp-details
 * @slot - The default slot holds the content revealed when the
 * details element is opened.
 *
 * @cssprop --esp-details-color-border - The border color.
 * @cssprop --esp-details-color-background - The background color.
 * @cssprop --esp-details-color-summary-background - The summary
 * row background color.
 * @cssprop --esp-details-color-summary-hover-background - The
 * summary row background on hover.
 * @cssprop --esp-details-color-summary-background-active - The
 * summary row background when the details element is open.
 * @cssprop --esp-details-color-indicator - The color of the
 * open/close indicator.
 * @cssprop --esp-details-size-padding - The padding inside the
 * content area and summary row.
 *
 * @event {CustomEvent<{ open: boolean }>} esp-toggle - Fired when
 * the details element is opened or closed.
 *
 * ```html
 * <esp-details summary="Toggle me">
 *   <p>Watch the console for toggle events.</p>
 * </esp-details>
 * <script>
 *   const details = findByTagName("esp-details")[0];
 *   details.addEventListener("esp-toggle", (ev) => {
 *     console.log("Open:", ev.detail.open);
 *   });
 * </script>
 * ```
 *
 * ### Scroll-stability regression harness
 *
 * ```html
 * <esp-info variant="warning" icon="info-i">
 *   <strong>Manual verification (Firefox):</strong>
 *   <ol>
 *     <li>Scroll so the details summary and top of the grid are both visible.</li>
 *     <li>Open and close the details panel several times — the window should stay put.</li>
 *     <li>Leave the panel open and click a sortable grid header — the window should not jump.</li>
 *     <li>Toggle a checkbox, click Apply, and repeat the sort — the viewport should remain stable.</li>
 *   </ol>
 * </esp-info>
 * <div style="height:40vh; background:repeating-linear-gradient(180deg,var(--esp-color-layer-2) 0 1px,transparent 1px 2rem); display:flex; align-items:center; justify-content:center; color:oklch(from var(--esp-color-text) l c h / 0.5); font-family:var(--esp-font-body);">
 *   &uarr; Spacer &mdash; scroll down to reach the filter panel &uarr;
 * </div>
 * <esp-details summary="Advanced filters">
 *   <div style="display:flex; flex-direction:column; gap:var(--esp-size-small);">
 *     <label style="display:flex; align-items:center; gap:var(--esp-size-tiny); font-family:var(--esp-font-body); color:var(--esp-color-text);">
 *       <input type="checkbox" value="active" /> Active only
 *     </label>
 *     <label style="display:flex; align-items:center; gap:var(--esp-size-tiny); font-family:var(--esp-font-body); color:var(--esp-color-text);">
 *       <input type="checkbox" value="flagged" /> Flagged
 *     </label>
 *     <esp-button id="scroll-test-apply" variant="complementary" label="Apply filters"></esp-button>
 *   </div>
 * </esp-details>
 * <esp-grid page-size="30" grid-height="50vh" style="margin-top:var(--esp-size-small);">
 *   <esp-grid-column header="Row" field-name="id" sortable sort-type="number" width="80px"></esp-grid-column>
 *   <esp-grid-column header="Title" field-name="title" sortable width="200px" grow></esp-grid-column>
 *   <esp-grid-column header="Status" field-name="status" width="120px"></esp-grid-column>
 * </esp-grid>
 * <div style="height:60vh; background:repeating-linear-gradient(180deg,var(--esp-color-layer-2) 0 1px,transparent 1px 2rem); display:flex; align-items:center; justify-content:center; color:oklch(from var(--esp-color-text) l c h / 0.5); font-family:var(--esp-font-body);">
 *   &darr; Spacer &mdash; extra page length below the grid &darr;
 * </div>
 * <script>
 *   const allRows = Array.from({ length: 200 }, (_, i) => ({
 *     id: i + 1,
 *     title: "Page " + (i + 1),
 *     status: i % 3 === 0 ? "active" : i % 3 === 1 ? "flagged" : "archived",
 *   }));
 *   let activeFilters = [];
 *   const grid = findByTagName("esp-grid")[0];
 *   function applyFetchPage() {
 *     grid.fetchPage = async ({ cursor, limit, sortField, sortOrder }) => {
 *       await new Promise(r => setTimeout(r, 80));
 *       let data = activeFilters.length
 *         ? allRows.filter(r => activeFilters.includes(r.status))
 *         : [...allRows];
 *       if (sortField) {
 *         data.sort((a, b) => {
 *           const dir = sortOrder === "desc" ? -1 : 1;
 *           return a[sortField] > b[sortField] ? dir : -dir;
 *         });
 *       }
 *       const start = cursor ? parseInt(cursor) : 0;
 *       const items = data.slice(start, start + limit);
 *       const next = start + limit;
 *       return { items, nextCursor: next < data.length ? String(next) : null };
 *     };
 *   }
 *   applyFetchPage();
 *   findById("scroll-test-apply")
 *     .addEventListener("click", () => {
 *       activeFilters = Array.from(
 *         findByTagName("input")
 *       ).filter(cb => cb.checked).map(cb => cb.value);
 *       applyFetchPage();
 *       grid.reload();
 *     });
 * </script>
 * ```
 *
 * @docPageTitle Details
 * @docUrl /components/details
 * @menuGroup Structure
 * @menuOrder 5
 * @menuLabel Details
 * @menuIcon menu-deep
 *
 */
export declare class EspalierDetails extends EspalierElementBase {
    /**
     * The text displayed in the summary row.
     *
     * ```html
     * <esp-details summary="Click to reveal"></esp-details>
     * ```
     *
     * @type {string}
     */
    summary: string;
    /**
     * Whether the details element is open.
     *
     * ```html
     * <esp-details summary="Starts open" open>
     *   <p>Visible by default.</p>
     * </esp-details>
     * ```
     *
     * @type {boolean}
     */
    open: boolean;
    /**
     * Whether the details element is disabled (cannot be toggled).
     *
     * ```html
     * <esp-details summary="Locked" disabled>
     *   <p>Cannot be toggled.</p>
     * </esp-details>
     * ```
     *
     * @type {boolean}
     */
    disabled: boolean;
    /** Programmatically close the details element. */
    close(): void;
    protected render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult[];
}
declare global {
    interface HTMLElementTagNameMap {
        "esp-details": EspalierDetails;
    }
}
