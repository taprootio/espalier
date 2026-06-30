import { EspalierElementBase } from "../shared/esp-element-base.js";
/**
 * A declarative node for a static [`<esp-tree>`](/components/tree).
 *
 * `esp-tree-item` is a lightweight, **declarative data carrier**. Nest
 * items to describe a static hierarchy; the parent `esp-tree` parses
 * these elements into its internal model and renders the whole tree
 * centrally (a single ARIA tree with one roving tab stop). The item
 * elements themselves are not rendered visually — this keeps the
 * keyboard and accessibility model identical whether a tree is built
 * from slotted items or from the data-driven `nodes` property.
 *
 * Each item contributes one **web-path segment** to the selected node's
 * path. A node's submitted value is the `/`-joined path of its segments
 * (e.g. `weddings/2026`). Set the standard `id` attribute when a static
 * node needs a host-owned stable identity; otherwise the parent tree
 * derives one for the lifetime of the element instance.
 *
 * ```html
 * <esp-tree name="folder">
 *   <esp-tree-item segment="weddings" label="Weddings">
 *     <esp-tree-item segment="2025" label="2025"></esp-tree-item>
 *     <esp-tree-item segment="2026" label="2026"></esp-tree-item>
 *   </esp-tree-item>
 *   <esp-tree-item segment="portraits" label="Portraits"></esp-tree-item>
 * </esp-tree>
 * ```
 *
 * To express a non-selectable grouping node (a header that can be
 * expanded but not chosen), set `selectable="false"`. To mark a branch
 * that lazy-loads its children through the tree's `loadChildren`
 * callback, add the `has-children` attribute. Set `icon` to show an
 * Espalier sprite icon for the rendered node, and `editable` to expose
 * the tree's trailing edit affordance. The action flags (`deletable`,
 * `movable-up`, `movable-down`, `cuttable`, and `paste-child-target`)
 * expose the parent tree's built-in node action events. Assign arbitrary
 * host-owned payloads to the `data` property; there is no `data`
 * attribute because attribute values cannot reliably carry object
 * identity.
 *
 * @docPageTitle Tree Item
 * @docUrl /components/tree/item
 * @menuGroup Form Controls
 * @menuIcon sitemap
 */
export declare class EspalierTreeItem extends EspalierElementBase {
    /**
     * The web-path segment this branch contributes to a selected
     * node's full path. Required.
     *
     * @type {string}
     */
    segment: string;
    /**
     * Opaque host-owned data carried through the parent tree's events.
     * This is property-only; no attribute form is parsed.
     *
     * @type {unknown}
     */
    data: unknown;
    /**
     * Optional display label. Falls back to `segment` when empty.
     *
     * @type {string}
     */
    label: string;
    /**
     * Optional icon name from the configured Espalier SVG sprite.
     *
     * @type {string}
     */
    icon: string;
    /**
     * Whether this node can be selected. Set `selectable="false"`
     * for grouping-only nodes that can expand but not be chosen.
     *
     * @type {boolean}
     */
    selectable: boolean;
    /**
     * Whether this node exposes the tree's edit affordance.
     *
     * @type {boolean}
     */
    editable: boolean;
    /**
     * Whether this node exposes the parent tree's delete action.
     *
     * @type {boolean}
     */
    deletable: boolean;
    /**
     * Whether this node exposes the parent tree's move-up action.
     *
     * @type {boolean}
     */
    movableUp: boolean;
    /**
     * Whether this node exposes the parent tree's move-down action.
     *
     * @type {boolean}
     */
    movableDown: boolean;
    /**
     * Whether this node exposes the parent tree's cut action.
     *
     * @type {boolean}
     */
    cuttable: boolean;
    /**
     * Whether this node exposes the parent tree's paste-as-child action.
     *
     * @type {boolean}
     */
    pasteChildTarget: boolean;
    /**
     * Marks a branch whose children are lazy-loaded by the tree's
     * `loadChildren` callback on first expand.
     *
     * @type {boolean}
     */
    hasChildren: boolean;
    static styles: import("lit").CSSResult[];
    protected render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "esp-tree-item": EspalierTreeItem;
    }
}
